import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import EducationProvider from "../../../../../Data/EducationProvider";
import MinLoader from "../../../../Common/MinLoader";
import ButtonLoader from "../../../../Common/ButtonLoader";
import DashboardLayout from "../../../../Layout";
import { ExamManagementWrap } from "./ExamManagement.style";
import { toast } from "react-toastify";

const ExamManagement = () => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [forRender, setForRender] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoading(true);
    EducationProvider.getAllGroups(1, 100)
      .then((res) => {
        console.log(res.data.data);
        setGroups(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [ loader]);

  const createExamEnable = (obj) => {
    setLoader(true);
    EducationProvider.createExamEnable(obj.id)
      .then((res) => {
        console.log(res);
        toast.success("Imtihonga ruxsat berildi");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Xatolik ro'y berdi!");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <DashboardLayout>
      <ExamManagementWrap>
        <div className="top">
          <h3>Haftalik imtihonlarni boshqaruv paneli</h3>
        </div>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "25%" }} className="col">
                Guruh nomi
              </th>
              <th style={{ minWidth: "25%" }} className="col">
                Kurs nomi
              </th>
              <th style={{ minWidth: "25%" }} className="col">
                O`qituvchi
              </th>
              <th style={{ minWidth: "25%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              groups.length ? (
                groups.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ minWidth: "25%" }} className="col">
                      {index + 1}. {obj.name}
                    </td>
                    <td style={{ minWidth: "25%" }} className="col">
                      {obj.courseName}
                    </td>
                    <td style={{ minWidth: "25%" }} className="col">
                      {obj.teacherFirstName} {obj.teacherLastName}
                    </td>
                    <td style={{ minWidth: "25%" }} className="col">
                      {!obj.weekExamStatus ? (
                        <Button
                          className="col-6 addBtn"
                          variant="contained"
                          onClick={()=>createExamEnable(obj)}
                          style={{
                            fontFamily: "Azo sans",
                            color: "#fff",
                            background: "#006786",
                          }}
                        >
                          Ruxsat berish 
                        </Button>
                      ) : (
                        <Button
                          className="col-6 addBtn"
                          variant="contained"
                          disabled={!loader}
                          style={{
                            fontFamily: "Azo sans",
                            color: "#fff",
                            background: "green",
                          }}
                        >
                          Ruxsat berildi
                        </Button>
                        // <span>Ruxsat berildi</span>
                      )}
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
                    Guruhlar mavjud emas!
                  </h3>
                </div>
              )
            ) : (
              <MinLoader />
            )}
          </tbody>
        </table>
      </ExamManagementWrap>
    </DashboardLayout>
  );
};

export default ExamManagement;
