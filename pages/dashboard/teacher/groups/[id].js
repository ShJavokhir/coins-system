import Head from "next/head";
import TeacherInGroup from "../../../../src/Components/Pages/Dashboard/Teacher/TeacherGroup/TeacherInGroup";
import WithAuthComponent from "../../../../src/Hocs/PrivateRoute";

export default function Home({groupId}) {
  return (
    <div>
      <Head>
        <title>English House</title>
        <meta name="description" content="English House" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WithAuthComponent>
        <TeacherInGroup groupId={groupId}/>
      </WithAuthComponent>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  return {
    props: {
      groupId: id,
    },
  };
};
