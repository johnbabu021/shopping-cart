import Header from "../components/header"
import Content from '../components/cart/content'
import {  useEffect } from "react"


export default function Cart() {
    useEffect( () => {
        document.title = "Cart"

    }, [])



    return (

        <div>
            <Header />
            <div className="container w-full pt-24 mx-auto">
                {/* <button className="mb-16 bg-white border-2 text-red-primary border-gray-medium" onClick={handleDeleteAll}>DELETE ALL ITEMS</button> */}

                <Content />

            </div>

        </div>
    )

}