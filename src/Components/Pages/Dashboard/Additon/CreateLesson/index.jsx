import { Checkbox, Input, Radio, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { CreateLessonWrapper } from "./CreateLesson.style";
import MinLoader from "../../../../Common/MinLoader";
import ButtonLoader from "../../../../Common/ButtonLoader";
import DeleteSvg from "../../../../Common/Svgs/DeleteSvg";
import { Button, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import AdditionProvider from "../../../../../Data/AdditionProvider";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useRouter } from "next/router";

const RowItem = ({ lessonId, obj, index, setLoading2, setForRender }) => {
  const [visit, setVisit] = useState(null);

  const onChange = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setVisit(1);
    }
    const body = {};
    body.additionLessonId = lessonId;
    body.studentId = obj.id;
    body.visitStatus = 1;
    setLoading2(true);
    AdditionProvider.checkLesson(body)
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
  };

  return (
    <tr>
      <td style={{ minWidth: "30%" }} className="col">
        {index + 1}. {obj.lastName} {obj.firstName}
      </td>
      <td style={{ minWidth: "25%" }} className="col">
        {/* <div className={`out ${active}`}>
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
        </div> */}
        <Checkbox onChange={onChange}></Checkbox>
      </td>
    </tr>
  );
};

const CreateLesson = () => {
  const { control } = useForm();
  const [isLesson, setIsLesson] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lessonId, setLessonId] = useState(null);
  const [course, setCourse] = useState([]);
  const [stundetId, setStudentId] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);
  const [examData, setExamData] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [forRender, setForRender] = useState(null);

  const router = useRouter();


  const createLesson = () => {
    setLoader(true);
    AdditionProvider.createLesson(courseId)
      .then((res) => {
        console.log(res);
        setLessonId(res.data.id);
        setIsLesson(true);
        setLoading(true);
        console.log(fetchedData);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Xatolik ro'y berdi!");
      })
      .finally(() => {
        setLoader(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    AdditionProvider.getAllStudents(1, 3000, courseId)
      .then((res) => {
        console.log(res.data);
        setFetchedData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLesson]);

  useEffect(() => {
    AdditionProvider.getAllCourse()
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
      label: i.firstName + " " + i.lastName +" ("+i.username+")",
      value: i.id,
    })),
  ];
  const studentOption2 = [
    ...fetchedData.filter((item) => {
      return item.isActive == true
    }),
  ];
  // p.filter((teach) => {
  //   return teach.id !== obj.studentId;
  // })

  useEffect(() => {
    setLoading2(true);
    AdditionProvider.getLessonInfo(1, 1000, lessonId)
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
      const { data } = await AdditionProvider.deleteStudentGroup(
        lessonId,
        obj.studentId
      );
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

  const handleVisit = () => {
    const body = {};
    body.additionLessonId = lessonId;
    body.studentId = stundetId;
    body.visitStatus = 1;
    setLoading2(true);
    AdditionProvider.checkLesson(body)
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
  };

  const stopExam =()=>{
    router.replace("/dashboard/additionLessons");
  }

  return (
    <CreateLessonWrapper>
      <h3>O`quvchilarga qo`shimcha dars yaratish</h3>
      <span>Eslatma: Har bir kelgan o`quvchi uchun 20 ball beriladi</span>
      <div className="wrap">
        <div className="left">
          {!isLesson ? (
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
          ) : (
            <></>
          )}

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
                  marginTop: "20px",
                  marginRight:10
                }}
              >
                Keldi {loader && <ButtonLoader />}
              </Button>
              <Button
                className="col-6 addBtn"
                variant="contained"
                onClick={stopExam}
                disabled={loader}
                style={{
                  fontFamily: "Azo sans",
                  color: "#fff",
                  background: "#006786",
                  marginTop: "20px",
                }}
              >
                Tugatish {loader && <ButtonLoader />}
              </Button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="right">
          <p>Qatnashgan talabalar</p>
          <table className="table table-striped table-hover">
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
