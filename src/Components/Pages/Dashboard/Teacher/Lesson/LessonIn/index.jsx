import React, { useEffect, useState } from "react";
import TeacherProvider from "../../../../../../Data/TeacherProvider";
import MinLoader from "../../../../../Common/MinLoader";
import MyLink from "../../../../../Common/MyLink";
import DashboardLayout from "../../../../../Layout";
import { LessonInWrapper } from "./LessonIn.style";

const LessonIn = ({ lessonId }) => {
  const [loading, setLoading] = useState(false);
  const [lessonData, setLessonData] = useState([]);
  const [homeWork, setHomeWork] = useState(0);
  const [visit, setVisit] = useState(0);

  useEffect(() => {
    TeacherProvider.getOneLessonInfo(lessonId)
      .then((res) => {
        setLessonData(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(()=>{
  //     TeacherProvider.getOneGroup()
  // },[])
  return (
    <DashboardLayout>
      <LessonInWrapper>
        <div className="top">
          <h3>Darslar haqida</h3>
        </div>

        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "40%" }} className="col">
                O`quvchi
              </th>
              <th style={{ minWidth: "30%" }} className="col">
                Uyga vazifa
              </th>
              <th style={{ minWidth: "30%" }} className="col">
                Davomat
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              lessonData.length ? (
                lessonData.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ minWidth: "40%" }} className="col">
                      {/* <MyLink to={`/dashboard/lessons/` + obj.id}> */}
                      {index + 1}. {obj.firstName} {obj.lastName}
                      {/* </MyLink> */}
                    </td>

                    <td style={{ minWidth: "30%" }} className="col">
                      {obj.homeworkStatus === 0 ? (
                        <span style={{ width:"200px",borderRadius:"5px", padding:"5px 10px" }}>
                          Bajarilmagan <span style={{background: "rgb(255, 77, 73)", width:"50px",borderRadius:"50%", height:"50px", padding:"10px 4px", color:"#fff", fontWeight:"700"}}> -10ball</span>
                        </span>
                      ) : obj.homeworkStatus === 1 ? (
                        <span style={{width:"200px",borderRadius:"5px", padding:"5px 10px"}}>Chala <span style={{background: "rgb(253, 181, 40)", width:"50px",borderRadius:"50%", height:"50px", padding:"10px 4px", color:"#fff", fontWeight:"700"}}> +5ball</span></span>
                      ) : (
                        <span style={{width:"200px",borderRadius:"5px", padding:"5px 10px"}}>To`liq <span style={{background: "rgb(114, 225, 40)", width:"50px",borderRadius:"50%", height:"50px", padding:"10px 4px", color:"#fff", fontWeight:"700"}}> +15ball</span></span>
                      )}
                    </td>
                    <td style={{ minWidth: "30%" }} className="col">
                      {obj.visitStatus == 0 ? "Yo'q -15ball" : "Bor 10ball"}
                    </td>
                  </tr>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: 30,
                  }}
                >
                  <h3 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                    Ma`lumot mavjud emas!
                  </h3>
                </div>
              )
            ) : (
              <MinLoader />
            )}
          </tbody>
        </table>
      </LessonInWrapper>
    </DashboardLayout>
  );
};

export default LessonIn;
