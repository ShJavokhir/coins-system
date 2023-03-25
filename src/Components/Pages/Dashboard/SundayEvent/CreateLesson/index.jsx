import { Radio, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CreateLessonWrapper } from "./CreateLesson.style";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import MinLoader from "../../../../Common/MinLoader";
import ButtonLoader from "../../../../Common/ButtonLoader";
import { Button, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import SundayEventProvider from "../../../../../Data/SundayEventProvider";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import DeleteSvg from "../../../../Common/Svgs/DeleteSvg";

const RowItem = ({ lessonId, obj, index }) => {
  const firstRender = useRef(true);
  const [visit, setVisit] = useState(null);
  const [homeWork, setHomeWork] = useState(-1);

  const handleBtn = () => {
    const body = {};
    body.additionLessonId = lessonId;
    body.studentId = obj.id;
    body.visitStatus = visit;

    SundayEventProvider.checkLesson(body)
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
    </tr>
  );
};

const CreateLesson = () => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [isLesson, setIsLesson] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [lessonId, setLessonId] = useState(null);
  const [course, setCourse] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [stundetId, setStudentId] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [forRender, setForRender] = useState(null);
  const [examData, setExamData] = useState([]);

  const createLesson = () => {
    setLoader(true);
    SundayEventProvider.createLesson(courseId)
      .then((res) => {
        console.log(res);
        setLessonId(res.data.id);
        setIsLesson(true);
        setLoading(true)
        console.log(fetchedData);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Xatolik ro'y berdi!");
      })
      .finally(() => {
        setLoader(false);
        setLoading(false)
      });
  };

  useEffect(() => {
    SundayEventProvider.getAllStudents(1, 100, courseId)
      .then((res) => {
        console.log(res.data);
        setFetchedData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLesson]);

  useEffect(() => {
    SundayEventProvider.getAllCourse()
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const courseOption = [
    ...course.map((i) => ({
      label: i.name,
      value: i.id,
    })),
  ];

  const studentOption = [
    ...fetchedData.map((i) => ({
      label: i.firstName +" "+ i.lastName,
      value: i.id,
    })),
  ];
  useEffect(() => {
    setLoading2(true);
    SundayEventProvider.getLessonInfo(1, 1000, lessonId)
      .then((res) => {
        setExamData(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading2(false);
      });
  }, [forRender]);

  const handleDeleteStudent = async (obj) => {
    try {
      const { data } = await SundayEventProvider.deleteStudentGroup(lessonId, obj.studentId);
      setExamData((p) =>
      p.filter((teach) => {
        return teach.id !== obj.studentId;
      })
      );
      setForRender(Math.random());
      toast.success("O'chirildi");
    } catch (err) {
      console.log(err);
    }
  };

  const handleVisit=()=>{
    const body = {};
    body.independentLessonId = lessonId;
    body.studentId = stundetId;
    body.visitStatus = 1;
    setLoading2(true);
    SundayEventProvider.checkLesson(body)
      .then((res) => {
        setForRender(Math.random());
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading2(false);
      });
  }

  return (
    <CreateLessonWrapper>
      <h3>O`quvchilarga Yakshanba kungi dars yaratish</h3>
      <span>Eslatma: Har bir kelgan o`quvchi uchun 30 ball beriladi</span>
      <div className="wrap">
        <div className="left">
          <div className="label">
            <label>Kursni tanlang</label>
            <Controller
              control={control}
              name="courseId"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select"
                  value={value}
                  placeholder="Kursni tanlang"
                  options={courseOption}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setCourseId(v.value);
                    console.log(v.value);
                  }}
                  ref={ref}
                />
              )}
            />
          </div>

          {!isLesson ? (
            <Button
              className="col-6 addBtn"
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
            <div className="label">
            <label>O`quvchini tanlang</label>
            <Controller
              control={control}
              name="studentId"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select"
                  value={value}
                  placeholder="O'quvchini tanlang"
                  options={studentOption}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    setStudentId(v.value);
                    console.log(v.value);
                  }}
                  ref={ref}
                />
                
              )}
            />
            <Button
              className="col-6 addBtn"
              variant="contained"
              onClick={handleVisit}
              disabled={loader}
              style={{
                fontFamily: "Azo sans",
                color: "#fff",
                background: "#006786",
                marginTop:"20px"
              }}
            >
              Keldi {loader && <ButtonLoader />}
            </Button>
          </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="right">
          <p>Qatnashgan talabalar</p>
          <table className="table table-borderless table-hover">
            <thead>
              <tr>
                <th style={{ minWidth: "40%" }} className="col">
                  O`quvchi
                </th>
                <th style={{ minWidth: "30%" }} className="col">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading2 ? (
                examData.length ? (
                  examData.map((obj, index) => (
                    <tr key={index}>
                      <td style={{ minWidth: "40%" }} className="col">
                        {index + 1}. {obj.firstName} {obj.lastName}
                      </td>
                      <td style={{ minWidth: "30%" }} className="col">
                        <IconButton
                          style={{ background: "rgb(253, 181, 40, 0.12)" }}
                          onClick={() => handleDeleteStudent(obj)}
                        >
                          <DeleteSvg />
                        </IconButton>
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
        </div>
      </div>
    </CreateLessonWrapper>
  );
};

export default CreateLesson;
