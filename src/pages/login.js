import { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Header from "../components/header/header"
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

        <div>
            <Header className='grid w-full h-30 place-items-center '></Header>
            <div className="container flex items-center h-screen mx-auto">
                <form className="mx-auto" method="POST" onSubmit={handleLogin}>
                    {error && <p className="text-red-primary">Incorrect username and password</p>}
                    <div className="container grid justify-between p-6" style={{backgroundImage:"radial-gradient(#5c7eaf 15%, rgb(28, 74, 143) 45%, rgb(69, 89, 122) 120%)", borderRadius:"20px", marginTop:"100px"}}>
                        <input
                            onChange={({ target }) => { setEmail(target.value) }}
                            type="email" placeholder="Enter Your Name"
                            className="inputcover h-10 mb-5 border border-white rounded focus:outline-none focus:ring-2 focus:ring-purple-medium focus:border-transparent text-center	" />
       
                        <input
                            onChange={({ target }) => { setPassword(target.value) }}
                            type="password" placeholder="Enter Your Password"
                            className="inputcover h-10 mb-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent  text-center	" />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`${isInvalid && 'opacity-80'} items-center  p-3 mx-auto font-bold text-white border-transparent rounded-md outline-none bg-blue hover:bg-black focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50`} style={{backgroundColor:"#092147",fontSize:"1.3rem"}}>Login</button>
                    </div>
                    <div className="flex flex-row justify-center p-7 m-7">
                        <p>Don't have an account? </p>
                        <Link to={ROUTES.SIGN_UP} className="text-purple-medium"> Signup</Link>
                    </div>
                </form>

            </div>


        </div>
    )

}