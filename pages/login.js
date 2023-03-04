import Head from 'next/head'
import Login from '../src/Components/Pages/Login'

export default function Home() {
  return (
    <div>
      <Head>
        <title>English House</title>
        <meta name="description" content="English House" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Login/>

    </div>
  )
}
