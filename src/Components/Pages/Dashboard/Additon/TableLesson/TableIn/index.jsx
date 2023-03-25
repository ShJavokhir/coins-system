import React, { useEffect, useState } from "react";
import AdditionProvider from "../../../../../../Data/AdditionProvider";
import MinLoader from "../../../../../Common/MinLoader";
import DashboardLayout from "../../../../../Layout";
import { TableInWrapper } from "./TableIn.style";

const TableIn = ({ additionLessonId }) => {
  const [loading, setLoading] = useState(false);
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    setLoading(true);
    AdditionProvider.getLessonInfo(1, 1000, additionLessonId)
      .then((res) => {
        setExamData(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout>
      <TableInWrapper>
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
                Guruh
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
                      {obj.groupName}
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
      </TableInWrapper>
    </DashboardLayout>
  );
};

export default TableIn;
