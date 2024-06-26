import  {  useState } from 'react'
import { OrderItemType, OrderType } from '../../../type';
import { Link } from 'react-router-dom';
import AdminSide from '../../../components/admin/adminSide';
const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const orderItems: OrderItemType[] = [
  {
    name: "Puma Shoes",
    photo: img,
    _id: "asdsaasdas",
    quantity: 4,
    price: 2000,
  },
];

const TransactionManage = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "Harry Potter",
    address: "Hogwarts School of Witchcraft And Wizardry",
    pinCode: 2434341,
    status: "Process",
    subTotal: 4000,
    discount: 1200,
    shipping: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 1200,
    orderItem:orderItems,
    _id: "asdnasjdhbn",
  });
  const{name,address,pinCode,status,subTotal,shipping,discount,tax,total}=order
  const updateHandler = ()=>{
    setOrder((prev)=>({
      ...prev,
      status:prev.status==="Process"? "shipped" : "delivered"
    }))
  }


  

  return (
    <div className='adminContainer'>
       <AdminSide/>
      <main className='managementBox'>
        <section style={{
          padding: "2rem",
        }}>
          <h2>Order Items</h2>
        {  order.orderItem.map(i=>(
          <ProductCard key={i._id} name={i.name} photo={i.photo} quantity={i.quantity} price={i.price} _id={i._id}/>
        ))}
        </section>
        <article  className='shippingInfo'>
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>{name}</p>
          <p>{`${address} ${pinCode}`}</p>
          <h5>Amount Info</h5>
          <p>Subtotal : {subTotal}</p>
          <p>Shipping Charges : {shipping}</p>
          <p>Tax : {tax}</p>
          <p>Discount : {discount}</p>
          <p>Final Amount : {total}</p>
          <p>status :
            <span className={
              status==="Process"?"red"
            :status==='shipped'?"purple"
            :"green"}>
              {status}</span> 
              </p>
              <button onClick={updateHandler}>Process Status</button>
        </article>
      </main>
    </div>
  )
}

const ProductCard = ({name,photo,price,quantity,_id}:OrderItemType)=>{
  return(
    <div className='transactionBox'>
      <img src={photo} alt={name}/>
      <Link to={`/products/${_id}`}>{name}</Link>
      <span>${price} x {quantity} = ${price * quantity}</span>
    </div>
  )
}

export default TransactionManage