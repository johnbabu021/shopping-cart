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
export default function Header() {
    const history = useHistory()
    const { user } = useStore()
    const { firebase } = useContext(FirebaseContext)
    const [menu, setMenu] = useState(false)
    const [search, setSearch] = useState(false)
    const [account, setAccount] = useState(false)
    //here we are importing the props as destrctured because we have many values at a single prop

    const handleSearch = () => {
        setSearch(true)
    }
    return (
        <header id="header">

            <h1><img className="logo" src="/images/vauld.svg" onClick={() => { history.push(ROUTES.DASHBOARD) }} alt=" "></img></h1>
            {user ? (
                <div className="header-text">
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
            {user ? (
                <div className="flex-end">
                    <div onMouseOver={() => { setAccount(true) }} onMouseLeave={() => { setAccount(false) }} >

                        <IconButton class="account">
                            <PersonRoundedIcon />
                            <div className={`${account ? 'account-logout' : "account-none"} default-account`} >
                                <p onClick={() => { firebase.auth().signOut() }}>logout</p>
                            </div>
                        </IconButton>
                    </div>

                    <IconButton>
                        <FavoriteBorderIcon onClick={() => { history.push(ROUTES.CART) }} />

                    </IconButton>
                    <IconButton>
                        <LocalMallOutlinedIcon onClick={() => { history.push(ROUTES.ORDERS) }} />

                    </IconButton>


                </div>
            ) : null}
            {user ? (
                <div className="menu-icon" >
                    <IconButton onClick={() => setMenu(!menu)}  >
                        <MenuIcon />
                    </IconButton>
                </div>
            ) : null}
            <div className={`menu-right ${menu ? 'show-full' : 'show-none'}`}>
                <IconButton onClick={() => {
                    setMenu(false)
                }}>

                    <CloseIcon className="close-icon" />

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