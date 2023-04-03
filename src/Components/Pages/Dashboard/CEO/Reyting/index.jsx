import { Tabs } from "antd";
import Pagination from "rc-pagination";
import React, { useEffect, useState } from "react";
import SeoProvider from "../../../../../Data/SeoProvider";
import MinLoader from "../../../../Common/MinLoader";
import DashboardLayout from "../../../../Layout";
import { ReytingWrapper, TableStyle } from "./Reyting.style";

const Reyting = () => {
  const items = [
    {
      key: "1",
      label: `Talabalar`,
      children: <Students />,
    },
    {
      key: "2",
      label: `Guruhlar`,
      children: <Groups />,
    },
  ];

  return (
    <DashboardLayout>
      <ReytingWrapper>
        <Tabs defaultActiveKey="1" type="card" size="small" items={items} />
      </ReytingWrapper>
    </DashboardLayout>
  );
};

const Students = () => {
  const [loading, setLoading] = useState(false);
  const [studentTable, setStudentTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);

  const onChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setLoading(true);
    SeoProvider.getAllStudent(currentPage, 20)
      .then((res) => {
        setStudentTable(res.data.data);
        setTotalElements(res.data.recordsTotal);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  return (
    <TableStyle>
      <div className="top">
        <h3>Talabalar reytingi</h3>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th style={{ minWidth: "25%" }} className="col">
              O`quvchi
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Username
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Ballari
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Coinlari
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Sarflagan coinlari
            </th>
            <th style={{ minWidth: "15%" }} className="col">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            studentTable.length ? (
              studentTable.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "25%" }} className="col">
                    {(currentPage - 1) * 20 + index + 1}. {obj.firstName}{" "}
                    {obj.lastName}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
                    {obj.username}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
                    {obj.totalBall}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
                    {obj.totalCoin}
                  </td>
                  <td style={{ minWidth: "15%" }} className="col">
                    {obj.spentCoin}
                  </td>
                  <td
                    style={{
                      minWidth: "15%",
                      color: obj.isActive ? "green" : "red",
                    }}
                    className="col"
                  >
                    {obj.isActive ? "ACTIVE" : "BLOCK"}
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
    </TableStyle>
  );
};
const Groups = () => {
    const [loading, setLoading] = useState(false);
    const [group, setGroup] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(10);
  
    const onChange = (page) => {
      setCurrentPage(page);
    };
    useEffect(() => {
      setLoading(true);
      SeoProvider.getAllGroup(currentPage, 10)
        .then((res) => {
            setGroup(res.data.data);
          setTotalElements(res.data.recordsTotal);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [currentPage]);
  
    return (
      <TableStyle>
        <div className="top">
          <h3>Guruhlar reytingi</h3>
        </div>
  
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "20%" }} className="col">
                Guruh nomi
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Kurs nomi
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                O`qituvchi
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Jami ball
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                O`quvchilar soni
              </th>
              
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              group.length ? (
                group.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ minWidth: "20%" }} className="col">
                      {index+1}. {obj.name}
                    </td>
                    <td style={{ minWidth: "20%" }} className="col">
                      {obj.courseName}
                    </td>
                    <td style={{ minWidth: "20%" }} className="col">
                    {obj.teacherFirstName} {obj.teacherLastName}
                    </td>
                    <td style={{ minWidth: "20%" }} className="col">
                      {obj.totalBalance}
                    </td>
                    <td style={{ minWidth: "20%" }} className="col">
                      {obj.studentCount}
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
          pageSize={10}
        />
      </TableStyle>
    );
  };

export default Reyting;
