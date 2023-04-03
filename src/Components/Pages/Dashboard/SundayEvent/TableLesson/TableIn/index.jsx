import React, { useEffect, useState } from 'react';
import SundayEventProvider from '../../../../../../Data/SundayEventProvider';
import MinLoader from '../../../../../Common/MinLoader';
import DashboardLayout from '../../../../../Layout';
import { TableInWrapper } from './TableIn.style';

const TableIn = ({independentLessonId}) => {
    const [loading, setLoading] = useState(false);
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    setLoading(true)
    SundayEventProvider.getLessonInfo(1,1000,independentLessonId)
      .then((res) => {
        setExamData(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        setLoading(false)
      })
  }, []);

    return (
        <DashboardLayout>
            <TableInWrapper>
            <div className="top">
          <h3>Imtihon haqida</h3>
        </div>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "40%" }} className="col">
                O`quvchi
              </th>
              <th style={{ minWidth: "30%" }} className="col">
                Davomat
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
                      Keldi
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