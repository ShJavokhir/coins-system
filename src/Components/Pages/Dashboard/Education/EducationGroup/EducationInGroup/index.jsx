import { Button, Drawer, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "../../../../../Layout";
import {
  DavomatWrapper,
  ImtihonWrapper,
  TeacherInGroupWrapper,
} from "./TeacherInGroup.style";
import MinLoader from "../../../../../Common/MinLoader";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import EducationProvider from "../../../../../../Data/EducationProvider";
import { useRouter } from "next/router";

const RowItemExam = ({ examId, obj, index }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false)

  const handleBtn = (values) => {
    const body = {};
    body.quizId = examId;
    body.studentId = obj.id;
    body.examScore = parseInt(values.ball);
    setLoading(true);
    EducationProvider.detailExam(body)
      .then((res) => {
        console.log(res);
        toast.success("Muvaffaqiyatli yuborildi")
        setSaved(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Xatolik")
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
          disabled={!obj.isActive || saved}
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

const Imtihon = ({ fetchedData, loading, groupId }) => {
  const [isExam, setIsExam] = useState(false);
  const [loader, setLoader] = useState(false);
  const [examId, setExamId] = useState(null);
  const router=useRouter()

  const createExam = () => {
    setLoader(true);
    EducationProvider.createExam(groupId)
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

  const stopExam =()=>{
    router.replace("/dashboard/education/exams");
  }

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
        <>
        <table className="table table-striped table-hover">
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
        <Button
                className="col-6 addBtn"
                variant="contained"
                onClick={stopExam}
                style={{
                  fontFamily: "Azo sans",
                  color: "#fff",
                  background: "#006786",
                  marginTop: "20px",
                }}
              >
                Tugatish 
              </Button>
        </>
      ) : (
        <div></div>
      )}
    </ImtihonWrapper>
  );
};

const EducationInGroup = ({ groupId }) => {
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
      setLoading(true);
      EducationProvider.getOneGroup(groupId)
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
  return (
    <DashboardLayout>
      <TeacherInGroupWrapper>
        <div className="wrap">
           <Imtihon groupId={groupId} fetchedData={fetchedData} loading={loading}  />
        </div>
      </TeacherInGroupWrapper>
    </DashboardLayout>
  );
};

export default EducationInGroup;
