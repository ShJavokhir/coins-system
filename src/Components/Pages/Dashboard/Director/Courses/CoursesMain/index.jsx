import { Button, Drawer, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import MinLoader from "../../../../../Common/MinLoader";
import DeleteSvg from "../../../../../Common/Svgs/DeleteSvg";
import EditSvg from "../../../../../Common/Svgs/EditSvg";
import CloseSvg from "../../../../../Common/Svgs/CloseSvg";
import { CourseWrapper, ModalHeader } from "./CoursesMain.style";
import ButtonLoader from "../../../../../Common/ButtonLoader";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DirectorProvider from "../../../../../../Data/DirectorProvider";

const CoursesMain = ({ RefObj, setIsOpen }) => {
  const { register, handleSubmit, control, reset, setValue } = useForm();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [course, setCourse] = useState([]);
  const [forRender, setForRender] = useState(null);
  const [editing, setEditing] = useState(null);

  const openModal = () => {
    setIsOpenModal(true);
  };
  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    setLoading(true);
    DirectorProvider.getAllCourse()
      .then((res) => {
        console.log(res.data);
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [forRender]);

  const onSubmitCourse = async (values) => {
    const body = {};
    body.name = values.name;

    console.log("body", body);
    setLoading2(true);
    if (editing) {
      body.id = editing.id;
      try {
        const { data } = await DirectorProvider.updateCourse(editing.id, body);
        setForRender(Math.random());
        reset();
        toast.success("Muvaffaqiyatli o'zgartirildi");
        setIsOpenModal(false);
      } catch (err) {
        console.log(err);
      }
      setLoading2(false);
    } else {
      DirectorProvider.createCourse(body)
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

  const handleDeleteCourse = (obj) => {
    RefObj.current.textContent = `Rostdan ham o'chirishni xoxlaysizmi?`;
    setIsOpen(true);
    new Promise((res, rej) => {
      RefObj.current.resolve = res;
      RefObj.current.reject = rej;
    })
      .then(async () => {
        await DirectorProvider.deleteCourse(obj.id);
        setCourse((p) =>
          p.filter((teach) => {
            return teach.id !== obj.id;
          })
        );
        toast.success("O'chirildi")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server bilan bog'lanishda xatolik!")
      });
  };

  const handleEditCourse = (obj) => {
    setIsOpenModal(true);
    setEditing(obj);
    setValue("name", obj.name);
  };

  return (
    <>
      <CourseWrapper>
        <div className="top">
          <h3>Kurslar</h3>
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
                Nomi
              </th>
              <th style={{ width: "30%" }} className="col">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              course.length ? (
                course.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ width: "40%" }} className="col">
                      {obj.name}
                    </td>
                    <td style={{ width: "30%" }} className="col">
                      <div className="btns">
                        <IconButton
                          style={{ background: "rgb(114, 225, 40, 0.12)" }}
                          onClick={() => handleEditCourse(obj)}
                        >
                          <EditSvg />
                        </IconButton>
                        <IconButton
                          style={{ background: "rgb(253, 181, 40, 0.12)" }}
                          onClick={() => handleDeleteCourse(obj)}
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
                    Kurslar mavjud emas!
                  </h3>
                </div>
              )
            ) : (
              <MinLoader />
            )}
          </tbody>
        </table>
      </CourseWrapper>
      <Drawer
        anchor={"right"}
        open={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
      >
        <ModalHeader className="modal-header">
          <h2 className="title">Kurs qoshish</h2>
          <button className="closeSvg" onClick={onCloseModal}>
            <CloseSvg />
          </button>
        </ModalHeader>
        <form
          className="p-3"
          style={{ width: 500 }}
          onSubmit={handleSubmit(onSubmitCourse)}
        >
          <input
            autoComplete="off"
            className="form-control"
            placeholder={"Nomi"}
            {...register("name", { required: true })}
          />
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ display: "flex" }}
          >
            Qo`shish {loading2 && <ButtonLoader />}
          </button>
        </form>
      </Drawer>
    </>
  );
};

export default CoursesMain;
