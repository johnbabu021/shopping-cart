import { useContext, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { Link, useHistory, useParams } from "react-router-dom"
import Header from "../components/header"
import userContext from "../context/user"
import '../custom_styles/productDetails.css'
import { firebase, FieldValue } from "../lib/firebase"
import UseUser from '../hooks/use-user'
import { getProductByProductId, getProductWithUserDetails } from "../services/firebase"
import * as ROUTES from '../constants/routes'
export default function ProductDetails() {
    //destrcturing the element params is like /pd/pid
    const { proId } = useParams()
    const history = useHistory()
    const { user } = UseUser()
    const { user: { uid: userId = '' } } = useContext(userContext)
    const [count, setCount] = useState(1)
    const [size, setSize] = useState(null)
    const [price, setPrice] = useState(null)
    const [cart, setCart] = useState(false)
    const [product, setProduct] = useState(null)
    const [order, setOrder] = useState(false)
    useEffect(() => {
        document.title = "Product-details"
        const productDetailsWithUser = async () => {
            const response = await getProductByProductId(proId)
            setProduct(response)
            setPrice(response.price)
            const [setcart] = await getProductWithUserDetails(proId, userId);
            setCart(setcart)
        }
        if (proId && userId) {
            productDetailsWithUser()
        }


    }, [cart, proId, userId])
    const handleCart = async (event) => {
        event.preventDefault()
        if (size === null) {
            alert('please select a size')
            return null
        }
        setCart(!cart)

        await firebase.firestore().collection('users').doc(user.docId).update({
            cart: cart ?
                //here assigning names are same so we dont need to repeat that again
                FieldValue.arrayRemove({ proId, count, size, name: product.productName, price: price * count })
                : FieldValue.arrayUnion({ proId, count, size, name: product.productName, price: price * count })
        })
        history.push(ROUTES.CART)



    }

    const handleOrder = async (event) => {
        event.preventDefault()
        if (size === null) {
            alert('please select a size')
            return null
        }

        setOrder(!order)
        await firebase.firestore().collection('users').doc(user.docId).update({
            orders:
                FieldValue.arrayUnion({ proId, count, size, name: product.productName, price: price * count })
        })

        history.push(ROUTES.ORDERS)

    }



    return (
        <div>
            <Header></Header>

            {!product ? (
                <>
                    <Skeleton count={1} height={800} width={800} className="px-8 mx-8"></Skeleton>
                </>

            ) :

                (<div className="grid px-8 pt-24 xl:grid-cols-2 sm:grid-rows-2 ">

                    <div className="w-full mt-24 select-none proImage">
                        <img src={`/images/${product.productName}.jpg`} className="px-10 xl:fixed xl:h-4/5" alt="product" />

                    </div>

                    <div className="container mx-auto mt-24">


                        <div className="grid items-center gap-4 border-b border-gray-medium">

                            <h1 className="font-bold">{product.productName}</h1>
                            <p className="font-bold text-gray-medium">{product.description}</p>
                            <div className="grid w-32 grid-cols-2 gap-0 p-1 mb-4 text-xs border border-gray-medium">
                                <div className="flex items-center border-r border-gray-medium">
                                    4.5
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" text-color="#6D28D9"
                                        className='items-center w-3 h-3 text-purple-medium fill-purple'
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>

                                </div>
                                {product.review.length > 1 ? `${product.review.length} reviews` : `${product.review.length} review`}
                            </div>
                        </div>
                        <div className="grid gap-3">

                            <h1 className="text-xl"> {'\u20B9'} {product.price}</h1>
                            <p className="text-purple-medium">Inclusive of all taxes</p>
                        </div>
                        <div className="flex items-center justify-between mb-5 w-72">
                            <h1 className="pt-4 font-bold">Select Size</h1>
                            <Link to="/size chart" className="pt-4 text-purple-medium">size chart</Link>
                            <div className="mt-4 bg-white border-none outline-none text-purple-medium max-h-10">

                                Qty <select onChange={({ target }) => setCount(target.value)}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>

                                </select>
                            </div>
                        </div>

                        {product.size.map((item) => (<button key={item.size} className={`p-3 m-2 text-sm border-2 rounded-full   ${size === item.size ? 'border-purple-end text-purple-end' : 'border-gray-medium'} hover:border-purple-end `}

                            value={item.size}
                            onClick={() => setSize(item.size)}
                        >{item.size}</button>
                        ))}

                        <div className="grid items-center gap-5 mt-8 text-center sm:grid-cols-2 xs:grid-rows-2">
                            <button
                                disabled={order}
                                className={`flex justify-center xs:h-11 sm:h-10 gap-3 pt-2 text-center text-white rounded-md w-50 bg-purple-medium ${order && 'opacity-50'}`} onClick={handleOrder}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>   <p>ADD TO BAG</p>
                            </button>
                            <button
                                className={`xs:h-11 flex justify-center sm:h-10 gap-3 pt-2 text-center border-2 rounded-md w-50 ${cart ? 'cursor-default bg-gray-medium border-2 border-gray-medium' : null}`}
                                onClick={handleCart}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-6 h-6 ${cart ? 'fill-red text-red-primary disabled' : 'text-black'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <p className={`${cart ? 'text-white' : 'text-black'}`}>{cart ? `ADDED` : `ADD TO CART`}</p></button>

                        </div>
                    </div>


                </div>)
            }

        </div >
    )
}