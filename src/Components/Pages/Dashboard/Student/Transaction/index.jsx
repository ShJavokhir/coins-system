import React, { useEffect, useState } from "react";
import StudentProvider from "../../../../../Data/StudentProvider";
import DashboardLayout from "../../../../Layout";
import { TransactionWrapper } from "./Transaction.style";
import CoinSvg from "../../../../Common/Svgs/CoinSvg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Transaction = () => {
    const { register, handleSubmit, control, reset, setValue } = useForm();
    const exchangeForm = useForm();
  const id = localStorage.getItem("id");
  const [ball, setBall] = useState(null);
  const [coin, setCoin] = useState(null);
    const [render, setRender] = useState(null)

  useEffect(() => {
    StudentProvider.getStudentInfo(id)
      .then((res) => {
        console.log(res.data.data);
        setBall(res.data.data.totalBall);
        setCoin(res.data.data.totalCoin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  const exchangeCoin=exchangeForm.handleSubmit((values)=>{
    console.log(values);
    StudentProvider.exchangeCoin(values.ball).then(
      (res) => {
        toast.success("Muvaffaqiyatli");
        setRender(Math.random());
        exchangeForm.reset();
      },
      (err) => {
        if(values.ball % 100 !==0){
          toast.error("Ball 100 ga karrali bo'lishi kerak");
        }else{
          toast.error("Ball yetarli emas");
        }
        console.log(err);
      }
    );
  })

  return (
    <DashboardLayout>
      <TransactionWrapper>
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
        </div>
        <h3>Ballarni coinga almashtirish</h3>
        <form onSubmit={exchangeForm.handleSubmit(exchangeCoin)}>
           <div className="label">
           <label>100 ball = 1 coin</label>
            <input type="number" placeholder={ball} className="form-control"
              {...exchangeForm.register("ball")}/>
           </div>
           <button type="submit" className="btn btn-primary">
              Almashtirish
            </button>
        </form>
      </TransactionWrapper>
    </DashboardLayout>
  );
};

export default Transaction;
