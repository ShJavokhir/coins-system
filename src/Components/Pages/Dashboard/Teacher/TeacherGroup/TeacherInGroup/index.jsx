import { Button, Drawer, IconButton } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  // NOTE obj dan pastdagi useStatelarga defaultvalueni moslab berish kerak string yoki numberligi farq qilib default ko'rsatmayapti
  const firstRender = useRef(true);
  const [visit, setVisit] = useState(null);
  const [homeWork, setHomeWork] = useState(obj.homeworkStatus ? `${obj.homeworkStatus}` : -1);
  const [active, setActive] = useState(obj.visitStatus === 1 ? "success" : "");
  const [isActive, setIsActive] = useState(false);

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

  useEffect(()=>{
    TeacherProvider.getOneLessonInfo(lessonId)
    .then(res=>{
      console.log(res.data.data);
    })
    .catch(err=>{
      console.log(err);
    })
  },[])

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
            value={`${homeWork}`}
          >
            <Radio.Button value="0">Qilinmagan</Radio.Button>
            <Radio.Button value="1">To`liq emas</Radio.Button>
            <Radio.Button value="2">To`liq</Radio.Button>
          </Radio.Group>
        </div>
      </td>

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
  const [timer, setTimer] = useState('initial');
  const [studentList, setStudentList] = useState([]);

  const createLesson = () => {
    setLoader(true);
    TeacherProvider.createLesson(groupId)
      .then((res) => {
        console.log(res);
        setLessonId(res.data.id);
        
        setGroupDataToLocalStorage(groupId, res.data.id, Date.now() + 7200000);
        setTimer(Date.now() + 7200000);

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

  const onTimeEnd = () => {
    // modal ko'rsatib pageni tozalab qayta ochish kerak (localStorageni ham tozlash shu yerda)
  }

  useEffect(() => {
    const groupData = getLessonByGroup(groupId);
    if(groupData) {
      const [id, startDate] = groupData;
      setLessonId(id);
      setIsLesson(true);
      setTimer(startDate);
      TeacherProvider.getOneLessonInfo(id).then((res) => {
        setStudentList(res.data?.data);
      }, console.warn);
    }
  }, []);

  useEffect(() => {
    if(!lessonId) {
      setStudentList(fetchedData);
    }
  }, [fetchedData]);

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
        <CustomTimer time={timer} onTimeEnd={onTimeEnd} />
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
              studentList.length ? (
                studentList.map((obj, index) => (
                  <RowItem
                    key={obj.id}
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

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({ ...timeLeft, minutes: timeLeft.minutes - 1, seconds: 59 });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({ ...timeLeft, hours: timeLeft.hours - 1, minutes: 59, seconds: 59 });
      }
      localStorage.setItem('seocond', timeLeft.seconds)
      localStorage.setItem('minute', timeLeft.minutes)
      localStorage.setItem('hour', timeLeft.hours)
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);


  return (
    <div style={{display:"flex"}}>
      <div style={{fontWeight:700, fontSize:20}}>{timeLeft.hours.toString().padStart(2, '0')}:</div>
      <div style={{fontWeight:700, fontSize:20}}>{timeLeft.minutes.toString().padStart(2, '0')}:</div>
      <div style={{fontWeight:700, fontSize:20}}>{timeLeft.seconds.toString().padStart(2, '0')}</div>
    </div>
  );
};

export default TeacherInGroup;

function CustomTimer ({ time = 0, onTimeEnd = () => {} })  {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useLayoutEffect(() => {
    if(time === 'initial') return;
    const getTime = () => {
      const _time = time - Date.now();
      if(_time < 0) {
        onTimeEnd(); // NOTE timer tugab qolsa popup chaqirib vaqt tugadi deb refresh bervorsa bo'ladi
      }
  
      setHours(Math.floor((_time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((_time / 1000 / 60) % 60));
      setSeconds(Math.floor((_time / 1000) % 60));
    };
    setInterval(getTime, 1000);
    return () => clearInterval(getTime);
  }, [time, onTimeEnd]);

  return (
    <div style={{display:"flex"}}>
      <div style={{fontWeight:700, fontSize:20}}>{hours.toString().padStart(2, '0')}:</div>
      <div style={{fontWeight:700, fontSize:20}}>{minutes.toString().padStart(2, '0')}:</div>
      <div style={{fontWeight:700, fontSize:20}}>{seconds.toString().padStart(2, '0')}</div>
    </div>
  );
};


function setGroupDataToLocalStorage (groupId, id, startDate) {
  const lessons = localStorage.getItem('lessons') ? JSON.parse(localStorage.getItem('lessons')) : null;
  if(lessons) {
    localStorage.setItem('lessons', JSON.stringify({ ...lessons, [groupId]: {id, startDate} }));
  } else {
    localStorage.setItem('lessons', JSON.stringify({ [groupId]: {id, startDate} }));
  };
}

function getLessonByGroup (groupId) {
  try {
    const lessons = localStorage.getItem('lessons') ? JSON.parse(localStorage.getItem('lessons')) : null;
    const group = lessons[groupId];
    const lessonId = group.id;
    const startDate = group.startDate;

    return [lessonId, startDate];
  } catch (err) {};

  return null;
}