import Head from "next/head";
import EaxmIn from "../../../../src/Components/Pages/Dashboard/Education/TableExam/ExamIn"
import WithAuthComponent from "../../../../src/Hocs/PrivateRoute";

export default function Home({examId}) {
  return (
    <div>
      <Head>
        <title>English House</title>
        <meta name="description" content="English House" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <EaxmIn examId={examId}/>
      </WithAuthComponent>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  return {
    props: {
        examId: id,
    },
  };
};
