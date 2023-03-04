import { ToastContainer } from 'react-toastify'
import { UserContextProvider } from '../src/Context/UserContext'
import '../styles/globals.css'
import { GlobalStyle } from '../styles/globalStyle'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLayoutEffect, useState } from 'react';
import Loader from "../src/Components/Common/Loader"

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true)

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <>
    <UserContextProvider>
      <Component {...pageProps} />
      {loading && <Loader/>}
      <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      </UserContextProvider>
      <GlobalStyle/>
    </>
  )

}

export default MyApp
