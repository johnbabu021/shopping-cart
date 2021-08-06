import { Link } from 'react-router-dom'
import '../../custom_styles/product.css'
import propTypes from 'prop-types'
export default function Product({ productname, productprice, proId, productdescription }) {


    return (
        //flex items-start pt-20 ml-5 w-4/4 

        <Link to={`product-details/${proId}`}>
            < div className="px-4 rounded-md select-none h-88 cards max-h-84">
                <div className="items-center pt-4 text-center product-images sm:mx-auto sm:container">

                    <img src={`/images/${productname}.jpg`} className="h-40 mx-auto" alt="" />
                </div>
                <div className="items-center justify-between pt-3 pb-2 text-center">
                    <p className="items-center">{productname}</p>
                    <p className="items-center">{'\u20B9'} {productprice}</p>
                    <p className="items-center">{productdescription}</p>
                    <div className="items-center justify-between mt-4 text-center">



                    </div>
                </div>

            </div >
        </Link>
    )
}

Product.propTypes = {
    productname: propTypes.string.isRequired,
    productprice: propTypes.number.isRequired


}