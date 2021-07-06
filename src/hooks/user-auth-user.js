import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListner() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
    //when page loads firebase context is null and when it is invoked it has some value
    //here we are taking the firebase and fieldvalue as objects in provider so we have to take these as objects here also
    const { firebase } = useContext(FirebaseContext)
    useEffect(async () => {
        const listner = await firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser))
                setUser(authUser)
            }
            else {
                localStorage.removeItem("authUser")
                setUser(null)
            }

        })
        //here we are returning a function so like const =()=> we return ()=> simply
        return () => listner()
    }, [firebase])
    //here we are passing as an object if many are there we can destcture that on the destination
    return { user }
}
