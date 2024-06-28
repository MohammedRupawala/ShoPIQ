import { Suspense, lazy, useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Loader from "./components/Loader"
import Header from './components/header'
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
 

  return (
    <>
     <BrowserRouter>
     <Suspense fallback={<Loader/>}>
     <Header/>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/search" element={<Search/>}/>
        {/* Not LogedIn */}
        <Route path="/login" element={<Login/>}/>

                  {/* LoggedIn User */}
     <Route>
       <Route path="/shipping" element={<Shipping/>}/>
       <Route path="/orders" element={<Order/>}/>
      </Route>
       

                  {/* admin Routes */}
      <Route>
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
      </BrowserRouter>
    </>
  )
}

export default App
