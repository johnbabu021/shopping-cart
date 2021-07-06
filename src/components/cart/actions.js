import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import FirebaseContext from "../../context/firebase"
import UseUser from "../../hooks/use-user"
import * as ROUTES from '../../constants/routes'

export default function Actions({ proId, size, count, name, price, cart }) {
    const [proPrice, setProPrice] = useState(price / count)
    const [totalPrice, setTotalPrice] = useState(proPrice * count)
    const [proCount, setProCount] = useState(count)
    const [order, setOrder] = useState(false)
    const history = useHistory()
    const { user } = UseUser()

    const { firebase, FieldValue } = useContext(FirebaseContext)
    useEffect(async () => {
    }, [])
    const handleDelete = async (event) => {
        await firebase.firestore().collection('users').doc(user?.docId).update({
            cart: cart ? FieldValue.arrayRemove({ proId, count, price, size, name }) : null

        })
        window.location.reload()

    }
    const handleOrder = async (event) => {
        event.preventDefault()


        setOrder(!order)
        await firebase.firestore().collection('users').doc(user?.docId).update({
            orders: FieldValue.arrayUnion({ proId, count, size, name, price })
        })
        await firebase.firestore().collection('users').doc(user?.docId).update({
            cart: cart ? FieldValue.arrayRemove({ proId, count, price, size, name }) : null

        })


        history.push(ROUTES.ORDERS)

    }

    // const handleDecrement = async () => {
    //     // count = count - 1
    //     await firebase.firestore().collection('users').doc(user?.docId).update({
    //         cart: cart ? FieldValue.arrayRemove({ proId, count, price, size, name }) : null

    //     })
    // }
    // const handleIncrement = async () => {
    //     await handleDelete

    //     count = count + 1
    //     price = proPrice * count
    //     setTotalPrice(price)
    //     setProCount(count)

    //     await firebase.firestore().collection('users').doc(user.docId).update({ cart: [{ count: count, proId: proId, price: price, size: size, name: name }, ...cart] })
    // }


    return (

        < div className="grid px-4 mb-10 rounded-md select-none lg:grid-cols-2 h-88 cards max-h-84 sm:gir-cols-1">
            <div className="flex items-center justify-start gap-8">

                <img src={`/images/${name}.jpg`} className="h-40" />
                <p className="items-center">{name}</p>
                <p className="items-center">{size}</p>
                <p className="items-center">{totalPrice}</p>
                <p className="items-center">{name}</p>

            </div>
            <div className="items-center justify-between pt-3 pb-2 text-center md:flex ">
                <div className="flex items-center justify-start gap-4 pt-3 pb-2 text-center ">
                    {/* <button disabled={invalidCount} className={`w-8 h-8 text-white rounded-md bg-red-primary ${invalidCount && 'opacity-40'}`} onClick={handleDecrement}>-</button> */}
                    <p className="items-center">Qty: {proCount}</p>
                    {/* <button className="w-8 h-8 text-white rounded-md bg-purple-medium" onClick={handleIncrement}>+</button> */}


                </div>
                <div className="flex items-center gap-5 md:justify-center">

                    <button disabled={order} className={`text-center border-2 text-purple-medium border-gray-medium ${order && 'opacity-10'}`} onClick={handleOrder}>MOVE TO BAG</button>
                    <button className="border-2 text-red-primary border-gray-medium " onClick={handleDelete}>DELETE</button>
                </div>
            </div>

        </div >
    )

}