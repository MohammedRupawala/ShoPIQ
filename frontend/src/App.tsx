import { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {userNotExist,userExist} from "./redux/reducer/userReducer"
import {Toaster} from "react-hot-toast"
import Loader from "./components/Loader"
import Header from './components/header'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './redux/api/userAPI'
import { userReducerIntialState } from './types/reducer-types'
import Protected from './components/protected'
const Home = lazy(()=>import("./pages/home"))
const Cart = lazy(()=>import("./pages/cart"))
const Search = lazy(()=>import("./pages/search"))
const Shipping = lazy(()=>import("./pages/shipping"))
const Login = lazy(()=>import("./pages/login"))
const Order = lazy(()=>import("./pages/orders"))

//             admin Routing
const NewProduct = lazy(() => import('./pages/admin/Management/NewProduct'));
const  ProductManagement = lazy(()=>import( './pages/admin/Management/ProductManagement'));
const TransactionManage = lazy(()=>import('./pages/admin/Management/TransactionManage'));
const Dashboard = lazy(() => import('./pages/admin/dashboard'));
const Products = lazy(() => import('./pages/admin/products'));
const Customer = lazy(() => import('./pages/admin/Customer'));
const Transaction = lazy(() => import('./pages/admin/Transaction'));
const BarChart = lazy(() => import('./pages/admin/Charts/BarChart'));
const PieChart = lazy(() => import('./pages/admin/Charts/PieChart'));
const LineChart = lazy(() => import('./pages/admin/Charts/LineChart'));
const CouponGenerator = lazy(() => import('./pages/admin/Apps/CouponGenerator'));
const Toss = lazy(() => import('./pages/admin/Apps/Toss'));
const StopWatch = lazy(() => import('./pages/admin/Apps/StopWatch'));

function App() {
  const {user,loading} = useSelector(
    (state : {userReducer : userReducerIntialState})=>state.userReducer
    
  )
 const dispatch = useDispatch()
  useEffect(()=>{
    onAuthStateChanged(auth,async(users)=>{
      if(users){
        const data = await getUser(users.uid)
        dispatch(userExist(data.users))
        console.log("Logged IN")
      }else{
        dispatch(userNotExist())
      }
    })
  },[])
  return loading?<Loader/>:(
    <>
     <BrowserRouter>
     <Suspense fallback={<Loader/>}>
     <Header user={user}/>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/search" element={<Search/>}/>
        {/* Not LogedIn */}
       
       <Route path="/login" 
       element={
       <Protected isLoggedIN={user ? false : true}>
        <Login/>
        </Protected>
      }/>
      

                  {/* LoggedIn User */}
     <Route element={
      <Protected isLoggedIN={true}/>
     }>
       <Route path="/shipping" element={<Shipping/>}/>
       <Route path="/orders" element={<Order/>}/>
      </Route>
       

                  {/* admin Routes */}
      <Route
      element={<Protected isAdmin={user?.role==="admin"?true : false} isLoggedIN={true} adminRoutes={true}/>}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/customer" element={<Customer />} />
        <Route path="/admin/transaction" element={<Transaction />} />
          {/*Management Routes*/}
        <Route path="/admin/product/new" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<ProductManagement />} />
        <Route path="/admin/Transaction/:id" element={<TransactionManage />} />
          {/* Charts Routes */}
        <Route path="/admin/charts/bar" element={<BarChart />} />
        <Route path="/admin/charts/pie" element={<PieChart />} />
        <Route path="/admin/charts/line" element={<LineChart />} />
          {/* Apps Routes */}
        <Route path="/admin/apps/stopwatch" element={<StopWatch />} />
        <Route path="/admin/apps/coupongenerator" element={<CouponGenerator />} />
        <Route path="/admin/apps/toss" element={<Toss />} />
      </Route>
        
      </Routes>
      </Suspense>
      <Toaster position='bottom-center'/>
      </BrowserRouter>
    </>
  )
}

export default App

