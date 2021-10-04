import Header from "../components/header/header"
import Content from '../components/cart/content'
import {  useEffect } from "react"


export default function Cart() {
    useEffect( () => {
        document.title = "Cart"

    }, [])



    return (

        <div className="dark:bg-gray-bgDark">
            <Header />
            <div className="container w-full pt-24 mx-auto h-screen">
                {/* <button className="mb-16 bg-white border-2 text-red-primary border-gray-medium" onClick={handleDeleteAll}>DELETE ALL ITEMS</button> */}

                <Content />

            </div>

        </div>
    )

}