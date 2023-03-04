import { Button, Drawer, IconButton } from "@mui/material";
import Pagination from "rc-pagination";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import MinLoader from "../../../../../Common/MinLoader";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import { DirectorMainWrapper, ModalContent, ModalHeader } from "./DirectorMain.style";
import CloseSvg from "../../../../../Common/Svgs/CloseSvg";
import DirectorProvider from "../../../../../../Data/DirectorProvider";
import SeoProvider from "../../../../../../Data/SeoProvider";
import { toast } from "react-toastify";


const DirectorMain = ({ RefObj, setIsOpen }) => {
    const { register, handleSubmit, control, reset, setValue } = useForm();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [director, setDirector] = useState([]);
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
    SeoProvider.getAllEmployees(currentPage, 10)
      .then((res) => {
        console.log(res.data.data);
        setDirector(res.data.data);
        setTotalElements(res.data.recordsTotal);
        console.log(data.recordsTotal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [forRender, currentPage]);

  const onSubmitDirector = async (values) => {
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
        SeoProvider.createDirector(body)
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
  };

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

  return (
    <>
      <DirectorMainWrapper>
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
            Direktor qo`shish
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
              director ? (
                director.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ width: "30%" }} className="col">
                      {(currentPage - 1) * 10 + index + 1}. {obj.lastName}
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
                  Direktorlar mavjud emas!
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
      </DirectorMainWrapper>

      {/* =====drawer ========== */}

      <Drawer
        anchor={"right"}
        open={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
      >
        <ModalHeader className="modal-header">
          <h2 className="title">Direktor qo`shish</h2>
          <button className="closeSvg" onClick={onCloseModal}>
            <CloseSvg />
          </button>
        </ModalHeader>
        <ModalContent>
          <form
            className="p-3"
            style={{ width: 500 }}
            onSubmit={handleSubmit(onSubmitDirector)}
          >
            <div className="label">
              <label>Direktor ismi</label>
              <input
                autoComplete="off"
                className="form-control"
                placeholder={"Ismi"}
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="label">
              <label>Direktor familyasi</label>
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
    </>
  );
};

export default DirectorMain;
