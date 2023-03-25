import Head from "next/head";
import TableIn from "../../../src/Components/Pages/Dashboard/SundayEvent/TableLesson/TableIn";
import WithAuthComponent from "../../../src/Hocs/PrivateRoute";

export default function Home({independentLessonId }) {
  return (
    <div>
      <Head>
        <title>English House</title>
        <meta name="description" content="English House" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <TableIn independentLessonId ={independentLessonId  }/>
      </WithAuthComponent>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  return {
    props: {
        independentLessonId  : id,
    },
  };
};
