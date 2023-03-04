import { Button, Drawer, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AdminProvider from "../../../../../../Data/AdminProvider";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import MinLoader from "../../../../../Common/MinLoader";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import CloseSvg from "../../../../../Common/Svgs/CloseSvg";
import {
  ModalContent,
  ModalHeader,
  StudentsMainWrapper,
} from "./StudentsMain.style";
import Pagination from "rc-pagination";


const StudentsMain = ({ RefObj, setIsOpen }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [student, setStudent] = useState([]);
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
    reset()
  };
  const openModal2 = () => {
    setIsOpenModal2(true);
  };
  const onCloseModal2 = () => {
    setIsOpenModal2(false);
    reset()
  };

  useEffect(() => {
    setLoading(true);
    AdminProvider.getAllStudent(currentPage, 10)
      .then((res) => {
        console.log(res.data.data);
        setStudent(res.data.data);
        setTotalElements(res.data.recordsTotal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [forRender, currentPage]);

  const onSubmitStudent = async (values) => {
    const body = {};
    body.firstName = values.firstName;
    body.lastName = values.lastName;
    body.password = values.password;

    console.log("body", body);
    setLoading2(true);
    if (editing) {
      body.id = editing.id;
      try {
        const { data } = await AdminProvider.updateStudent(body);
        setForRender(Math.random());
        reset();
        toast.success("Muvaffaqiyatli o'zgartirildi");
        setIsOpenModal2(false);
      } catch (err) {
        console.log(err);
      }
      setLoading2(false);
    }
  };
  const onSubmitStudentAdd = async (values) => {
    const body = {};
    body.firstName = values.firstName;
    body.lastName = values.lastName;
    body.username = values.username;
    body.password = values.password;
    setLoading2(true)
      AdminProvider.createStudent(body)
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
  };

  const handleDeleteStudent = (obj) => {
    RefObj.current.textContent = `Rostdan ham o'chirishni xoxlaysizmi?`;
    setIsOpen(true);
    new Promise((res, rej) => {
      RefObj.current.resolve = res;
      RefObj.current.reject = rej;
    })
      .then(async () => {
        await AdminProvider.deleteStudent(obj.id);
        setStudent((p) =>
          p.filter((teach) => {
            return teach.id !== obj.id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditStudent = (obj) => {
    setIsOpenModal2(true);
    setEditing(obj);
    setValue("firstName", obj.firstName);
    setValue("lastName", obj.lastName);
    setValue("username", obj.username);
  };

  return (
    <>
      <StudentsMainWrapper>
        <div className="top">
          <h3>O`quvchilar</h3>
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
            Qo`shish
          </Button>
        </div>

        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th style={{ width: "40%" }} className="col">
                Familyasi
              </th>
              <th style={{ width: "30%" }} className="col">
                Ismi
              </th>
              <th style={{ width: "30%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              student.length ? (
                student.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ width: "40%" }} className="col">
                    {(currentPage-1)*10+index+1}. {obj.lastName}
                    </td>
                    <td style={{ width: "30%" }} className="col">
                      {obj.firstName}
                    </td>
                    <td style={{ width: "30%" }} className="col">
                      <div className="btns">
                        <IconButton
                          style={{ background: "rgb(114, 225, 40, 0.12)" }}
                          onClick={() => handleEditStudent(obj)}
                        >
                          <EditSvg />
                        </IconButton>
                        <IconButton
                          style={{ background: "rgb(253, 181, 40, 0.12)" }}
                          onClick={() => handleDeleteStudent(obj)}
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
                    O`quvchilar mavjud emas!
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
      </StudentsMainWrapper>
      <Drawer
        anchor={"right"}
        open={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
      >
        <ModalHeader className="modal-header">
          <h2 className="title">O`quvchi qo`shish</h2>
          <button className="closeSvg" onClick={onCloseModal}>
            <CloseSvg />
          </button>
        </ModalHeader>
        <ModalContent>
          <form
            className="p-3"
            style={{ width: 500 }}
            onSubmit={handleSubmit(onSubmitStudentAdd)}
          >
            <div className="label">
              <label>O`quvchi ismi</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Ismi"}
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="label">
              <label>O`quvchi familyasi</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Familyasi"}
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="label">
              <label>Username</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Username"}
                {...register("username", { required: false })}
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
      <Drawer
        anchor={"right"}
        open={isOpenModal2}
        onClose={() => {
          onCloseModal2();
        }}
      >
        <ModalHeader className="modal-header">
          <h2 className="title">O`quvchi yangilash</h2>
          <button className="closeSvg" onClick={onCloseModal2}>
            <CloseSvg />
          </button>
        </ModalHeader>
        <ModalContent>
          <form
            className="p-3"
            style={{ width: 500 }}
            onSubmit={handleSubmit(onSubmitStudent)}
          >
            <div className="label">
              <label>O`quvchi ismi</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Ismi"}
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="label">
              <label>O`quvchi familyasi</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Familyasi"}
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="label">
              <label>Yangi parol</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Yangi parol"}
                {...register("password", { required: true })}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ display: "flex" }}
            >
              Yangilash {loading2 && <ButtonLoader />}
            </button>
          </form>
        </ModalContent>
      </Drawer>
    </>
  );
};

export default StudentsMain;
