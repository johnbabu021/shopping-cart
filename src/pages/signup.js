import { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import * as ROUTES from '../constants/routes'
import Header from '../components/header/header'
import FirebaseContext from "../context/firebase"
import { doesUserEmailExists } from "../services/firebase"
import '../custom_styles/signup.css'


export default function Signup() {

    const { firebase } = useContext(FirebaseContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState('')
    const history = useHistory()
    const isInvalid = name === "" || password === "" || email === "" || mobile === ""
    const handleSignup = async (event) => {
        event.preventDefault()
        const emailAddressExists = await doesUserEmailExists(email)
        if (emailAddressExists.length === 0) {
            try {

                const createdUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
                await createdUser.user.updateProfile({
                    displayName: name
                })
                await firebase.firestore().collection('users').add({
                    userId: createdUser.user.uid,
                    userName: name.toLowerCase(),
                    userMobile: mobile,
                    cart: [],
                    orders: [],
                    userEmail: email.toLowerCase(),
                    dateCreated: Date.now()
                })
                await firebase.firestore().collection('orders').add({
                    userId: createdUser.user.uid,
                    userName: name.toLowerCase(),
                    mobile: mobile,
                    orders: []
                })
                history.push(ROUTES.HOME)
            }
            catch (error) {
                setName('')
                setEmail('')
                setPassword('')
                setMobile('')
                setError(error.message)
            }
        }
        else {
            setName('')
            setEmail('')
            setPassword('')
            setMobile('')
            setError("email is already taken")
        }

    }

    useEffect(() => {
        document.title = "Signup"
    }, [])

    return (
        <div>
            <Header></Header>


            <div className="grid-center">
                <form method="POST" onSubmit={handleSignup}>

                    <div className="container grid justify-between">
                        {error && <p className="text-red-primary">error occoured</p>}

                        <input
                            onChange={({ target }) => { setName(target.value) }}
                            type="text" placeholder="enter your name"
                            className="h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />
                        <input
                            onChange={({ target }) => { setEmail(target.value) }}
                            type="email" placeholder="enter your email address"
                            className="h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />
                        <input
                            //here we not need to return setstate so {} is used i think
                            onChange={({ target }) => { setMobile(target.value) }}
                            type="tel" placeholder="enter phone number"
                            className="h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />
                        <input
                            onChange={({ target }) => { setPassword(target.value) }}
                            type="password" placeholder="enter your password"
                            className="h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />

                        <button
                            disabled={false}
                            type="submit" className={`${isInvalid && 'opacity-50'} submit items-center w-20 p-2 mx-auto font-bold text-white border-transparent rounded-md outline-none bg-purple-medium hover:bg-purple-dark focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50`} >Signup</button>
                        <div className="flex flex-row justify-center ">
                            <p className="login-p">have an account?</p>
                            <Link to={ROUTES.LOGIN} className="text-purple-dark login">Login here</Link>
                        </div>

                    </div>

                </form>

            </div>


        </div>
    )
}