import { useEffect } from 'react'
import Header from '../components/header/header'
import Content from '../components/order/content'

export default function Order() {
    useEffect(() => {
        document.title = "Orders"
    }, [])


    return (

        <div className="dark:bg-gray-bgDark">

            <Header />


            <div className="container w-full pt-24 mx-auto h-screen">

                <Content></Content>
            </div>


        </div>

    )
}