import { useEffect } from 'react'
import Header from '../components/header'
import Content from '../components/order/content'

export default function Order() {
    useEffect(() => {
        document.title = "Orders"
    }, [])


    return (

        <div>

            <Header />


            <div className="container w-full pt-24 mx-auto">

                <Content></Content>
            </div>


        </div>

    )
}