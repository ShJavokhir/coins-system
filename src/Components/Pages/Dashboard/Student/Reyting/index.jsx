import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import StudentProvider from "../../../../../Data/StudentProvider";
import MinLoader from "../../../../Common/MinLoader";
import CoinSvg from "../../../../Common/Svgs/CoinSvg";
import DashboardLayout from "../../../../Layout";
import { ReytingWrapper } from "./Reyting.style";

const Reyting = () => {
  const { register, handleSubmit, control, reset, setValue } = useForm();

  const id = localStorage.getItem("id");

  const [ball, setBall] = useState(null);
  const [coin, setCoin] = useState(null);
  const [spentCoin, setSpentCoin] = useState(null);
  const [stId, setStId] = useState(null);
  const [render, setRender] = useState(null);
  const [loading, setLoading] = useState(null);

  const [group, setGroup] = useState([]);
  const [info, setInfo] = useState([]);
  const [groupsId, setGroupsId] = useState(null);

  useEffect(() => {
    StudentProvider.getStudentInfo(id)
      .then((res) => {
        console.log(res.data.data);
        setBall(res.data.data.totalBall);
        setCoin(res.data.data.totalCoin);
        setSpentCoin(res.data.data.spentCoin);
        setStId(res.data.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  useEffect(() => {
    StudentProvider.getGroupOfStudent(id)
      .then((res) => {
        console.log(res.data);
        setRender(Math.random());
        setGroup(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading(true)
    StudentProvider.getStudentGroupInfo(groupsId)
      .then((res) => {
        console.log("info",res.data.data);
        setInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        setLoading(false)
      });
  }, [groupsId]);

  const guruhOption = [
    ...group.map((i) => ({
      label: i.name,
      value: i.groupId,
    })),
  ];

  return (
    <DashboardLayout>
      <ReytingWrapper>
        <div className="cards">
          <div className="card">
            <img src="/icons/ball.png" alt="" />
            <p>Mavjud ballar: {ball}</p>
          </div>
          <div className="card">
            <img src="/icons/coins.png" alt="" />
            <p>
              Mavjud coinlar: {coin} <CoinSvg />
            </p>
          </div>
          <div className="card">
            <img src="/icons/coins.png" alt="" />
            <p>
              Sarflangan coinlar: {spentCoin} <CoinSvg />
            </p>
          </div>
        </div>

        <div className="select">
          <label>Guruhi</label>
          <Controller
            control={control}
            name="studentId"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                className="select"
                value={value}
                placeholder="Guruhni tanlang"
                options={guruhOption}
                defaultValue={guruhOption[0]}
                onBlur={onBlur}
                onChange={(v) => {
                  onChange(v);
                  setGroupsId(v.value);
                  console.log(v);
                }}
                ref={ref}
              />
            )}
          />
        </div>

        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th style={{ width: "20%" }} className="col">
                Familyasi
              </th>
              <th style={{ width: "20%" }} className="col">
                Ismi
              </th>
              <th style={{ width: "20%" }} className="col">
                To`plagan ball
              </th>
              <th style={{ width: "20%" }} className="col">
                To`plagan coin
              </th>
              <th style={{ width: "20%" }} className="col">
                Sarflagan coin
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              info ? (
                info.map((obj, index) => (
                  <tr key={index} style={{background:obj.id == stId ? "rgb(114, 225, 40, 0.42)" : "white"}}>
                    <td style={{ width: "20%", fontWeight: obj.id == stId ? "800" : "400"}} className="col">
                    {index+1}. {obj.lastName}
                    </td>
                    <td style={{ width: "20%", fontWeight: obj.id == stId ? "800" : "400" }} className="col">
                      {obj.firstName}
                    </td>
                    <td style={{ width: "20%", fontWeight: obj.id == stId ? "800" : "400" }} className="col">
                      {obj.totalBall}
                    </td>
                    <td style={{ width: "20%", fontWeight: obj.id == stId ? "800" : "400" }} className="col">
                      {obj.totalCoin}
                    </td>
                    <td style={{ width: "20%", fontWeight: obj.id == stId ? "800" : "400" }} className="col">
                      {obj.spentCoin}
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
      </ReytingWrapper>
    </DashboardLayout>
  );
};

export default Reyting;
