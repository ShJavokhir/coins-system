import React, { useEffect, useState } from 'react';
import { TableMainWrapper } from './TableMain.style';
import DashboardLayout from "../../../../../Layout"
import MinLoader from '../../../../../Common/MinLoader';
import Pagination from 'rc-pagination';
import MyLink from '../../../../../Common/MyLink';
import moment from 'moment';
import AdditionProvider from '../../../../../../Data/AdditionProvider';
const TableMain = () => {
    const [loading, setLoading] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(20);
  
    const onChange = (page) => {
      setCurrentPage(page);
    };
  
    useEffect(() => {
      setLoading(true);
      AdditionProvider.getAllLessons(currentPage, 10)
        .then((res) => {
            setLessons(res.data.data);
          console.log(res.data.data);
          setTotalElements(res.data.recordsTotal);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }, [currentPage]);
  
    return (
        <DashboardLayout>
        <TableMainWrapper>
        <div className="top">
        <h3>Darslar tarixi</h3>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th style={{ minWidth: "32%" }} className="col">
              Kurs nomi
            </th>
            <th style={{ minWidth: "32%" }} className="col">
              O`qituvchi
            </th>
            <th style={{ minWidth: "26%" }} className="col">
              Sana
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            lessons.length ? (
                lessons.map((obj, index) => (
                <tr key={index}>
                  <td style={{ minWidth: "32%" }} className="col">
                    <MyLink to={`/dashboard/addition/addition?id=${obj.id}`}>
                      {(currentPage - 1) * 10 + index + 1}. {obj.courseName}
                    </MyLink>
                  </td>

                  <td style={{ minWidth: "32%" }} className="col">
                  {obj.firstNameTeacher} {obj.lastNameTeacher} ({obj.usernameTeacher})
                  </td>
                  <td style={{ minWidth: "26%" }} className="col">
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
        </TableMainWrapper>
        </DashboardLayout>
    );
};

export default TableMain;