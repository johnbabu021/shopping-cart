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

                    <div className="container grid justify-between p-7"  style={{backgroundImage:"radial-gradient(#5c7eaf 15%, rgb(28, 74, 143) 45%, rgb(69, 89, 122) 120%)", borderRadius:"20px", marginTop:"50px"}}>
                        {error && <p className="text-red-primary">Error Occoured</p>}

                        <input
                            onChange={({ target }) => { setName(target.value) }}
                            type="text" placeholder="Enter Your Name"
                            className=" inputcover h-10 mb-5 text-center border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />
                        <input
                            onChange={({ target }) => { setEmail(target.value) }}
                            type="email" placeholder="Enter Your Email Address"
                            className="inputcover h-10 mb-5 text-center border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />
                        <input
                            //here we not need to return setstate so {} is used i think
                            onChange={({ target }) => { setMobile(target.value) }}
                            type="tel" placeholder="Enter Phone Number"
                            className="inputcover h-10 mb-5 text-center border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />
                        <input
                            onChange={({ target }) => { setPassword(target.value) }}
                            type="password" placeholder="Enter Password"
                            className="inputcover h-10 mb-5 text-center border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />

                        <button
                            disabled={false}
                            type="submit" className={`${isInvalid && 'opacity-80'} submit items-center p-3 mx-auto font-bold text-white border-transparent rounded-md outline-none bg-purple-medium hover:bg-purple-dark focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50`} style={{backgroundColor:"#092147",fontSize:"1.3rem"}}>Signup</button>
                

                    </div>

                    <div className="flex flex-row justify-center pt-7">
                            <p className="login-p">Already Have an Account? </p>
                            <Link to={ROUTES.LOGIN} className="text-purple-dark login"> Login here</Link>
                        </div>

                </form>

            </div>


        </div>
    )
}