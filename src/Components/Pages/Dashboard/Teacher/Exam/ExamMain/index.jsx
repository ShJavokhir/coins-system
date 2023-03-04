import React, { useEffect, useState } from "react";
import TeacherProvider from "../../../../../../Data/TeacherProvider";
import MyLink from "../../../../../Common/MyLink";
import { ExamMainWrapper } from "./ExamMain.style";
import MinLoader from "../../../../../Common/MinLoader";
import Pagination from "rc-pagination";
import moment from "moment";

const ExamMain = () => {
  const [loading, setLoading] = useState(false);
  const [exam, setExam] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setLoading(true);
    TeacherProvider.getAllExam(currentPage, 10)
      .then((res) => {
        setExam(res.data.data);
        console.log(res.data.data);
        setTotalElements(res.data.recordsTotal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  return (
    <ExamMainWrapper>
      <div className="top">
        <h3>Imtihonlar tarixi</h3>
      </div>

      <table className="table table-borderless table-hover">
        <thead>
          <tr>
            <th style={{ minWidth: "32%" }} className="col">
              Guruh nomi
            </th>
            <th style={{ minWidth: "26%" }} className="col">
              Sana
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            exam.length ? (
              exam.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "32%" }} className="col">
                    <MyLink to={`/dashboard/exams/` + obj.id}>
                      {(currentPage - 1) * 10 + index + 1}. {obj.groupName}
                    </MyLink>
                  </td>

                  <td style={{ minWidth: "26%" }} className="col">
                    {moment(new Date(obj.createdDate)).format("DD.MM.YYYY")}-
                    {new Date(obj.createdDate).getHours() + 2}:
                    {new Date(obj.createdDate).getMinutes() + 2}
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
                  Imtihonlar tarixi mavjud emas!
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
        pageSize={10}
      />
    </ExamMainWrapper>
  );
};

export default ExamMain;
