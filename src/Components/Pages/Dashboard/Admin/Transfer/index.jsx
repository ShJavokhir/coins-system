import { Button } from "@mui/material";
import { Radio, Space, Transfer } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import AdminProvider from "../../../../../Data/AdminProvider";
import DashboardLayout from "../../../../Layout";
import { TransferWrapper } from "./Transfer.style";
import ButtonLoader from "../../../../Common/ButtonLoader";
import MyLink from "../../../../Common/MyLink";
import ToRightSvg from "../../../../Common/Svgs/ToRightSvg";

const Transfers = () => {
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentsIn, setStudentsIn] = useState([]);
  const [studentsOut, setStudentsOut] = useState([]);
  const [values, setValues] = useState(1);
  const [outId, setOutId] = useState(1);
  const [inId, setInId] = useState(1);
  const [render, setRender] = useState(null);

  const onChange = (e) => {
    setValues(e.target.value);
    console.log(values);
  };

  useEffect(() => {
    AdminProvider.getAllGroup(1, 1000)
      .then((res) => {
        console.log(res.data);
        setGroups(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loading]);

  useEffect(() => {
    console.log(outId, inId);
  }, [studentsOut, loading]);

  const transferBtn = async () => {
    const body = {};
    body.fromGroupId = outId;
    body.toGroupId = inId;
    body.studentId = values;
    setLoading(true);
    await AdminProvider.transferStudent(body)
      .then((res) => {
        console.log("tre", res);
        setRender(Math.random());
        toast.success("Muvaffaqiyatli o'tkazildi");
        let tempitem = null;
        setStudentsOut(
          studentsOut.filter((item) => {
            if (item.id == values) {
              tempitem = item;
              return false;
            }
            return true;
          })
        );
        studentsIn.push(tempitem);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Bu o'quvchi ikkala guruhdayam bor");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //options
  const groupsOption = [
    ...groups.map((i) => ({
      label: i.name,
      value: i.id,
    })),
  ];

  return (
    <DashboardLayout>
      <TransferWrapper>
        <div className="top">
          <h3>O`quvchilarni guruhdan guruhga o`tkazish</h3>
          <MyLink to="/dashboard/transferTable">O`tkazmalar tarixi</MyLink>
        </div>
        <div
          className="label"
          style={{ display: "flex", gap: 50, alignItems: "center" }}
        >
          {/* <label>Guruhni tanlang</label> */}
          <div className="sel">
            <Controller
              control={control}
              name="groupIdOut"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select"
                  value={value}
                  placeholder="Guruhni tanlang"
                  options={groupsOption}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    AdminProvider.getOneGroup(v.value)
                      .then((res) => {
                        console.log("out", res.data);
                        setStudentsOut(res.data.data);
                        setOutId(v.value);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    console.log(v);
                  }}
                  ref={ref}
                />
              )}
            />
            <div className="table">
              {studentsOut.map((obj, idx) => (
                <div key={idx}>
                  <Radio.Group onChange={onChange} value={values}>
                    <Radio value={obj.id}>
                      <div className="item">
                        {idx + 1}.{obj.firstName} {obj.lastName}
                      </div>
                    </Radio>
                  </Radio.Group>
                </div>
              ))}
            </div>
          </div>
          <Button
            className="transferBtn"
            variant="contained"
            onClick={transferBtn}
            style={{
              fontFamily: "Azo sans",
              color: "#fff",
              background: "#006786",
            }}
          >
            <ToRightSvg/> {loading && <ButtonLoader />}
          </Button>
          <div className="sel">
            <Controller
              control={control}
              name="groupIdIn"
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  className="select"
                  value={value}
                  placeholder="Guruhni tanlang"
                  options={groupsOption}
                  onBlur={onBlur}
                  onChange={(v) => {
                    onChange(v);
                    AdminProvider.getOneGroup(v.value)
                      .then((res) => {
                        console.log("out", res.data.data);
                        setStudentsIn(res.data.data);
                        setInId(v.value);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    console.log(v);
                  }}
                  ref={ref}
                />
              )}
            />
            <div className="table">
              {studentsIn.map((obj, idx) => (
                <div className="item" key={idx} style={{ marginBottom: 10 }}>
                  {idx + 1}.{obj.firstName} {obj.lastName}
                </div>
              ))}
            </div>
          </div>
        </div>
      </TransferWrapper>
    </DashboardLayout>
  );
};

export default Transfers;
