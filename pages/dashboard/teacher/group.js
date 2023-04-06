import Head from "next/head";
import { useRouter } from "next/router";
import WithAuthComponent from "../../../src/Hocs/PrivateRoute";
import TeacherInGroup from "../../../src/Components/Pages/Dashboard/Teacher/TeacherGroup/TeacherInGroup";

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
                <TeacherInGroup groupId={groupId} />
            </WithAuthComponent>
        </div>
    );
}
