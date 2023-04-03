import moment from "moment";
import Pagination from "rc-pagination";
import React, { useEffect, useState } from "react";
import DirectorProvider from "../../../../../Data/DirectorProvider";
import MinLoader from "../../../../Common/MinLoader";
import DashboardLayout from "../../../../Layout";
import { LessonsWrapper } from "./Lessons.style";
import { Tabs } from "antd";

const Darslar=()=>{
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [forRender, setForRender] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);
  const onChange = (page) => {
    setCurrentPage(page);
  };

    useEffect(() => {
        setLoading(true);
        DirectorProvider.getAllLessons(currentPage , 10)
          .then((res) => {
            console.log(res.data);
            setLessons(res.data.data);
            setTotalElements(res.data.recordsTotal);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => setLoading(false));
      }, [currentPage]);
  return(
      <>
      <h3>Darslar tarixi</h3>
      <LessonsWrapper>
      <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ width: "40%" }} className="col">
                Guruh nomi
              </th>
              <th style={{ width: "30%" }} className="col">
                O`qituvchi
              </th>
              <th style={{ width: "30%" }} className="col">
                Yaratilgan sana
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              lessons.length ? (
                lessons.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ width: "40%" }} className="col">
                    {(currentPage - 1) * 10 + index + 1}. {obj.groupName}
                    </td>
                    <td style={{ width: "30%"}} className="col">
                    {obj.teacherFirstName} {obj.teacherLastName}
                    </td>
                    <td style={{ width: "30%" }} className="col">
                    {moment(new Date(obj.createdDate)).format("DD.MM.YYYY")}
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
      </LessonsWrapper>
      </>
  )
}
const AdditionLessons=()=>{
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [forRender, setForRender] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);
  const onChange = (page) => {
    setCurrentPage(page);
  };

    useEffect(() => {
        setLoading(true);
        DirectorProvider.getAllAdditionLesson(currentPage , 10)
          .then((res) => {
            console.log(res.data);
            setLessons(res.data.data);
            setTotalElements(res.data.recordsTotal);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => setLoading(false));
      }, [currentPage]);
  return(
      <>
      <h3>Qo`shimcha darslar tarixi</h3>
      <LessonsWrapper>
      <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ width: "40%" }} className="col">
                Kurs nomi
              </th>
              <th style={{ width: "30%" }} className="col">
                O`qituvchi
              </th>
              <th style={{ width: "30%" }} className="col">
                Yaratilgan sana
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              lessons.length ? (
                lessons.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ width: "40%" }} className="col">
                    {(currentPage - 1) * 10 + index + 1}. {obj.courseName}
                    </td>
                    <td style={{ width: "30%"}} className="col">
                    {obj.firstNameTeacher} {obj.lastNameTeacher}
                    </td>
                    <td style={{ width: "30%" }} className="col">
                    {moment(new Date(obj.createDate)).format("DD.MM.YYYY")}
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
      </LessonsWrapper>
      </>
  )
}
const SundayEventLessons=()=>{
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [forRender, setForRender] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);
  const onChange = (page) => {
    setCurrentPage(page);
  };

    useEffect(() => {
        setLoading(true);
        DirectorProvider.getAllSundayLesson(currentPage , 10)
          .then((res) => {
            console.log(res.data);
            setLessons(res.data.data);
            setTotalElements(res.data.recordsTotal);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => setLoading(false));
      }, [currentPage]);
  return(
      <>
      <h3>Qo`shimcha darslar tarixi</h3>
      <LessonsWrapper>
      <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ width: "40%" }} className="col">
              O`qituvchi
              </th>
              <th style={{ width: "30%" }} className="col">
                Yaratilgan sana
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              lessons.length ? (
                lessons.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ width: "40%" }} className="col">
                    {(currentPage - 1) * 10 + index + 1}.{obj.firstNameTeacher} {obj.lastNameTeacher}
                    </td>
                    <td style={{ width: "30%" }} className="col">
                    {moment(new Date(obj.createDate)).format("DD.MM.YYYY")}
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
      </LessonsWrapper>
      </>
  )
}

const Lessons = () => {
  const items = [
    {
      key: "1",
      label: `Darslar tarixi`,
      children: (
        <Darslar />
      ),
    },
    {
      key: "2",
      label: `Qo'shimcha darslar`,
      children: (
        <AdditionLessons />
      ),
    },
    {
      key: "3",
      label: `Sunday event`,
      children: (
        <SundayEventLessons/>
      ),
    },
  ];

  return (
    <DashboardLayout>
        <Tabs defaultActiveKey="1" type="card" size="large" items={items} />
    </DashboardLayout>
  );
};

export default Lessons;
