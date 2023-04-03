import { Modal, Switch, Tabs } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import DashboardLayout from "../../../../Layout";
import { Controller, useForm } from "react-hook-form";
import SeoProvider from "../../../../../Data/SeoProvider";
import {
  ModalContent,
  ModalHeader,
  OrderListWrapper,
  ProductAddWrapper,
  ProductWrapper,
} from "./Product.style";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Drawer,
  Typography,
} from "@mui/material";
import CloseSvg from "../../../../Common/Svgs/CloseSvg";
import getURlFile from "../../../../../utils/getUrlFromFile";
import { toast } from "react-toastify";
import { API_URL } from "../../../../../HHTP/client";
import axios from "axios";
import MinLoader from "../../../../Common/MinLoader";
import CoinSvg from "../../../../Common/Svgs/CoinSvg";
import Pagination from "rc-pagination";
import moment from "moment";
import DirectorProvider from "../../../../../Data/DirectorProvider";

const Product = () => {
  const items = [
    {
      key: "1",
      label: `Barcha mahsulotlar`,
      children: <AllProducts />,
    },
    {
      key: "2",
      label: `Buyurtmalar ro'yhati`,
      children: <OrderList />,
    },
  ];

  return (
    <DashboardLayout>
      <Tabs defaultActiveKey="1" type="card" size="small" items={items} />
    </DashboardLayout>
  );
};


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");
  const [totalElements, setTotalElements] = useState(20);
  const [forRender, setForRender] = useState(null);
  const [category, setCategory] = useState([]);
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const filterForm = useForm();
  const [filterState, setFilterState] = useState({});

  useEffect(() => {
    setLoading(true);
    DirectorProvider.getAllProducts(1, 20, filterState)
      .then((res) => {
        console.log(res.data.data);
        setProducts(res.data.data);
        setTotalElements(res.data.recordsTotal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [filterState, forRender]);

  useEffect(() => {
    DirectorProvider.getAllCategory()
      .then((res) => {
        console.log(res.data);
        setForRender(Math.random());
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filterState]);


  const filterCategoryOption = [
    { label: "Barchasi", value: null },
    ...category.map((i) => ({
      label: i.name,
      value: i.id,
    })),
  ];

  const onFilterSubmit = filterForm.handleSubmit((values) => {
    console.log(values);
    const obj = {
      categoryId:
        values.categoryId?.value === "nullCategory"
          ? ""
          : values.categoryId?.value,
    };

    console.log("obj", obj);

    setFilterState(obj.categoryId);
  });

  const handleFilter =(obj)=>{
    console.log(obj.value);
    setFilterState(obj.value);
  }

  useEffect(() => {
    onFilterSubmit(filterForm.getValues());
    console.log(filterForm.getValues());
  }, [filterForm.watch("categoryId")]);

  return (
    <ProductWrapper>
      <form onSubmit={onFilterSubmit}>
        <label>Bo`limlar</label>
          <ul>
            {filterCategoryOption.map((v, i) => (
              <li key={i} >
                <Button onClick={()=>handleFilter(v)}>{v.label}</Button>
              </li>
            ))}
          </ul>
      </form>
      <div className="wrap">
        {!loading ? (
          products ? (
            products.map((obj, index) => (
              <CardPro key={index} obj={obj} setProducts={setProducts} />
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: 30,
              }}
            >
              <h3 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
                Mahsulotlar mavjud emas!
              </h3>
            </div>
          )
        ) : (
          <MinLoader />
        )}
      </div>
    </ProductWrapper>
  );
};
const CardPro = ({ obj, setProducts }) => {
  const [url, setUrl] = useState("");
  const [deleteObj, setDeleteObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    DirectorProvider.imgPreview(obj.imageHashId).then((res) => {
      const fileType = res.data.type.split("/")[1];
      const file = new File([res.data], `image.${fileType}`, {
        type: res.data.type,
      });

      setUrl(getURlFile(file));
    });
  }, []);

  
  return (
    <div className="cardOut">
      <Card className="card">
        <CardMedia
          component="img"
          alt=""
          height="200"
          style={{ objectFit: "contain" }}
          image={url}
        />
        <CardContent style={{ padding: 0 }}>
          <Typography
            gutterBottom
            variant="h5"
            className="title"
            component="div"
          >
            {obj.productName}
          </Typography>
          <Typography variant="body2" className="descr" color="text.secondary">
            {obj.description}
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="price">
              Narxi: {obj.price} <CoinSvg />
            </p>
            <p className="aviable">Mavjud: {obj.availableAmount}</p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

const OrderList = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [forRender, setForRender] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(20);
  const [saved, setSaved] = useState(false);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const confirmOrder = (obj) => {
    console.log(obj);
    DirectorProvider.confirmOrder(obj.id)
      .then((res) => {
        console.log(res);
        setForRender(Math.random());
        // setSaved(true);
        toast.success("Buyurtma qabul qilindi");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Xatolik!");
      });
  };

  useEffect(() => {
    setLoading(true);
    DirectorProvider.getAllOrders(currentPage, 20)
      .then((res) => {
        console.log(res.data.data);
        setOrders(res.data.data);
        setTotalElements(res.data.recordsTotal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [forRender, currentPage]);

  return (
    <OrderListWrapper>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th style={{ width: "15%" }} className="col">
              Familyasi
            </th>
            <th style={{ width: "15%" }} className="col">
              Ismi
            </th>
            <th style={{ width: "15%" }} className="col">
              Mahsulot
            </th>
            <th style={{ width: "10%" }} className="col">
              Qancha
            </th>
            <th style={{ width: "10%" }} className="col">
              Umumiy narxi
            </th>
            <th style={{ width: "10%" }} className="col">
              Sana
            </th>
            <th style={{ width: "10%" }} className="col">
              Status
            </th>
            <th style={{ width: "15%" }} className="col">
              Tasdiqlash
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            orders ? (
              orders.map((obj, index) => (
                <tr key={index}>
                  <td style={{ width: "15%" }} className="col">
                    {(currentPage - 1) * 20 + index + 1}. {obj.lastName}
                  </td>
                  <td style={{ width: "15%" }} className="col">
                    {obj.firstName}
                  </td>
                  <td style={{ width: "15%" }} className="col">
                    {obj.productName}
                  </td>
                  <td style={{ width: "10%" }} className="col">
                    {obj.amount}
                  </td>
                  <td style={{ width: "10%" }} className="col">
                    {obj.price}
                  </td>
                  <td style={{ width: "10%" }} className="col">
                    {moment(new Date(obj.createdDate)).format("DD.MM.YYYY")}
                  </td>
                  <td style={{ width: "10%" }} className="col">
                    {obj.status === 0 ? (
                      <span
                        style={{
                          color: "rgb(253, 181, 40)",
                          fontWeight: 700,
                        }}
                      >
                        Kutmoqda..
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
                  <td
                    style={{
                      width: "15%",
                    }}
                    className="col"
                  >
                    {obj.status === 0 ? (
                      <Button
                        onClick={() => confirmOrder(obj)}
                        variant="contained"
                        style={{
                          fontFamily: "Azo sans",
                          color: "#fff",
                          background: "#FDB528",
                          marginLeft: 10,
                          fontSize: 12,
                        }}
                      >
                        Qabul qilish
                      </Button>
                    ) : (
                      <Button
                        onClick={() => confirmOrder(obj)}
                        variant="contained"
                        disabled
                        style={{
                          fontFamily: "Azo sans",
                          color: "#fff",
                          background: "rgb(114, 225, 40)",
                          marginLeft: 10,
                          fontSize: 12,
                        }}
                      >
                        Qabul qilindi
                      </Button>
                    )}
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

      <Pagination
        onChange={onChange}
        current={currentPage}
        total={totalElements}
        pageSize={20}
      />
    </OrderListWrapper>
  );
};

export default Product;
