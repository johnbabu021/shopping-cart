
import { useEffect, useState } from 'react'
import { getAllProductDetails } from '../services/firebase'
import { useContext } from 'react'
import Header from '../components/header'
import Product from '../components/products/product'
import userContext from '../context/user'
import Skeleton from 'react-loading-skeleton'

export default function Home() {
    const [product, setProduct] = useState(null)
    useEffect(() => {
        document.title = "Dashboard"
        async function getProducts() {
            const products = await getAllProductDetails()
            setProduct(products)
            //if we call the state in useeffect then function in is not called so no response ie product

        }
        getProducts()

    }, [])
    const { user } = useContext(userContext)
    return (
        <div className="top-0">

            <Header            //here we are passing the user in {} because of javascript  if it is not used then it should be a string
            />
            <div className="container grid pt-24 mx-auto gap-9 xl:grid-cols-5 md:grid-cols-3 sm:justify-center xs:grid-cols-2">

                {!product ? (
                    <div className="grid grid-cols-4 gap-5">
                        {[...new Array(4)].map((_, index) => (
                            <Skeleton key={index} count={1} height={360} width={480} className="px-8 mx-8"></Skeleton>

                        ))}
                    </div>)
                    :
                    product.length > 0 ?
                        (
                            product.map((item) => (<Product

                                key={item.docId}
                                proId={item.docId}
                                productname={item.productName}
                                productprice={item.price}
                                productdescription={item.description}
                            />
                            ))

                        )
                        : (null)
                }


            </div>
        </div>

    )


}