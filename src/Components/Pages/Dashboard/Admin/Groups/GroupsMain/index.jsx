import { Button, Drawer, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import CloseSvg from "../../../../../Common/Svgs/CloseSvg";
import DashboardLayout from "../../../../../Layout";
import { GroupsWrapper, ModalContent, ModalHeader } from "./Groups.style";
import { Controller, useForm } from "react-hook-form";
import AdminProvider from "../../../../../../Data/AdminProvider";
import { toast } from "react-toastify";
import Select from "react-select";
import Pagination from "rc-pagination";
import MyLink from "../../../../../Common/MyLink";

const GroupsMain = ({ RefObj, setIsOpen }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [forRender, setForRender] = useState(null);
  const [editing, setEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };
  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    setLoading(true);
    AdminProvider.getAllGroup(currentPage, 10)
      .then((res) => {
        console.log("guruh", res.data.data);
        setGroups(res.data.data);
        setTotalElements(res.data.recordsTotal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [forRender, currentPage]);

  useEffect(() => {
    AdminProvider.getAllCourse()
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    AdminProvider.getAllTeacher(1, 200)
      .then((res) => {
        console.log(res.data);
        setTeachers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmitGroup = async (values) => {
    const body = {};
    body.name = values.name;
    body.courseId = values.courseId?.value;
    body.teacherId = values.teacherId?.value;
    console.log("body", body);
    if (editing) {
      body.id = editing.id;
      try {
        const { data } = await AdminProvider.updateGroup(editing.id, body);
        setForRender(Math.random());
        toast.success("Muvaffaqiyatli o'zgartirildi");
        isOpenModal(false);
        reset();
      } catch (err) {
        console.log(err);
      }
    } else {
      AdminProvider.createGroup(body).then(
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
    }
  };

  const handleDeleteGroup = (obj) => {
    RefObj.current.textContent = `Rostdan ham o'chirishni xoxlaysizmi?`;
    setIsOpen(true);
    new Promise((res, rej) => {
      RefObj.current.resolve = res;
      RefObj.current.reject = rej;
    })
      .then(async () => {
        await AdminProvider.deleteGroup(obj.id);
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

  const handleEditGroup = (obj) => {
    setIsOpenModal(true);
    setEditing(obj);
    setValue("name", obj.name);
    setValue("courseId", obj.courseName);
    setValue("teacherFirstName", obj.teacherFirstName);
  };

  const courseOptions = [
    ...courses.map((i) => ({
      label: i.name,
      value: i.id,
    })),
  ];
  const teacherOptions = [
    ...teachers.map((i) => ({
      label: i.firstName +" "+ i.lastName,
      value: i.id,
    })),
  ];

  return (
    <DashboardLayout>
      <GroupsWrapper>
        <div className="top">
          <h3>Guruhlar</h3>
          <Button
            className="col-3"
            variant="contained"
            onClick={() => openModal()}
            style={{
              fontFamily: "Azo sans",
              color: "#fff",
              background: "#006786",
            }}
          >
            Guruh qo`shish
          </Button>
        </div>

        <table className="table table-borderless table-hover">
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
              <th style={{ minWidth: "16%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              groups.length ? (
                groups.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ minWidth: "32%" }} className="col">
                      <MyLink to={`/dashboard/groups/` + obj.id}>
                        {(currentPage - 1) * 10 + index + 1}. {obj.name}
                      </MyLink>
                    </td>
                    <td style={{ minWidth: "26%" }} className="col">
                      {obj.courseName}
                    </td>
                    <td style={{ minWidth: "26%" }} className="col">
                      {obj.teacherFirstName} {obj.teacherLastName}
                    </td>
                    <td style={{ minWidth: "16%" }} className="col">
                      <div className="btns">
                        <IconButton
                          style={{ background: "rgb(114, 225, 40, 0.12)" }}
                          onClick={() => handleEditGroup(obj)}
                        >
                          <EditSvg />
                        </IconButton>
                        <IconButton
                          style={{ background: "rgb(253, 181, 40, 0.12)" }}
                          onClick={() => handleDeleteGroup(obj)}
                        >
                          <DeleteSvg />
                        </IconButton>
                      </div>
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

        <Pagination
          onChange={onChange}
          current={currentPage}
          total={totalElements}
          pageSize={10}
        />
      </GroupsWrapper>

      {/* =====drawer ========== */}

      <Drawer
        anchor={"right"}
        open={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
      >
        <ModalHeader className="modal-header">
          <h2 className="title">Guruh qo`shish</h2>
          <button className="closeSvg" onClick={onCloseModal}>
            <CloseSvg />
          </button>
        </ModalHeader>
        <ModalContent>
          <form
            className="p-3"
            style={{ width: 500 }}
            onSubmit={handleSubmit(onSubmitGroup)}
          >
            <div className="label">
              <label>Guruh nomi</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Nomi"}
                {...register("name", { required: true })}
              />
            </div>
            <div className="label">
              <label>Kursni tanlang</label>
              <Controller
                className="select"
                control={control}
                name="courseId"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <Select
                    value={value}
                    placeholder="Kursni tanlang"
                    options={courseOptions}
                    onBlur={onBlur}
                    onChange={(v) => {
                      console.log(v);
                      onChange(v);
                    }}
                    ref={ref}
                  />
                )}
              />
            </div>
            <div className="label">
              <label>O`qituvchi tanlang</label>
              <Controller
                control={control}
                name="teacherId"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <Select
                    className="select"
                    value={value}
                    placeholder="O'qituvchini tanlang"
                    options={teacherOptions}
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
    </DashboardLayout>
  );
};

export default GroupsMain;
