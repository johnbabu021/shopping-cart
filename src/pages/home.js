
import { useEffect, useState } from 'react'
import { getAllProductDetails } from '../services/firebase'
import Header from '../components/header/header'
import Product from '../components/products/product'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import '../custom_styles/home.css'
import useDarkMode from '../hooks/useDarkMode'
export default function Home() {
    const [product, setProduct] = useState(null)
    const [colorTheme] = useDarkMode();
    useEffect(() => {
        document.title = "Dashboard"
        async function getProducts() {
            const products = await getAllProductDetails()
            setProduct(products)
            //if we call the state in useeffect then function in is not called so no response ie product

        }
        getProducts()

    }, [])
    return (
        <div className="top-0 dark:bg-gray-bgDark md:h-screen">

            <Header            //here we are passing the user in {} because of javascript  if it is not used then it should be a string
            />
            <div className="container grid pt-24 mx-auto gap-9 xl:grid-cols-5 md:grid-cols-3 xs:justify-center xs:grid-cols-1">

                {!product ? (
                    <div className="grid grid-cols-4 gap-5 skeleton">
                        {[...new Array(2)].map((_, index) => (
                            colorTheme === "dark"? (
                                <Skeleton
                                count={1}
                                height={800}
                                width={800}
                                className="px-8 mx-8"
                              ></Skeleton>
                              ):(
                                <SkeletonTheme
                                className="skeleton"
                                color="#1E1E1E"
                                highlightColor="#121212"
                              >
                              <Skeleton
                                count={1}
                                height={800}
                                width={800}
                                className="px-8 mx-8"
                              ></Skeleton>
                              </SkeletonTheme>
                              )

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