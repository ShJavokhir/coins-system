import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonLoader from "../../../../Common/ButtonLoader";
import DashboardLayout from "../../../../Layout";
import {
  ModalContent,
  ModalHeader,
  StatistikaWrapper,
} from "./Statistika.style";
import CloseSvg from "../../../../Common/Svgs/CloseSvg";
import EducationProvider from "../../../../../Data/EducationProvider";
import { toast } from "react-toastify";

const EduStatistika = () => {
  const { register, handleSubmit, control, reset, setValue } = useForm();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const onSubmit = async (values) => {
    const body = {};
    body.firstName = values.firstName;
    body.lastName = values.lastName;
    body.username = values.username;
    body.password = values.password;

    EducationProvider.createEmployee(body)
      .then((res) => {
        reset();
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

  return (
    <DashboardLayout>
      <StatistikaWrapper>
        <div className="top">
          <h3>Qo`shimcha dars beruvchi xodim qo`shish</h3>
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
                onSubmit={handleSubmit(onSubmit)}
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
        </div>
      </StatistikaWrapper>  
    </DashboardLayout>
  );
};

export default EduStatistika;
