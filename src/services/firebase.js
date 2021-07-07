import { firebase, FieldValue } from '../lib/firebase'


export async function getUserByUserId(userId) {

    const result = await firebase.firestore().collection('users').where("userId", '==', userId).get()
    //here () this is used to return the value or we can use without ({}) but only one value

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))

}

export async function getUserOrderByUserId(userId) {
    const result = await firebase.firestore().collection('orders').where("userId", "==", userId).get()
    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))
}




export async function doesUserEmailExists(emailAddress) {
    const result = await firebase.firestore().collection('users').where('userEmail', '==', emailAddress).get()

    return result.docs.map((item) => item.data().length > 0)
}

export async function getAllProductDetails() {
    const result = await firebase.firestore().collection('products').get()
    return result.docs.map((items) => ({ ...items.data(), docId: items.id }))

}
export async function getProductByProductId(proId) {

    const result = await firebase.firestore().collection('products').doc(proId).get()
        .then((doc) => ({
            ...doc.data()

        }))



    return result

}

export async function getProductWithUserDetails(proId, userId) {
    const user = await firebase.firestore().collection('users').where("userId", '==', userId).get()

    const userDetails = user.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))

    const productWithUserDetails = await userDetails.map((item) => {
        let userCartedProduct = false
        if (item.cart.length > 0) {
            item.cart.map((cartItem) => {

                userCartedProduct = false
                if (cartItem.proId === proId) {
                    userCartedProduct = true;
                    return userCartedProduct;
                }

                return userCartedProduct
            })

        }
        return userCartedProduct
    })
    return productWithUserDetails
}


export default async function getUserCartItems(userId) {

    const result = await firebase.firestore().collection('users').where("userId", "==", userId).get()
    const userDetails = result.docs.map((item) => ({ ...item.data(), docId: item.id }))

    const userCart = await userDetails.map((item) => {
        if (item.cart.length > 0) {
            return item.cart.map((cart) => ({
                proId: cart.proId,
                size: cart.size,
                count: cart.count,
                name: cart.name,
                price: cart.price

            }))
        }


    }


    )
    return userCart

}

export async function getUserOrderItems(userId) {

    const result = await firebase.firestore().collection('users').where("userId", "==", userId).get()
    const userDetails = result.docs.map((item) => ({ ...item.data(), docId: item.id }))

    const userOrder = await userDetails.map((item) => {
        if (item.orders.length > 0) {
            return item.orders.map((order) => ({
                proId: order.proId,
                size: order.size,
                count: order.count,
                name: order.name,
                price: order.price

            }))
        }


    }


    )
    return userOrder

}


export async function deleteSpecifiedCartItem(userId, proId, name, count, size, price) {

    const result = await firebase.firestore().collection('users').where("userId", "==", userId).get()
    const userDetails = result.docs.map((item) => ({ ...item.data(), docId: item.id }))
    userDetails.map((item) => {

        cart: FieldValue.arrayRemove({ proId, name, count, size, price })
    })
    //remove by fieldvalue

}