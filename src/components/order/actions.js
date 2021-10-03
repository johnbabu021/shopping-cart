import { useContext } from "react"
import FirebaseContext from "../../context/firebase"
import { useStore } from "../../context/GlobalState"
import UseUser from "../../hooks/use-user"



export default function Actions(props) {
    const proPrice = price / count
    const { proId, size, count, name, price, pin, address, mobile, landmark, username, isInvalid } = props
    const totalPrice = proPrice * count
    const proCount = count
    const { user, orderCollection } = UseUser()
    const { firebase, FieldValue } = useContext(FirebaseContext)
    const { order } = useStore()

    const handleDelete = async () => {
        await firebase.firestore().collection('users').doc(user?.docId).update({
            orders: order ? FieldValue.arrayRemove({ proId, count, price, size, name }) : null

        })
        window.location.reload()
    }
    const handlePlaceOrder = async (event) => {

        await firebase.firestore().collection('orders').doc(orderCollection?.docId).update({
            order: FieldValue.arrayUnion({ proId, count, price, name, size, date: Date.now(), username, pin, address, landmark, mobile })
        })
        await firebase.firestore().collection('users').doc(user?.docId).update({
            orders: order ? FieldValue.arrayRemove({ proId, count, price, size, name }) : null

        })

        window.location.reload()


    }




    return (

        < div className="px-4 mb-10 rounded-md select-none lg:grid md:grid-cols-1 h-88 cards max-h-84 sm:grid-cols-1">
            <div className="items-center justify-start gap-8 sm:flex xs:grid-rows-3">

                <img src={`/images/${name}.jpg`} className="h-40" alt="" />
                <p className="items-center">{size}</p>
                <p className="items-center">{totalPrice}</p>
                <p className="items-center">{name}</p>

            </div>
            <div className="items-center justify-between pt-3 pb-2 text-center lg:flex">
                <div className="flex items-center justify-start gap-4 pt-3 pb-2 text-center ">
                    {/* <button disabled={invalidCount} className={`w-8 h-8 text-white rounded-md bg-red-primary ${invalidCount && 'opacity-40'}`} onClick={handleDecrement}>-</button> */}
                    <p className="items-center">Qty: {proCount}</p>
                    {/* <button className="w-8 h-8 text-white rounded-md bg-purple-medium" onClick={handleIncrement}>+</button> */}


                </div>
                <div className="grid items-center gap-5 sm:flex md:justify-center xs:grid-rows-2">

                    <button
                        disabled={isInvalid}
                        className={`text-center border-2 text-purple-medium border-gray-medium ${isInvalid && 'opacity-50'}`} onClick={handlePlaceOrder}>PLACE ORDER</button>
                    <button className="border-2 text-red-primary border-gray-medium " onClick={handleDelete}>DELETE</button>
                </div>
            </div>

        </div >
    )

}
