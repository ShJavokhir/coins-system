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
import { useRouter } from "next/router";

const CreateLesson = () => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [isLesson, setIsLesson] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [lessonId, setLessonId] = useState(null);
  const [stundetId, setStudentId] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [forRender, setForRender] = useState(null);
  const [forRender2, setForRender2] = useState(null);
  const [examData, setExamData] = useState([]);
const router = useRouter()
  const createLesson = () => {
    setLoader(true);
    SundayEventProvider.createLesson()
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
    SundayEventProvider.getAllStudent(1, 1000, null)
      .then((res) => {
        console.log(res.data);
        setFetchedData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLesson, forRender2]);


  const studentOption = [
    ...fetchedData.map((i) => ({
      label: i.firstName +" "+ i.lastName+" ("+i.username+")",
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

  const stopExam =()=>{
    router.replace("/dashboard/sundayLessons");
  }


  return (
    <CreateLessonWrapper>
      <h3>O`quvchilarga Yakshanba kungi dars yaratish</h3>
      <span>Eslatma: Har bir kelgan o`quvchi uchun 30 ball beriladi</span>
      <div className="wrap">
        <div className="left">
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
              Sunday event yaratish {loader && <ButtonLoader />}
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
              className="col-12 addBtn"
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
            <Button
                className="col-12 addBtn"
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
