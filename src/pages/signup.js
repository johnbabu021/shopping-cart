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
    const isInvalid = name.trim() === "" || password.trim() === "" || email.trim() === "" || mobile.trim() === ""
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
            setError("email")
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
                        {error && <p className="text-center text-red-primary">{error === "email" ? "This email already exists. Please Login" : "Error occured, please try again!"}</p>}

                        <input
                            onChange={({ target }) => { setName(target.value); setError('') }}
                            type="text" placeholder="Enter Full Name"
							value={name}
                            className="form-control text-center px-5 h-10 mb-5 border border-black border-opacity-0 rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />
                        <input
                            onChange={({ target }) => { setEmail(target.value); setError('') }}
                            type="email" placeholder="Email Address"
							value={email}
                            className="form-control text-center h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />
                        <input
                            //here we not need to return setstate so {} is used i think
                            onChange={({ target }) => { setMobile(target.value); setError('') }}
                            type="tel" placeholder="Phone Number"
							value={mobile}
                            className="form-control text-center h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />
                        <input
                            onChange={({ target }) => { setPassword(target.value); setError('') }}
                            type="password" placeholder="Create Password"
							value={password}
                            className="text-center h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />
                        <button
                            disabled={false}
                            type="submit" className={`submit items-center w-20 p-2 mb-4 mx-auto font-bold text-white border-transparent rounded-md outline-none bg-purple-medium ${isInvalid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-dark focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50'}`} >Signup</button>
                        <div className="flex flex-row justify-center ">
                            <p className="login-p">Already have an account?&nbsp;</p>
                            <Link to={ROUTES.LOGIN} className="text-purple-dark login">Login here</Link>
                        </div>

                    </div>

                </form>

            </div>


        </div>
    )
}