import React, { useEffect, useState } from "react";
import EducationProvider from "../../../../../../Data/EducationProvider";
import MinLoader from "../../../../../Common/MinLoader";
import MyLink from "../../../../../Common/MyLink";
import DashboardLayout from "../../../../../Layout";
import { TeacherGroupMainWrapper } from "./TeacherGroupMainMain.style";

const LessonMain = ({ RefObj, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [forRender, setForRender] = useState(null);

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
  }, [forRender]);

  return (
    <DashboardLayout>
      <TeacherGroupMainWrapper>
        <div className="top">
          <h3>Guruhlar</h3>
        </div>

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "32%" }} className="col">
                Guruh nomi
              </th>
              <th style={{ minWidth: "26%" }} className="col">
                Kurs nomi
              </th>
              <th style={{ minWidth: "26%" }} className="col">
                O`qituvchi
              </th>
              
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              groups.length ? (
                groups.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ minWidth: "32%" }} className="col">
                      <MyLink to={`/dashboard/education/groups/group?id=${obj.id}`}>
                        {index + 1}. {obj.name}
                      </MyLink>
                    </td>
                    <td style={{ minWidth: "26%" }} className="col">
                      {obj.courseName}
                    </td>
                    <td style={{ minWidth: "26%" }} className="col">
                      {obj.teacherFirstName} {obj.teacherLastName}
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
      </TeacherGroupMainWrapper>


      
    </DashboardLayout>
  );
};

export default LessonMain;
