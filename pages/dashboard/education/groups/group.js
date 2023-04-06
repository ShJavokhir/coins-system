import Head from "next/head";
import EducationInGroup from "../../../../src/Components/Pages/Dashboard/Education/EducationGroup/EducationInGroup";
import WithAuthComponent from "../../../../src/Hocs/PrivateRoute";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    console.log(router)
    const groupId = router.query.id
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

