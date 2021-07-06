import { useContext, useEffect, useState } from "react"
import userContext from "../context/user"
import { getUserByUserId, getUserOrderByUserId, getUserOrderItems } from "../services/firebase"

export default function UseUser() {
    const [activerUser, setActiverUser] = useState(null)
    const [userOrder, setUserOrder] = useState(null)
    const { user } = useContext(userContext)

    useEffect(() => {
        async function getUserObjByUserId() {
            const [result] = await getUserByUserId(user.uid)
            setActiverUser(result)
            const [response] = await getUserOrderByUserId(user.uid)
            setUserOrder(response)
        }
        if (user?.uid) {
            getUserObjByUserId();
        }

    }, [user])

    //here we returns an object which can be called using the name user
    return ({ user: activerUser, orderCollection: userOrder })
}