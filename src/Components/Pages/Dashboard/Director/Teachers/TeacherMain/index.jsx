import { Button, Drawer, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../../../Layout";
import { ModalContent, ModalHeader, TeachersWrapper } from "./Teachers.style";
import CloseSvg from "../../../../../Common/Svgs/CloseSvg";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import MinLoader from "../../../../../Common/MinLoader";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import Pagination from "rc-pagination";
import DirectorProvider from "../../../../../../Data/DirectorProvider";
import Select from "react-select";

const TeachersMain = ({ RefObj, setIsOpen }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [forRender, setForRender] = useState(null);
  const [editing, setEditing] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);

  const [lavozim, setLavozim] = useState("")

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
    DirectorProvider.getAllEmployees(currentPage, 10)
      .then((res) => {
        console.log(res.data.data);
        setTeachers(res.data.data);
        setTotalElements(res.data.recordsTotal);
        console.log(teachers.filter((role)=>{return role !=="ROLE_DIRECTOR"}));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [forRender, currentPage]);

  const onSubmitTeacher = async (values) => {
    const body = {};
    body.firstName = values.firstName;
    body.lastName = values.lastName;
    body.username = values.username;
    body.password = values.password;

    console.log("body", body);
    setLoading2(true);
    if (editing) {
      body.id = editing.id;
      try {
        const { data } = await DirectorProvider.updateTeacher(body);
        setForRender(Math.random());
        reset();
        toast.success("Muvaffaqiyatli o'zgartirildi");
        setIsOpenModal(false);
      } catch (err) {
        console.log(err);
      }
      setLoading2(false);
    } else {
      submitting(body)
    }
  };

  const submitting =(body)=>{
    if(lavozim==="teacher"){
      DirectorProvider.createTeacher(body)
      .then((res) => {
        reset();
        setForRender(Math.random());
        toast.success("Qo'shildi");
        onCloseModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading2(false);
      });
    }else if(lavozim==="admin"){
      DirectorProvider.createAdmin(body)
      .then((res) => {
        reset();
        setForRender(Math.random());
        toast.success("Qo'shildi");
        onCloseModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading2(false);
      });
    } else if(lavozim==="education"){
      DirectorProvider.createEducation(body)
      .then((res) => {
        reset();
        setForRender(Math.random());
        toast.success("Qo'shildi");
        onCloseModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading2(false);
      });
    } else if(lavozim==="eventSunday"){
      DirectorProvider.createEventSunday(body)
      .then((res) => {
        reset();
        setForRender(Math.random());
        toast.success("Qo'shildi");
        onCloseModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading2(false);
      });
    } else if(lavozim==="addition"){
      DirectorProvider.createAddition(body)
      .then((res) => {
        reset();
        setForRender(Math.random());
        toast.success("Qo'shildi");
        onCloseModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading2(false);
      });
    }
  }

  const handleDeleteTeacher = (obj) => {
    RefObj.current.textContent = `Rostdan ham o'chirishni xoxlaysizmi?`;
    setIsOpen(true);
    new Promise((res, rej) => {
      RefObj.current.resolve = res;
      RefObj.current.reject = rej;
    })
      .then(async () => {
        await DirectorProvider.deleteTeacher(obj.id);
        setTeachers((p) =>
          p.filter((teach) => {
            return teach.id !== obj.id;
          })
        );
        toast.success("O'chirildi!")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditTeacher = (obj) => {
    setIsOpenModal(true);
    setEditing(obj);
    setValue("firstName", obj.firstName);
    setValue("lastName", obj.lastName);
  };



  const lavozimOption = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "O'qituvchi",
      value: "teacher",
    },
    {
      label: "O'quv bo'limi",
      value: "education",
    },
    {
      label: "Event Sunday xodimi",
      value: "eventSunday",
    },
    {
      label: "Qo'shimcha dars beruvchi xodim",
      value: "addition",
    },
  ];

  return (
    <DashboardLayout>
      <TeachersWrapper>
        <div className="top">
          <h3>Xodimlar</h3>
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
            Xodim qo`shish
          </Button>
        </div>

        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th style={{ width: "30%" }} className="col">
                Familyasi
              </th>
              <th style={{ width: "30%" }} className="col">
                Ismi
              </th>
              <th style={{ width: "30%" }} className="col">
                Lavozimi
              </th>
              <th style={{ width: "10%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              teachers ? (
                teachers.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ width: "30%" }} className="col">
                    {(currentPage-1)*10+index+1}. {obj.lastName}
                    </td>
                    <td style={{ width: "30%" }} className="col">
                      {obj.firstName}
                    </td>
                    <td style={{ width: "30%" }} className="col">
                      {obj.role}
                    </td>
                    <td style={{ width: "10%" }} className="col">
                      <div className="btns">
                        <IconButton
                          style={{ background: "rgb(114, 225, 40, 0.12)" }}
                          onClick={() => handleEditTeacher(obj)}
                        >
                          <EditSvg />
                        </IconButton>
                        <IconButton
                          style={{ background: "rgb(253, 181, 40, 0.12)" }}
                          onClick={() => handleDeleteTeacher(obj)}
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
                    O`qituvchilar mavjud emas!
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
      </TeachersWrapper>

      {/* =====drawer ========== */}

      <Drawer
        anchor={"right"}
        open={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
      >
        <ModalHeader className="modal-header">
          <h2 className="title">Xodim qo`shish</h2>
          <button className="closeSvg" onClick={onCloseModal}>
            <CloseSvg />
          </button>
        </ModalHeader>
        <ModalContent>
          <form
            className="p-3"
            style={{ width: 500 }}
            onSubmit={handleSubmit(onSubmitTeacher)}
          >
            <div className="label">
              <label>Xodim ismi</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Ismi"}
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="label">
              <label>Xodim familyasi</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Familyasi"}
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="label">
              <label>Lavozimi</label>
              <Controller
                control={control}
                name="studentId"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    className="select"
                    value={value}
                    placeholder="Lavozimini tanlang"
                    options={lavozimOption}
                    onBlur={onBlur}
                    onChange={(v) => {
                      onChange(v);
                      setLavozim(v.value)
                      console.log(v);
                    }}
                    ref={ref}
                  />
                )}
              />
            </div>
            <div className="label">
              <label>Username</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Username"}
                {...register("username", { required: true })}
              />
            </div>
            <div className="label">
              <label>Parol</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Parol"}
                {...register("password", { required: true })}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ display: "flex" }}
            >
              Qo`shish {loading2 && <ButtonLoader />}
            </button>
          </form>
        </ModalContent>
      </Drawer>
    </DashboardLayout>
  );
};

export default TeachersMain;
