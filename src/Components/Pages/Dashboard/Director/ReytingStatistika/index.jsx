import React, { useEffect, useState } from "react";
import DirectorProvider from "../../../../../Data/DirectorProvider";
import CourseSvg from "../../../../Common/Svgs/CourseSvg";
import GroupSvg from "../../../../Common/Svgs/GroupSvg";
import TeacherSvg from "../../../../Common/Svgs/TeacherSvg";
import UserSvg from "../../../../Common/Svgs/UserSvg";
import DashboardLayout from "../../../../Layout";
import Charts from "./Charts";
import Charts2 from "./Charts2";
import { ReytingDirectorWrapper } from "./ReytingDirector.style";

const ReytingDirector = () => {
  const [dataCourse1, setDataCourse1] = useState([]);
  const [dataCourse2, setDataCourse2] = useState([]);
  const [dataGroup1, setDataGroup1] = useState([]);
  const [dataGroup2, setDataGroup2] = useState([]);
  const [dataTeacher1, setDataTeacher1] = useState([]);
  const [dataTeacher2, setDataTeacher2] = useState([]);
  const [dataStudent1, setDataStudent1] = useState([]);
  const [dataStudent2, setDataStudent2] = useState([]);
  useEffect(() => {
    DirectorProvider.getAllNumber()
      .then((res) => {
        console.log(res.data.data);
        setDataCourse1(res.data.data[0].name);
        setDataCourse2(res.data.data[0].amount);
        setDataGroup1(res.data.data[3].name);
        setDataGroup2(res.data.data[3].amount);
        setDataStudent1(res.data.data[1].name);
        setDataStudent2(res.data.data[1].amount);
        setDataTeacher1(res.data.data[2].name);
        setDataTeacher2(res.data.data[2].amount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DashboardLayout>
      <ReytingDirectorWrapper>
      <div className="cards">
          <div className="kart">
            <div className="left">
              <CourseSvg />
            </div>
            <div className="right">
              {dataCourse1} <span>{dataCourse2}</span>
            </div>
          </div>
          <div className="kart">
            <div className="left">
              <GroupSvg />
            </div>
            <div className="right">
              {dataGroup1} 
              <span>{dataGroup2}</span>
            </div>
          </div>
          <div className="kart">
            <div className="left">
              <UserSvg />
            </div>
            <div className="right">
              {dataStudent1} 
              <span>{dataStudent2}</span>
            </div>
          </div>
          <div className="kart">
            <div className="left">
              <TeacherSvg />
            </div>
            <div className="right">
              {dataTeacher1} 
              <span>{dataTeacher2}</span>
            </div>
          </div>
        </div>
      </ReytingDirectorWrapper>
      <Charts/>
      <Charts2/>
    </DashboardLayout>
  );
};

export default ReytingDirector;
