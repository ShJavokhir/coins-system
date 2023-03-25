import Head from 'next/head'
import EducationGroup from '../../../src/Components/Pages/Dashboard/Education/EducationGroup'
import WithAuthComponent from '../../../src/Hocs/PrivateRoute'

export default function Home() {
  return (
    <div>
      <Head>
        <title>English House</title>
        <meta name="description" content="English House" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <EducationGroup/>
      </WithAuthComponent>

    </div>
  )
}