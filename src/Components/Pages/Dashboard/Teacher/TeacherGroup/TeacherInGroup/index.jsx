import { Button, Drawer, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../../../../Layout";
import {
  DavomatWrapper,
  ImtihonWrapper,
  TeacherInGroupWrapper,
} from "./TeacherInGroup.style";
import TeacherProvider from "../../../../../../Data/TeacherProvider";
import { Input, Radio, Switch, Tabs, Tooltip } from "antd";
import MinLoader from "../../../../../Common/MinLoader";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditSvg from "../../../../../Common/Svgs/EditSvg";

const RowItem = ({ lessonId, obj, index }) => {
  const firstRender = useRef(true);
  const [visit, setVisit] = useState(null);
  const [homeWork, setHomeWork] = useState(-1);

  const handleBtn = () => {
    const body = {};
    body.lessonId = lessonId;
    body.studentId = obj.id;
    body.visitStatus = visit;
    body.homeworkStatus = homeWork;

    TeacherProvider.detailLesson(body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    handleBtn();
  }, [visit, homeWork]);

  const changeRadio = (e) => {
    setHomeWork(parseInt(e.target.value));
  };

  // const changeSwitch = (e) => {
  //   setVisit(e);
  // };

  const [active, setActive] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleButtonSuccess = () => {
    setActive("success");
    setIsActive(true);
    setVisit(1);
  };

  const handleButtonCancel = () => {
    setActive("cancel");
    setIsActive(false);
    setVisit(0);
  };

  return (
    <tr>
      <td style={{ minWidth: "30%" }} className="col">
        {index + 1}. {obj.lastName} {obj.firstName}
      </td>
      <td style={{ minWidth: "25%" }} className="col">
        <div className={`out ${active}`}>
          <div className="in">
            <Tooltip placement="top" title="Bor" color="rgb(114, 225, 40)">
              <button onClick={handleButtonSuccess}>
                <CheckCircleOutlineIcon />
              </button>
            </Tooltip>
            <Tooltip placement="top" title="Yo'q" color="rgb(255, 77, 73)">
              <button onClick={handleButtonCancel}>
                <CancelOutlinedIcon />
              </button>
            </Tooltip>
          </div>
        </div>
      </td>
      <td style={{ minWidth: "45%" }} className="col">
        <div className="radio">
          <Radio.Group
            defaultValue="a"
            buttonStyle="solid"
            onChange={changeRadio}
            disabled={!isActive}
          >
            <Radio.Button value="0">Qilinmagan</Radio.Button>
            <Radio.Button value="1">To`liq emas</Radio.Button>
            <Radio.Button value="2">To`liq</Radio.Button>
          </Radio.Group>
        </div>
      </td>
      {/* <td style={{ minWidth: "15%" }} >
                      <button onClick={handleBtn}>Save</button>
                    </td> */}
    </tr>
  );
};
const RowItemExam = ({ examId, obj, index }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false)

  const handleBtn = (values) => {
    const body = {};
    body.twoWeekQuizId = examId;
    body.studentId = obj.id;
    body.examScore = parseInt(values.ball);
    setLoading(true);
    TeacherProvider.detailExam(body)
      .then((res) => {
        console.log(res);
        setSaved(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditSave=()=>{
    setSaved(false);
  }

  return (
    <tr>
      <td style={{ minWidth: "30%" }} className="col">
        {index + 1}. {obj.lastName} {obj.firstName}
      </td>
      <td style={{ minWidth: "25%" }} className="col">
        <form onSubmit={handleSubmit(handleBtn)} style={{ display: "flex" }}>
          <input
          disabled={saved}
            autoComplete="off"
            className="form-control"
            placeholder={"To'plagan ball"}
            {...register("ball", { required: true })}
          />
          <Button
            variant="contained"
            style={{
              fontFamily: "Azo sans",
              color: "#fff",
              background: "#006786",
              marginLeft: 10,
            }}
            disabled={saved}
            type="submit"
          >
            Save 
          </Button>
          <IconButton
            style={{ background: "rgb(253, 181, 40, 0.12)", marginLeft:20 }}
            onClick={handleEditSave}
          >
            <EditSvg />
          </IconButton>
        </form>
      </td>
      {/* <td style={{ minWidth: "25%" }} className="col">
        </td> */}
    </tr>
  );
};

const Davomat = ({ fetchedData, loading, groupId }) => {
  const [isLesson, setIsLesson] = useState(false);
  const [loader, setLoader] = useState(false);
  const [lessonId, setLessonId] = useState(null);

  const createLesson = () => {
    setLoader(true);
    TeacherProvider.createLesson(groupId)
      .then((res) => {
        console.log(res);
        setLessonId(res.data.id);
        setIsLesson(true);
        console.log(fetchedData);
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
    <DavomatWrapper>
      {!isLesson ? (
        <Button
          className="col-4 addBtn"
          variant="contained"
          onClick={createLesson}
          disabled={loader}
          style={{
            fontFamily: "Azo sans",
            color: "#fff",
            background: "#006786",
          }}
        >
          Dars qo`shish {loader && <ButtonLoader />}
        </Button>
      ) : (
        <></>
      )}

      {isLesson ? (
        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "30%" }} className="col">
                Talaba
              </th>
              <th style={{ minWidth: "25%" }} className="col">
                Davomat
              </th>
              <th style={{ minWidth: "45%" }} className="col">
                Uyga vazifa
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              fetchedData.length ? (
                fetchedData.map((obj, index) => (
                  <RowItem
                    key={index}
                    lessonId={lessonId}
                    obj={obj}
                    index={index}
                  />
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: 30,
                  }}
                >
                  <h3 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                    Talabalar mavjud emas!
                  </h3>
                </div>
              )
            ) : (
              <MinLoader />
            )}
          </tbody>
        </table>
      ) : (
        <div></div>
      )}
    </DavomatWrapper>
  );
};

const Imtihon = ({ fetchedData, loading, groupId }) => {
  const [isExam, setIsExam] = useState(false);
  const [loader, setLoader] = useState(false);
  const [examId, setExamId] = useState(null);

  const createExam = () => {
    setLoader(true);
    TeacherProvider.createExam(groupId)
      .then((res) => {
        console.log(res);
        setExamId(res.data.id);
        setIsExam(true);
        console.log(fetchedData);
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
    <ImtihonWrapper>
      {!isExam ? (
        <Button
          className="col-4 addBtn"
          variant="contained"
          onClick={createExam}
          disabled={loader}
          style={{
            fontFamily: "Azo sans",
            color: "#fff",
            background: "#006786",
          }}
        >
          Imtihon qo`shish {loader && <ButtonLoader />}
        </Button>
      ) : (
        <></>
      )}

      {isExam ? (
        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th style={{ minWidth: "30%" }} className="col">
                Talaba
              </th>
              <th style={{ minWidth: "25%" }} className="col">
                To`plagan bali
              </th>
              {/* <th style={{ minWidth: "25%" }} className="col">
                Amallar
              </th> */}
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              fetchedData.length ? (
                fetchedData.map((obj, index) => (
                  <RowItemExam
                    key={index}
                    examId={examId}
                    obj={obj}
                    index={index}
                  />
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: 30,
                  }}
                >
                  <h3 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                    Talabalar mavjud emas!
                  </h3>
                </div>
              )
            ) : (
              <MinLoader />
            )}
          </tbody>
        </table>
      ) : (
        <div></div>
      )}
    </ImtihonWrapper>
  );
};

const TeacherInGroup = ({ groupId }) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [courseInfo, setCourseInfo] = useState({});
  const [teacherInfo, setTeacherInfo] = useState({});
  const [groupInfo, setGroupInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const items = [
    {
      key: "1",
      label: `Davomat`,
      children: (
        <Davomat
          fetchedData={fetchedData}
          loading={loading}
          groupId={groupId}
        />
      ),
    },
    {
      key: "2",
      label: `Imtihon`,
      children: (
        <Imtihon
          fetchedData={fetchedData}
          loading={loading}
          groupId={groupId}
        />
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    TeacherProvider.getOneGroup(groupId)
      .then((res) => {
        setFetchedData([...res.data.data]);
        console.log(fetchedData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    TeacherProvider.getOneGroupInfo(groupId)
      .then((res) => {
        setGroupInfo(res.data);
        setCourseInfo(res.data.course);
        setTeacherInfo(res.data.teacher);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DashboardLayout>
      <TeacherInGroupWrapper>
        <div className="wrap">
          <div className="left">
            {!loading ? (
              <>
                <div className="top">
                  <div className="courseName">
                    <div>
                      <span>Guruh: </span>
                      <p>{groupInfo.name ?? ""}</p>
                    </div>
                    <div>
                      <span>Kurs: </span>
                      <p>{courseInfo.name ?? ""}</p>
                    </div>
                    <div>
                      <span>O`qituvchi: </span>
                      <p>
                        {teacherInfo.firstName} {teacherInfo.lastName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="students">
                  <ul>
                    {fetchedData.map((obj, index) => (
                      <div key={index} className="student">
                        <li>
                          {index + 1}.<span>•</span>
                          <p>{obj.firstName}</p>
                          <p>{obj.lastName}</p>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <MinLoader />
            )}
          </div>

          <div className="right">
            <Tabs defaultActiveKey="1" type="card" size="large" items={items} />
          </div>
        </div>
      </TeacherInGroupWrapper>
    </DashboardLayout>
  );
};

export default TeacherInGroup;
