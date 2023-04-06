import Head from "next/head";
import LessonIn from "../../../src/Components/Pages/Dashboard/Teacher/Lesson/LessonIn";
import WithAuthComponent from "../../../src/Hocs/PrivateRoute";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    console.log(router)
    const lessonId = router.query.id
  return (
    <div>
      <Head>
        <title>English House</title>
        <meta name="description" content="English House" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <LessonIn lessonId={lessonId}/>
      </WithAuthComponent>
    </div>
  );
}


