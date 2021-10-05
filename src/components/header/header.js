import { useHistory } from "react-router-dom"
import '../../custom_styles/header.css'
import * as ROUTES from '../../constants/routes'
import '../../javascript/header'
import { useContext } from "react"
import FirebaseContext from "../../context/firebase"
// import userContext from "../../context/user"
import SearchIcon from '@material-ui/icons/Search';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import { useState } from "react"
import { useStore } from "../../context/GlobalState"
import useDarkMode from "../../hooks/useDarkMode"
export default function Header() {
    const history = useHistory()
    const { user } = useStore()
    const { firebase } = useContext(FirebaseContext)
    const [menu, setMenu] = useState(false)
    const [search, setSearch] = useState(false)
    const [account, setAccount] = useState(false)
    const [colorTheme, setTheme] = useDarkMode();
    //here we are importing the props as destrctured because we have many values at a single prop

    const handleSearch = () => {
        setSearch(true)
    }
    return (
        <header id="header" className="header dark:bg-black">

            <h1><img className="logo" src="/images/vauld.svg" onClick={() => { history.push(ROUTES.DASHBOARD) }} alt=" "></img></h1>
            {user ? (
                <div className="header-text dark:text-white">
                    <p>Men</p>
                    <p>Women</p>
                    <p>Kids</p>
                    <p>Home & Living</p>
                    <p>Beauty</p>

                </div>
            ) : null}
            {user ? (
                <div className={`flex-center ${search ? 'add-color' : 'remove-color'}`}>
                    <SearchIcon />
                    <input placeholder="search products brands and more" onMouseDown={handleSearch} className={`${search ? 'add-color' : 'remove-color'}`} onMouseLeave={() => { setSearch(false) }} />
                </div>
            ) : null}
            <span onClick={()=> setTheme(colorTheme)} className="cursor-pointer dark:text-white">
				{colorTheme === "light"? (
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
				</svg>):
				(<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
				</svg>)
				}
			</span>
            {user ? (
                <div className="flex-end dark:text-white">
                    <div onMouseOver={() => { setAccount(true) }} onMouseLeave={() => { setAccount(false) }} >

                        <IconButton class="account">
                            <PersonRoundedIcon />
                            <div className={`${account ? 'account-logout dark:text-black' : "account-none"} default-account`} >
                                <p onClick={() => { firebase.auth().signOut() }}>logout</p>
                            </div>
                        </IconButton>
                    </div>

                    <IconButton className="dark:text-white">
                        <FavoriteBorderIcon onClick={() => { history.push(ROUTES.CART) }} />

                    </IconButton>
                    <IconButton className="dark:text-white">
                        <LocalMallOutlinedIcon onClick={() => { history.push(ROUTES.ORDERS) }} />

                    </IconButton>


                </div>
            ) : null}
            {user ? (
                <div className="menu-icon dark:bg-white" >
                    <IconButton onClick={() => setMenu(!menu)}  >
                        <MenuIcon />
                    </IconButton>
                </div>
            ) : null}
            <div className={`menu-right ${menu ? 'show-full dark:bg-black dark:text-white' : 'show-none'}`}>
                <IconButton onClick={() => {
                    setMenu(false)
                }}>

                    <CloseIcon className="close-icon dark:text-white" />

                </IconButton>
                <p>Account</p>
                <p>cart</p>
                <p>Orders</p>
                <p>Men</p>
                <p>Women</p>
                <p>Kids</p>
                <p>Home&Living</p>
                <p>Beauty</p>
                <p>About Us</p>
                <p onClick={() => {
                    history.push(ROUTES.LOGIN)
                    firebase.auth().signOut()
                }}>Logout</p>
            </div>

        </header>

    )

}