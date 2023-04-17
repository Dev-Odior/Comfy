import React from 'react'
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
  AboutPage,
  AuthWrapper,
  CartPage,
  CheckOut,
  HomePage,
  PrivateRoute,
  SingleProduct,
  ErrorPage,
  ProductPage,
} from './pages'

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route
            path="checkout"
            element={
              <PrivateRoute>
                <CheckOut />
              </PrivateRoute>
            }
          />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:id" element={<SingleProduct />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  )
}

export default App
