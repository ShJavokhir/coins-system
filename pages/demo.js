import Head from 'next/head'
import Demo from '../src/Components/Pages/Demo'

export default function Home() {
    return (
        <div>
            <Head>
                <title>English House</title>
                <meta name="description" content="English House" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Demo />

        </div>
    )
}
