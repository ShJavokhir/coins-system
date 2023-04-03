import moment from "moment";
import Pagination from "rc-pagination";
import React, { useEffect, useState } from "react";
import StudentProvider from "../../../../../Data/StudentProvider";
import MinLoader from "../../../../Common/MinLoader";
import CoinSvg from "../../../../Common/Svgs/CoinSvg";
import DashboardLayout from "../../../../Layout";
import { OrdersWrapper } from "./Orders.style";

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [forRender, setForRender] = useState(null);

  useEffect(() => {
    setLoading(true);
    StudentProvider.getAllOrders()
      .then((res) => {
        console.log(res.data.data);
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [forRender]);

  return (
    <DashboardLayout>
      <OrdersWrapper>
        <h3>Buyurtmalar</h3>
        <span>Eslatma: Qabul qilingan buyurtmani 10 kun ichida olishingiz mumkin</span>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ width: "20%" }} className="col">
                Mahsulot
              </th>
              <th style={{ width: "20%" }} className="col">
                Qancha
              </th>
              <th style={{ width: "20%" }} className="col">
                Umumiy narxi
              </th>
              <th style={{ width: "20%" }} className="col">
                Status
              </th>
              <th style={{ width: "20%" }} className="col">
                Sana
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              orders ? (
                orders.map((obj, index) => (
                  <tr key={index}>
                    <td style={{ width: "20%" }} className="col">
                      {index + 1}. {obj.productName}
                    </td>
                    <td style={{ width: "20%" }} className="col">
                      {obj.amount}
                    </td>
                    <td style={{ width: "20%" }} className="col">
                      {obj.price}
                      <CoinSvg />
                    </td>
                    <td style={{ width: "20%" }} className="col">
                      {obj.status === 0 ? (
                        <span
                          style={{
                            color: "rgb(253, 181, 40)",
                            fontWeight: 700,
                          }}
                        >
                          Jarayonda..
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "rgb(114, 225, 40)",
                            fontWeight: 700,
                          }}
                        >
                          Qabul qilindi
                        </span>
                      )}
                    </td>
                    <td style={{ width: "20%" }} className="col">
                      {moment(new Date(obj.createdDate)).format("DD.MM.YYYY")}
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
                    Buyurtmalar mavjud emas!
                  </h3>
                </div>
              )
            ) : (
              <MinLoader />
            )}
          </tbody>
        </table>
      </OrdersWrapper>
    </DashboardLayout>
  );
};

export default Orders;
