import React, { useEffect, useState } from "react";
import { AddBallWrapper } from "./AddBall.style";
import DashboardLayout from "../../../../Layout";
import SeoProvider from "../../../../../Data/SeoProvider";
import { Button } from "@mui/material";
import ButtonLoader from "../../../../Common/ButtonLoader";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddBall = () => {
    const { control, handleSubmit, register, reset } = useForm();
    const [student, setStudent] = useState([])
    const [studentId, setStudentId] = useState(null)
    const [forRender, setForRender] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)

  const handleAddBallBtn = (values) => {
    setLoading(true);
    SeoProvider.addBall(studentId, values.ball)
      .then((res) => {
        console.log(res);
        setForRender(Math.random());
        reset();
        toast.success("Qo'shildi");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Xatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading2(true);
    SeoProvider.getAllStudent(1, 3000)
      .then((res) => {
        console.log(res.data.data);
        setStudent(res.data.data);
        setTotalElements(res.data.recordsTotal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading2(false));
  }, [forRender]);

  const studentOption = [
    ...student.map((i) => ({
      label: i.firstName + " " + i.lastName +"("+i.username+")",
      value: i.id,
    })),
  ];

  return (
    <DashboardLayout>
      <AddBallWrapper>
        <div className="label">
          <div className="selec">
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
          </div>

          <form
            onSubmit={handleSubmit(handleAddBallBtn)}
            style={{ display: "flex" }}
          >
            <input
              autoComplete="off"
              className="form-control"
              type="number"
              placeholder={"Ball"}
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
              type="submit"
            >
              Ball berish { loading && <ButtonLoader/>}
            </Button>
          </form>
        </div>
      </AddBallWrapper>
    </DashboardLayout>
  );
};

export default AddBall;
