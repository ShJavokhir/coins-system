import React, { useEffect, useState } from "react";
import MinLoader from "../../../../Common/MinLoader";
import DashboardLayout from "../../../../Layout";
import { HistoryBallWrapper } from "./HistoryBall.style";
import Pagination from "rc-pagination";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import DirectorProvider from "../../../../../Data/DirectorProvider";

const HistoryBall = () => {
  const { control } =useForm();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);
  const [studentId, setStudentId] = useState(null)

  const onChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setLoading(true)
    DirectorProvider.getStudentBallHistory(currentPage, 20, studentId)
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
  }, [currentPage, studentId]);

  useEffect(() => {
    DirectorProvider.getAllStudent(1, 1000)
      .then((res) => {
        console.log(res.data);
        setStudents(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const studentsOption = [
    {label:"Barchasi", value:null},
    ...students.map((i) => ({
      label: i.firstName + " "+ i.lastName +" " + "("+ i.username+ ")",
      value: i.id,
    })),
  ];

  return (
    <DashboardLayout>
      <HistoryBallWrapper>
      <div className="top">
          <h3>Ballar tarixi</h3>
          <Controller
                control={control}
                name="studentId"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    className="select"
                    value={value}
                    placeholder="O'quvchini tanlang"
                    options={studentsOption}
                    onBlur={onBlur}
                    onChange={(v) => {
                      onChange(v);
                      setStudentId(v.value)
                      console.log(v);
                    }}
                    ref={ref}
                  />
                )}
              />
        </div>

        <table className="table table-striped table-hover">
          <thead>
            <tr >
              <th style={{ minWidth: "25%" }} className="col">
                O`quvchi
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Username
              </th>
              <th style={{ minWidth: "5%" }} className="col">
                Ball
              </th>
              <th style={{ minWidth: "25%" }} className="col">
              Ball Statusi
              </th>
              <th style={{ minWidth: "15%" }} className="col">
                Guruhi
              </th>
              <th style={{ minWidth: "15%" }} className="col">
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
                      {(currentPage - 1) * 20 +  index + 1}. {obj.firstName} {obj.lastName}
                    </td>
                    <td style={{ minWidth: "15%" }} className="col">
                      {obj.username}
                    </td>
                    <td style={{ minWidth: "5%", color: obj.ball>0 ? "green" : "red" }} className="col">
                      {obj.ball}
                    </td>
                    <td style={{ minWidth: "25%", color: obj.ball>0 ? "green" : "red"  }} className="col">
                      {obj.ballStatus}
                    </td>
                    <td style={{ minWidth: "15%" }} className="col">
                      {obj.groupName}
                    </td>
                    <td style={{ minWidth: "15%" }} className="col">
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
