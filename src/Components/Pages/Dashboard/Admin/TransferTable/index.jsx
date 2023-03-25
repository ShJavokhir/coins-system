import moment from 'moment';
import Pagination from 'rc-pagination';
import React, { useEffect, useState } from 'react';
import AdminProvider from '../../../../../Data/AdminProvider';
import MinLoader from '../../../../Common/MinLoader';
import DashboardLayout from '../../../../Layout';
import { TransferTableWrapper } from './TransferTable.style';

const TransferTable = () => {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);
  const onChange = (page) => {
    setCurrentPage(page);
  };

    useEffect(()=>{
        AdminProvider.getAllTransfers(currentPage, 10)
        .then((res) => {
          console.log(res.data.data);
          setInfo(res.data.data);
          setTotalElements(res.data.recordsTotal);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    },[])

    return (
        <DashboardLayout>
        <TransferTableWrapper>
            <div className="top">
                <h3>Guruhdan guruhga o`tkazilgan talabalar haqida ma`lumot</h3>
            </div>
        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "20%" }} className="col">
                Familyasi
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Ismi
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Qaysi guruhdan
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Qaysi guruhga
              </th>
              <th style={{ minWidth: "20%" }} className="col">
                Sana
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              info.length ? (
                info.map((obj, index) => (
               
                  <tr key={index}>
                    <td style={{ width: "20%" }} className="col">
                      {(currentPage - 1) * 10 + index + 1}. {obj.studentLastName}
                    </td>
                    <td style={{ width: "20%" }} className="col">
                      {obj.studentFirstName}
                    </td>
                    <td style={{ width: "20%" }} className="col">
                      {obj.fromGroupName}
                    </td>
                    <td style={{ width: "20%" }} className="col">
                    {obj.toGroupName}
                    </td>
                    <td style={{ width: "20%" }} className="col">
                    {moment(new Date(obj.createdAt)).format('DD.MM.YYYY')}
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
        </TransferTableWrapper>
        </DashboardLayout>
    );
};

export default TransferTable;