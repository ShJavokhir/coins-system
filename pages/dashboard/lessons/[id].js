import Head from "next/head";
import LessonIn from "../../../src/Components/Pages/Dashboard/Teacher/Lesson/LessonIn";
import WithAuthComponent from "../../../src/Hocs/PrivateRoute";

export default function Home({lessonId}) {
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

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  return {
    props: {
      lessonId: id,
    },
  };
};
