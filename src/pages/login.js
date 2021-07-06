import { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Header from "../components/header"
import * as ROUTES from '../constants/routes'
import FirebaseContext from "../context/firebase"

export default function Login() {
    const { firebase } = useContext(FirebaseContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const isInvalid = email === '' || password === '';
    const history = useHistory();
    useEffect(() => {

        document.title = "Login"
    }, [])
    const handleLogin = async (event) => {
        event.preventDefault()

        try {

            await firebase.auth().signInWithEmailAndPassword(email, password)
            history.push(ROUTES.HOME)

        }
        catch (error) {
            setEmail('')
            setPassword('')
            setError(error.message)

        }

    }



    return (

        <div className="container flex items-center h-screen mx-auto">

            <form className="mx-auto" method="POST" onSubmit={handleLogin}>
                {error && <p className="text-red-primary">{error}</p>}
                <div className="container grid justify-between w-6/12 pb-5">
                    <input
                        onChange={({ target }) => { setEmail(target.value) }}
                        type="email" placeholder="enter your email address"
                        className="h-10 mb-5 border border-white rounded focus:outline-none focus:ring-2 focus:ring-purple-medium focus:border-transparent" />
                    <input
                        onChange={({ target }) => { setPassword(target.value) }}
                        type="password" placeholder="enter your password"
                        className="h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />
                    <button
                        disabled={isInvalid}
                        type="submit"
                        className={`${isInvalid && 'opacity-50'} items-center w-20 p-2 mx-auto font-bold text-white border-transparent rounded-md outline-none bg-purple-medium hover:bg-purple-dark focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50`} >Login</button>
                </div>
                <div className="flex flex-row justify-center">
                    <p>Dont have an account?</p>
                    <Link to={ROUTES.SIGN_UP} className="text-purple-medium">Signup</Link>
                </div>
            </form>

            <img src="/images/girls.jpeg" className="w-1/5 " />
        </div>

    )

}