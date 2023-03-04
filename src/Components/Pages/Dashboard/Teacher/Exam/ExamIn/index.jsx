import React, { useEffect, useState } from "react";
import TeacherProvider from "../../../../../../Data/TeacherProvider";
import MinLoader from "../../../../../Common/MinLoader";
import DashboardLayout from "../../../../../Layout";
import { ExamInWrapper } from "./ExamIn.style";

const ExamIn = ({ examId }) => {
  const [loading, setLoading] = useState(false);
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    TeacherProvider.getOneExamInfo(examId)
      .then((res) => {
        setExamData(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DashboardLayout>
      <ExamInWrapper>
      <div className="top">
          <h3>Imtihon haqida</h3>
        </div>

        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "40%" }} className="col">
                O`quvchi
              </th>
              <th style={{ minWidth: "30%" }} className="col">
                Imtihon bali
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              examData.length ? (
                examData.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ minWidth: "40%" }} className="col">
                      {index + 1}. {obj.firstName} {obj.lastName}
                    </td>
                    <td style={{ minWidth: "30%" }} className="col">
                      {obj.examScore}
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
        </ExamInWrapper>
    </DashboardLayout>
  );
};

export default ExamIn;
