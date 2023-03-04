import Head from 'next/head'
import Product from '../../src/Components/Pages/Dashboard/CEO/Product'
import WithAuthComponent from '../../src/Hocs/PrivateRoute'

export default function Home() {
  return (
    <div>
      <Head>
        <title>English House</title>
        <meta name="description" content="English House" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
         <Product/>
      </WithAuthComponent>

    </div>
  )
}
