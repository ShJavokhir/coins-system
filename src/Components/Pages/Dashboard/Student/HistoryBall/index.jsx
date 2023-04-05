import React, { useEffect, useState } from "react";
import MinLoader from "../../../../Common/MinLoader";
import DashboardLayout from "../../../../Layout";
import { HistoryBallWrapper } from "./HistoryBall.style";
import Pagination from "rc-pagination";
import moment from "moment";
import StudentProvider from "../../../../../Data/StudentProvider";

const HistoryBall = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);
  

  const onChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setLoading(true)
    StudentProvider.getStudentBallHistory(currentPage, 20, localStorage.getItem('id'))
      .then((res) => {
        setHistory(res.data.data);
        setTotalElements(res.data.recordsTotal);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        setLoading(false)
      });
  }, [currentPage]);

  return (
    <DashboardLayout>
      <HistoryBallWrapper>
      <div className="top">
          <h3>Ballar tarixi</h3>
        </div>

        <table className="table table-striped table-hover">
          <thead>
            <tr >
              <th style={{ minWidth: "25%" }} className="col">
                Guruhi
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Ball
              </th>
              <th style={{ minWidth: "35%" }} className="col">
              Ball Statusi
              </th>
              <th style={{ minWidth: "25%" }} className="col">
                Sana
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              history.length ? (
                history.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ minWidth: "25%" }} className="col">
                    {(currentPage - 1) * 20 +  index + 1}. {obj.groupName===null ? "Guruh ko'rsatilmagan": obj.groupName} 
                    </td>
                    <td style={{ minWidth: "15%", color: obj.ball>0 ? "green" : "red" }} className="col">
                    {obj.ball}
                    </td>
                    <td style={{ minWidth: "35%", color: obj.ball>0 ? "green" : "red"  }} className="col">
                      {obj.ballStatus}
                    </td>
                    <td style={{ minWidth: "25%" }} className="col">
                    {moment(new Date(obj.createdAt)).format("DD.MM.YYYY")}
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
        <Pagination
        onChange={onChange}
        current={currentPage}
        total={totalElements}
        pageSize={20}
      />
      </HistoryBallWrapper>
    </DashboardLayout>
  );
};

export default HistoryBall;
