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
    let isInvalid = email.trim() === '' || password.trim() === '';
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
            // setEmail('')
            // setPassword('')
            setError(error.message)
			isInvalid = false;
        }

    }



    return (

        <div className="dark:bg-gray-bgDark">
            <Header className='grid w-full h-30 place-items-center '></Header>
            <div className="container flex items-center h-screen mx-auto">
                <form className="mx-auto" method="POST" onSubmit={handleLogin}>
                    {error && <p className="text-red-primary">Incorrect username or password</p>}
                    <div className="container grid justify-between w-6/12 pb-5">
                        <input
                            onChange={({ target }) => { setEmail(target.value); setError(''); }}
                            type="email" placeholder="Email Address"
                            className="form-control text-center h-10 mb-5 px-5 border border-white rounded focus:outline-none focus:ring-2 focus:ring-purple-medium focus:border-transparent" />
                        <input
                            onChange={({ target }) => { setPassword(target.value); setError(''); }}
                            type="password" placeholder="Password"
                            className="form-control text-center h-10 mb-5 px-5 border border-white rounded focus:ring-2 focus:ring-purple-medium focus:outline-none focus:ring-purple-600 focus:border-transparent" />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`items-center w-20 p-2 mx-auto font-bold text-white border-transparent rounded-md outline-none bg-purple-medium ${isInvalid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-dark focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50'} `} >Login</button>
                    </div>
                    <div className="flex flex-row justify-center dark:text-white">
                        <p>Dont have an account?&nbsp;</p>
                        <Link to={ROUTES.SIGN_UP} className="text-purple-medium">Signup</Link>
                    </div>
                </form>

            </div>


        </div>
    )

}