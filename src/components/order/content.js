import { useContext, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import userContext from "../../context/user"
import { getUserOrderItems } from "../../services/firebase"
import Actions from './actions'

export default function Content() {
    const [name, setName] = useState(null)
    const [landMark, setLandMark] = useState(null)
    const [address, setAddress] = useState(null)
    const [pin, setPin] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [order, setOrder] = useState(null)
    const isInvalid = name === '' || landMark === '' || address === "" || pin === "" || mobile === ''

    const { user: { uid: userId = '' } } = useContext(userContext)
    useEffect(() => {

        const getUserOrderDetails = async () => {
            const [result] = await getUserOrderItems(userId)
            setOrder(result);
        }

        if (userId) {
            getUserOrderDetails()
        }
        // here cart will be empty usestate



    }, [userId])


    return (
        <div>
            <div className="pt-2 md:grid-cols-2 md:grid">

                {order ? order.length > 0 ?
                    order.map((item) =>
                    (< div key={`${item.proId} - ${item.size}-${Date.now()}-${item.count}`} >
                        <Actions proId={item.proId}
                            size={item.size}
                            count={item.count}
                            price={item.price}
                            name={item.name} order={order}
                            username={name}
                            landmark={landMark}
                            address={address}
                            pin={pin}
                            mobile={mobile}
                            isInvalid={isInvalid}
                        ></Actions>
                    </div>)) : (<Skeleton count={4} width={480} height={480}></Skeleton>) : (<img src='/images/addtocart.jpg' className="container mx-auto lg:w-2/5 sm:w-3/5" alt="cart" />)
                }
                <form className="container mx-auto" method="POST">
                    <div className="container grid justify-between w-6/12 mx-auto">

                        <input
                            onChange={({ target }) => { setName(target.value) }}
                            type="text" placeholder="enter your name"
                            className="h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent dark:text-white dark:focus:text-white dark:bg-gray-bgDark dark:border-gray-bgDark" />
                        <input
                            onChange={({ target }) => { setAddress(target.value) }}
                            type="text" placeholder="enter your address"
                            className="h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent dark:text-white dark:focus:text-white dark:bg-gray-bgDark dark:border-gray-bgDark" />
                        <input
                            //here we not need to return setstate so {} is used i think
                            onChange={({ target }) => { setMobile(target.value) }}
                            type="tel" placeholder="enter phone number"
                            className="h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent dark:text-white dark:focus:text-white dark:bg-gray-bgDark dark:border-gray-bgDark" />
                        <input
                            onChange={({ target }) => { setLandMark(target.value) }}
                            type="text" placeholder="enter landmark"
                            className="h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent dark:text-white dark:focus:text-white dark:bg-gray-bgDark dark:border-gray-bgDark" />

                        <input
                            onChange={({ target }) => { setPin(target.value) }}
                            type="text" placeholder="enter pin"
                            className="h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent dark:text-white dark:focus:text-white dark:bg-gray-bgDark dark:border-gray-bgDark" />



                    </div>

                </form>


            </div >
        </div>
    )

    // onClick={handleDelete(item.proId, item.size, item.name, item.count, item.price)}
}