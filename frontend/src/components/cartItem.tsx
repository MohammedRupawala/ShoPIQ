import { FaMinus, FaPlus, FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"

type CartItems = {
    cartItem :any
}

const CartItem = ({cartItem}:CartItems) => {
    const{photo,productId,price,name,quantity,stock} = cartItem
  return (
    <div className="cartItem">
        <img src={photo} alt={name}/>
        <article>
            <Link to="/product/productId">{name}</Link>
            <span>{price}</span>
        </article>
        
        <div>
            <button><FaPlus/></button>
            <p>{quantity}</p>
            <button><FaMinus/></button>
        </div>
        <button><FaTrash/></button>
    </div>
  )
}

export default CartItem