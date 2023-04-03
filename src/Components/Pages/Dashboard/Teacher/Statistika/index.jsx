import React from "react";
import DashboardLayout from "../../../../Layout";
import MinLoader from "../../../../Common/MinLoader";
import Select from "react-select";
import { Controller, useForm, useWatch } from "react-hook-form";
import TeacherProvider from "../../../../../Data/TeacherProvider";
import { useState } from "react";
import { useEffect } from "react";
import { StatistikaWrapper } from "./Statistika.style";
import Charts from "./Chart";

const Statistika = () => {
    const { control, setValue } = useForm();

  
    const [stId, setStId] = useState(null);
    const [render, setRender] = useState(null);
    const [loading, setLoading] = useState(null);
  
    const [group, setGroup] = useState([]);
    const [info, setInfo] = useState([]);
  
    const groupId=useWatch({
      name:"studentId",
      defaultValue:null,
      control
    })
  
    useEffect(() => {
      TeacherProvider.getTeacherGroup()
        .then((res) => {
          console.log(res.data);
          setRender(Math.random());
          setGroup(res.data.data);
          const firstItem=res.data.data[0]
          setValue("studentId", {label:firstItem.groupName, value:firstItem.id})
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

  
    useEffect(() => {
      if(groupId==null) return;
      setLoading(true)
      TeacherProvider.getOneGroup(groupId.value)
        .then((res) => {
          console.log("info",res.data.data);
          setInfo(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        }).finally(()=>{
          setLoading(false)
        });
    }, [groupId]);
  
    const guruhOption = [
      ...group.map((i) => ({
        label: i.groupName,
        value: i.id,
      })),
    ];
  return (
    <DashboardLayout>
      <StatistikaWrapper>
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
                onBlur={onBlur}
                onChange={onChange}
                ref={ref}
              />
            )}
          />
        </div>

        <table className="table table-striped table-hover">
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
                  <tr key={index} >
                    <td className="col">
                    {index+1}. {obj.lastName}
                    </td>
                    <td className="col">
                      {obj.firstName}
                    </td>
                    <td className="col">
                      {obj.totalBall}
                    </td>
                    <td className="col">
                      {obj.totalCoin}
                    </td>
                    <td className="col">
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
      </StatistikaWrapper>
      <Charts/>
    </DashboardLayout>
  );
};

export default Statistika;
