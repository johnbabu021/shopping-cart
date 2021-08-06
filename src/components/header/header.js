import { useHistory } from "react-router-dom"
import '../../custom_styles/header.css'
import * as ROUTES from '../../constants/routes'
import '../../javascript/header'
import { useContext } from "react"
import FirebaseContext from "../../context/firebase"
import userContext from "../../context/user"
import SearchIcon from '@material-ui/icons/Search';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import { useState } from "react"
export default function Header() {
    const history = useHistory()
    const { user } = useContext(userContext)
    const { firebase } = useContext(FirebaseContext)
    const [menu, setMenu] = useState(false)
    //here we are importing the props as destrctured because we have many values at a single prop

    const handleSearch = () => {

    }
    return (
        <header id="header">

            <h1><img className="logo" src="./images/vauld.svg" onClick={() => { history.push(ROUTES.DASHBOARD) }} alt=" "></img></h1>
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
                <div className="flex-center">
                    <SearchIcon />
                    <input placeholder="search products brands and more" onclick={handleSearch} />
                </div>
            ) : null}
            {user ? (
                <div className="flex-end">
                    <IconButton>
                        <PersonRoundedIcon />


                    </IconButton>
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
                    <IconButton>
                        <MenuIcon onClick={() => setMenu(!menu)} />
                    </IconButton>
                </div>
            ) : null}
            <div className={`menu-right ${menu ? 'show-full' : 'show-none'}`}>
                <IconButton>

                    <CloseIcon onClick={() => {
                        setMenu(false)
                    }} />

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