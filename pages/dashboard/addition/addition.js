import Head from "next/head";
import TableIn from "../../../src/Components/Pages/Dashboard/Additon/TableLesson/TableIn";
import WithAuthComponent from "../../../src/Hocs/PrivateRoute";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    console.log(router)
    const additionLessonId = router.query.id
  return (
    <div>
      <Head>
        <title>English House</title>
        <meta name="description" content="English House" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <TableIn additionLessonId ={additionLessonId }/>
      </WithAuthComponent>
    </div>
  );
}

