import Header from "../components/header"
import Content from '../components/cart/content'
import { useContext, useEffect, useState } from "react"
import UseUser from "../hooks/use-user"
import FirebaseContext from "../context/firebase"
import userContext from "../context/user"
import getUserCartItems from "../services/firebase"


export default function Cart() {
    const { user } = UseUser()
    const { firebase, FieldValue } = useContext(FirebaseContext)
    const [cart, setCart] = useState(null)
    // const [id, setId] = useState(null)
    // const [count, setCount] = useState(null)
    // const [price, setPrice] = useState(null)
    // const [size, setSize] = useState(null)
    // const [name, setName] = useState(null)
    const { user: { uid: userId = '' } } = useContext(userContext)
    useEffect(async () => {
        document.title = "Cart"
        const [result] = await getUserCartItems(userId)
        setCart(result);
        // here cart will be empty usestate
        // if (result) {
        //     result.map((item) => {
        //         setId(item.proId)
        //         setCount(item.count)
        //         setPrice(item.price)
        //         setSize(item.size)
        //         setName(item.name)

        //     })
        // }

        // console.log(id, count, size, name)

    }, [])

    // const handleDeleteAll = async () => {
    //     console.log('handle click is on stage')
    //     console.log(id, count, size, name)
    //     await firebase.firestore().collection('users').doc(user?.docId).update({
    //         cart: cart ? FieldValue.arrayRemove({ id, count, price, size, name }) : null

    //     })
    // }

    return (

        <div>
            <Header />
            <div className="container w-full pt-24 mx-auto">
                {/* <button className="mb-16 bg-white border-2 text-red-primary border-gray-medium" onClick={handleDeleteAll}>DELETE ALL ITEMS</button> */}

                <Content />

            </div>

        </div>
    )

}