import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../../Layout";
import SeoProvider from "../../../../../Data/SeoProvider";
import { PermitWrapper } from "./PermitHistory.style";
import Pagination from "rc-pagination";
import MinLoader from "../../../../Common/MinLoader";
import moment from "moment";

const PermitHistory = () => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);
  const onChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setLoading(true);
    SeoProvider.getPermitHistory(currentPage, 10)
      .then((res) => {
        console.log(res);
        setHistory(res.data.data);
        setTotalElements(res.data.recordsTotal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  },[currentPage]);
  return (
    <DashboardLayout>
      <PermitWrapper>
        <h3>Haftalik imtihonga ruxsat berilganlar tarixi</h3>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ width: "40%" }} className="col">
                Guruh nomi
              </th>
              <th style={{ width: "30%" }} className="col">
                Yaratilgan sana
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              history.length ? (
                history.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ width: "40%" }} className="col">
                      {(currentPage - 1) * 10 + index + 1}.
                      {obj.groupName}
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
      </PermitWrapper>
    </DashboardLayout>
  );
};

export default PermitHistory;
