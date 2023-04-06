import Head from "next/head";
import GroupIn from "../../../src/Components/Pages/Dashboard/Admin/Groups/GroupIn";
import WithAuthComponent from "../../../src/Hocs/PrivateRoute";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();
    console.log(router)
    const groupId = router.query.id;
    
    return (
        <div>
            <Head>
                <title>English House</title>
                <meta name="description" content="English House" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <WithAuthComponent>
                <GroupIn groupId={groupId} />
            </WithAuthComponent>
        </div>
    );
}
