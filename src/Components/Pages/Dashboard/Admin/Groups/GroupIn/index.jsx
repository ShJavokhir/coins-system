import { Button, Drawer, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import AdminProvider from "../../../../../../Data/AdminProvider";
import DashboardLayout from "../../../../../Layout";
import { GroupInWrapper, ModalContent, ModalHeader } from "./GroupIn.style";
import CloseSvg from "../../../../../Common/Svgs/CloseSvg";
import { toast } from "react-toastify";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import { ModalContextProvider } from "../../../../../../Context/ModalContext";
import ConfirmModal from "../../../../../Common/ConfirmModal";

const GroupIn = ({ groupId }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();

  const RefObj = useRef({ resolve() {}, reject() {} });
  const [modalIsOpen, setIsOpen] = useState(false);

  const [fetchedData, setFetchedData] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupInfo, setGroupInfo] = useState({});
  const [courseInfo, setCourseInfo] = useState({});
  const [teacherInfo, setTeacherInfo] = useState({});
  const [students, setStudents] = useState([]);
  const [forRender, setForRender] = useState(null);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };
  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    AdminProvider.getOneGroup(groupId)
      .then((res) => {
        setFetchedData([...res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [forRender]);

  useEffect(() => {
    AdminProvider.getOneGroupInfo(groupId)
      .then((res) => {
        setGroupInfo(res.data);
        setCourseInfo(res.data.course);
        setTeacherInfo(res.data.teacher);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [forRender]);

  useEffect(() => {
    AdminProvider.getAllGroup(1, 20)
      .then((res) => {
        setGroups(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    AdminProvider.getAllStudent(1, 1000)
      .then((res) => {
        console.log(res.data);
        setStudents(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addStudent = async (values) => {
    await AdminProvider.addStudentGroup(groupId, values.studentId?.value).then(
      (res) => {
        console.log(res);
        reset();
        setForRender(Math.random());
        toast.success("Qo'shildi");
        onCloseModal();
      },
      (err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      }
    );
  };

  const studentsOption = [
    ...students.map((i) => ({
      label: i.firstName + " "+ i.lastName,
      value: i.id,
    })),
  ];

  const handleDeleteStudent = (obj) => {
    console.log(obj);
    RefObj.current.textContent = `Rostdan ham o'chirishni xoxlaysizmi?`;
    setIsOpen(true);
    new Promise((res, rej) => {
      RefObj.current.resolve = res;
      RefObj.current.reject = rej;
    })
      .then(async () => {
        await AdminProvider.deleteStudentGroup(groupId, obj.id);
        setGroups((p) =>
          p.filter((teach) => {
            return teach.id !== obj.id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <DashboardLayout>
      <GroupInWrapper>
        <h3>
          {groupInfo.name} • {courseInfo.name ?? ""} •{" "}
          {teacherInfo.firstName ?? ""}
        </h3>
        <div className="wrap">
          <div className="left">
            <div className="top">
              <div className="grName">
                <p>{groupInfo.name}</p>
              </div>
              <div className="courseName">
                <div>
                  <span>Kurs: </span>
                  <p>{courseInfo.name ?? ""}</p>
                </div>
                <div>
                  <span>O`qituvchi: </span>
                  <p>{teacherInfo.firstName ?? ""}</p>
                </div>
              </div>
              <Button
                className="col-12"
                variant="contained"
                onClick={() => openModal()}
                style={{
                  fontFamily: "Azo sans",
                  color: "#fff",
                  background: "#006786",
                }}
              >
                Talaba qo`shish
              </Button>
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
                    <IconButton
                      style={{ background: "rgb(253, 181, 40, 0.12)" }}
                      onClick={() => handleDeleteStudent(obj)}
                    >
                      <DeleteSvg />
                    </IconButton>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </GroupInWrapper>

      {/* =====drawer ========== */}

      <Drawer
        anchor={"right"}
        open={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
      >
        <ModalHeader className="modal-header">
          <h2 className="title">O&#39;quvchi qo`shish</h2>
          <button className="closeSvg" onClick={onCloseModal}>
            <CloseSvg />
          </button>
        </ModalHeader>
        <ModalContent>
          <form
            className="p-3"
            style={{ width: 500 }}
            onSubmit={handleSubmit(addStudent)}
          >
            <div className="label">
              <label>O`quvchi tanlang</label>
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
                      console.log(v);
                    }}
                    ref={ref}
                  />
                )}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Qo`shish
            </button>
          </form>
        </ModalContent>
      </Drawer>

      {/* =======modal========== */}
      <ModalContextProvider
        RefObj={RefObj}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      >
        <ConfirmModal>{RefObj.current.textContent}</ConfirmModal>
      </ModalContextProvider>
    </DashboardLayout>
  );
};

export default GroupIn;
