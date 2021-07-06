import { Link, useHistory } from "react-router-dom"
import '../custom_styles/header.css'
import * as ROUTES from '../constants/routes'
import '../javascript/header'
import { useContext } from "react"
import FirebaseContext from "../context/firebase"
import userContext from "../context/user"

export default function Header() {
    const history = useHistory()
    const { user } = useContext(userContext)
    const { firebase } = useContext(FirebaseContext)
    //here we are importing the props as destrctured because we have many values at a single prop
    return (
        <header className="items-center h-20 bg-white" id="header" >
            <div className="items-center justify-between w-full h-full gap-4 ">
                <div className="flex h-full max-w-screen-lg md:justify-between md:gap-10 xl:gap-14 sm:gap-14 sm:justify-start">
                    <div className="container mx-auto lg:text-center">
                        <h1 className="items-center justify-center w-10 h-full mx-auto text-right">
                            <Link to={ROUTES.HOME}>  <img src="/images/logo.png" className=""></img></Link>
                        </h1>
                    </div>
                    {user ? (<h1 className="px-8 m-3 xl:flex xs:hidden xl:ml-24">
                        <Link to="/" className="px-2">Men</Link>
                        <Link to="/" className="px-2">Women</Link>
                        <Link to="/" className="px-2">Kids</Link>
                        <Link to="/" className="px-2">Home<span className="px-1">&</span>Living</Link>
                        <Link to="/" className="px-2">Beauty</Link>


                    </h1>) : null}
                    {user && <div className="justify-between h-full mx-10 mt-4 align-center sm:hidden md:flex lg:flex xs:hidden xl:ml-24">
                        <div className="search-container">
                            <input type="text" name="search" placeholder="Search..." className=" search-input" />
                            <a href="#" className="search-btn">
                                <i className="fas fa-search text-purple-dark"></i>
                            </a>
                        </div>
                    </div>
                    }
                    <div className="flex mx-auto">
                        <div className="flex items-center justify-end float-right w-full userIcons gap-14 xl:ml-24">

                            {user ? (
                                <div className="flex jusitfy-end">
                                    <div className="mx-2 text-center">
                                        <Link to={ROUTES.ORDERS}>   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        </Link>
                                    </div>
                                    <div className="mx-2">
                                        <Link to={ROUTES.CART}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>

                                        </Link>
                                    </div>
                                    <div className="mx-2">
                                        <Link to={ROUTES.ORDERS}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="mx-2">
                                        <button onClick={() => {
                                            history.push(ROUTES.LOGIN)
                                            firebase.auth().signOut()
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </button>

                                    </div>
                                </div>

                            ) : (
                                <div className="right-0">
                                    <Link to={ROUTES.LOGIN} className="p-2 text-white rounded-md bg-purple-medium ">Login</Link>
                                    <Link to={ROUTES.SIGN_UP} className="p-2 text-white rounded-md bg-purple-medium">Signup</Link>

                                </div>
                            )}

                        </div>
                    </div>


                </div>

            </div>



        </header>

    )

}