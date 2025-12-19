import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet, createRoutesFromElements } from 'react-router-dom'
import Home from './components/Home'
import Aboutus from './components/Aboutus'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import Paramater from './components/Paramater'
import { Route } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         index: '/', // Default route for "/"
//         element: <Home />
//       },
//       {
//         path: 'about',
//         element: <Aboutus />
//       },
//       {
//         path: 'Dash',
//         element: <Dashboard />
//       },
//       {
//         path:'param/:userid',
//         element:<Paramater/>
//       }
//     ]
//   }
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout/>}>
      <Route path='/' element = {<Home/>}/> 
      <Route path='/about' element = {<Aboutus/>}/> 
      <Route path='/dash' element = {<Dashboard/>}/> 
      <Route path='/param/:userid' element = {<Paramater/>}/> 
    </Route>
  )
)

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router} />
  )
}

export default App
