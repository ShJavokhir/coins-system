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

        <table className="table table-striped table-hover">
          <thead>
            <tr >
              <th style={{ minWidth: "30%" }} className="col">
                O`quvchi
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Davomat
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Ball
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Uyga vazifa
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Ball
              </th>
              <th style={{ minWidth: "10%" }} className="col">
                Jami
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              lessonData.length ? (
                lessonData.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ minWidth: "30%", fontWeight:700 }} className="col">
                      {index + 1}. {obj.firstName} {obj.lastName}
                    </td>

                    <td
                      style={{ minWidth: "15%", color: obj.visitStatus === 0 ? "red" : "green", fontWeight:700 }}
                      className="col"
                    >
                      {obj.visitStatus == 0 ? "Yo'q " : "Bor"}
                    </td>
                    <td
                      style={{
                        minWidth: "15%",
                        color: `${obj.ballVisitStatus > 0 ? "green" : "red"}`,
                        fontWeight: 700,
                      }}
                      className="col"
                    >
                      {obj.ballVisitStatus > 0
                        ? `+${obj.ballVisitStatus}`
                        : obj.ballVisitStatus}
                    </td>
                    <td style={{ minWidth: "15%" }} className="col">
                      {obj.homeworkStatus === 0 ? (
                        <span
                          style={{
                            width: "200px",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color:"rgb(255, 77, 73)",
                            fontWeight:700
                          }}
                        >
                          Bajarilmagan{" "}
                        </span>
                      ) : obj.homeworkStatus === 1 ? (
                        <span
                          style={{
                            width: "200px",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color:"rgb(253, 181, 40)",
                            fontWeight:700
                          }}
                        >
                          Chala{" "}
                        </span>
                      ) : (
                        <span
                          style={{
                            width: "200px",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color:"green",
                            fontWeight:700
                          }}
                        >
                          To`liq{" "}
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        minWidth: "15%",
                        color: `${
                          obj.ballHomeworkStatus > 0 ? "green" : "red"
                        }`,
                        fontWeight: 700,
                      }}
                      className="col"
                    >
                      {obj.ballHomeworkStatus > 0
                        ? `+${obj.ballHomeworkStatus}`
                        : obj.ballHomeworkStatus}
                    </td>
                    <td
                      style={{
                        minWidth: "10%",
                        color: `${
                          obj.ballHomeworkStatus + obj.ballVisitStatus > 0
                            ? "green"
                            : "red"
                        }`,
                        fontWeight: 700,
                      }}
                      className="col"
                    >
                      {obj.ballHomeworkStatus + obj.ballVisitStatus}
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
