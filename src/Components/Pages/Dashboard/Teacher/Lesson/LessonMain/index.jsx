import moment from "moment/moment";
import Pagination from "rc-pagination";
import React, { useEffect, useState } from "react";
import TeacherProvider from "../../../../../../Data/TeacherProvider";
import MinLoader from "../../../../../Common/MinLoader";
import MyLink from "../../../../../Common/MyLink";
import DashboardLayout from "../../../../../Layout";
import { LessonMainWrapper } from "./LessonMain.style";

const LessonMain = ({ RefObj, setIsOpen }) => {
    const [loading, setLoading] = useState(false);
  const [lesson, setGLesson] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setLoading(true);
    TeacherProvider.getAllLesson(currentPage, 10)
      .then((res) => {
        console.log("lesson", res.data.data);
        setGLesson(res.data.data);
        setTotalElements(res.data.recordsTotal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  return (
    <DashboardLayout>
      <LessonMainWrapper>
      <div className="top">
          <h3>Darslar tarixi</h3>
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
              lesson.length ? (
                lesson.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ minWidth: "32%" }} className="col">
                      <MyLink to={`/dashboard/lessons/` + obj.id}>
                        {(currentPage - 1) * 10 + index + 1}. {obj.groupName}
                      </MyLink>
                    </td>
                    
                    <td style={{ minWidth: "26%" }} className="col">
                    {moment(new Date(obj.createDate)).format('DD.MM.YYYY')}-
                    {new Date(obj.createDate).getHours()+2}:
                    {new Date(obj.createDate).getMinutes()+2}
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
                    Darslar tarixi mavjud emas!
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
        </LessonMainWrapper>
    </DashboardLayout>
  );
};

export default LessonMain;
