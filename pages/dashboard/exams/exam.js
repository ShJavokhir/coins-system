import Head from "next/head";
import ExamIn from "../../../src/Components/Pages/Dashboard/Teacher/Exam/ExamIn";
import WithAuthComponent from "../../../src/Hocs/PrivateRoute";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    console.log(router)
    const examId = router.query.id
  return (
    <div>
      <Head>
        <title>English House</title>
        <meta name="description" content="English House" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <ExamIn examId={examId}/>
      </WithAuthComponent>
    </div>
  );
}
