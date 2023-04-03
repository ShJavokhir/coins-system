import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import PermitHistory from '../../../src/Components/Pages/Dashboard/CEO/PermitHistory'

export default function Home() {
  return (
    <div>
      <Head>
        <title>English House</title>
        <meta name="description" content="English House" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
         <PermitHistory/>
      </WithAuthComponent>

    </div>
  )
}
