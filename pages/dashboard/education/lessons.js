import Head from 'next/head'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'
import LessonsHistory from '../../../src/Components/Pages/Dashboard/Education/Lessons'

export default function Home() {
  return (
    <div>
      <Head>
        <title>English House</title>
        <meta name="description" content="English House" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
         <LessonsHistory/>
      </WithAuthComponent>

    </div>
  )
}
