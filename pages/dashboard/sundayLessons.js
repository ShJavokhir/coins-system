import Head from 'next/head'
import TableMain from '../../src/Components/Pages/Dashboard/SundayEvent/TableLesson/TableMain'
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
         <TableMain/>
      </WithAuthComponent>

    </div>
  )
}
