import Head from "next/head";
import EducationInGroup from "../../../../src/Components/Pages/Dashboard/Education/EducationGroup/EducationInGroup";
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
        <EducationInGroup groupId={groupId}/>
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
