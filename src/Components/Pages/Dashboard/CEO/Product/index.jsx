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
import Select from "react-select";
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
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const Product = () => {
  const items = [
    {
      key: "1",
      label: `Mahsulot qo'shish`,
      children: <ProductAdd />,
    },
    {
      key: "2",
      label: `Barcha mahsulotlar`,
      children: <AllProducts />,
    },
    {
      key: "3",
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

const ProductAdd = () => {
  const productForm = useForm();
  const categoryForm = useForm();
  const [imgHash, setImgHash] = useState();
  const inputImageValue = productForm.watch("image");
  const [category, setCategory] = useState([]);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const uploadImg = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    const res = await SeoProvider.uploadImage(formdata);
    console.log(res.data);
    // setImgHash(res.data.hashId)
    //! res.data da shunaqa object qaytadi img uchun log qilib tekshirib ko'ras
    //! res.data.data bo'lishi mumkin
    // {
    //   "id": 0,
    //   "name": "string",
    //   "extension": "string",
    //   "fileSize": 0,
    //   "hashId": "string",
    //   "contentType": "string",
    //   "uploadPath": "string"
    // }

    return res.data;
  };

  function getCategory() {
    SeoProvider.getAllCategory().then(
      (res) => {
        setCategory(res.data);
        console.log("category", res.data);
        console.log("pr", res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  useEffect(() => {
    getCategory();
    // prewiewImg();
  }, []);

  const onSubmit = productForm.handleSubmit(async (values) => {
    setBtnLoading(true);
    try {
      const { image, ...rest } = values;
      console.log(values, "v");
      console.log(image); //! LOG qilib ko'ring file bo'lishi kerak => {size: 'asda', type: 'asdas', ...hokozo}

      const imageData = await uploadImg(image[0]);
      const res = await SeoProvider.addProduct({
        ...rest,
        id: imageData.id,
        categoryId: +rest.categoryId.value,
        available: +rest.available,
        price: +rest.price,
        fileStorage: imageData,
      });
      console.log(res);
      productForm.reset();
      toast.success("Mahsulot qo'shildi!"); //! =>>>>>>>>>>>> FINISH
    } catch (err) {
      console.log("PRODUCT YARATISHDA ERROR", err);
    }
    setBtnLoading(false);
  });

  //drawer
  const categoryOptions = useMemo(() => {
    return [
      { label: "Category qo'shish +", value: "ADD_CATEGORY" },
      ...category.map((i) => ({
        label: i.name,
        value: i.id,
      })),
    ];
  }, [category]);

  const handleOpenCategoryDrawer = () => {
    setIsOpenDrawer(true);
  };
  const handleCloseCategoryDrawer = () => {
    setIsOpenDrawer(false);
  };

  const submitAddCategory = categoryForm.handleSubmit((values) => {
    console.log(values);
    SeoProvider.createCategory(values.name).then(
      (res) => {
        console.log(res);
        categoryForm.reset();
        getCategory();
        handleCloseCategoryDrawer();
      },
      (err) => {
        console.log(err);
      }
    );
  });

  return (
    <ProductAddWrapper>
      <div className="left">
        <form onSubmit={onSubmit}>
          <label>
            Rasm
            <input
              type="file"
              multiple={false}
              {...productForm.register("image", { required: true })}
            />
          </label>
          <label>
            Mahsulot nomi
            <input
              type="text"
              {...productForm.register("name", { required: true })}
            />
          </label>
          <label>
            Kategoriya
            <Controller
              control={productForm.control}
              name="categoryId"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <Select
                  className="select"
                  value={value}
                  placeholder="Categoryni tanlang"
                  options={categoryOptions}
                  onBlur={onBlur}
                  onChange={(v) => {
                    if (v.value === "ADD_CATEGORY") {
                      handleOpenCategoryDrawer();
                      onChange(value);
                      return;
                    }
                    onChange(v);
                  }}
                  ref={ref}
                />
              )}
            />
          </label>
          <label>
            Mahsulot narxi (coin)
            <input
              type="number"
              {...productForm.register("price", { required: true })}
            />
          </label>
          <label>
            Mavjud
            <input
              type="number"
              {...productForm.register("available", { required: true })}
            />
          </label>

          <label>
            Mahsulot haqida
            <input
              type="text"
              {...productForm.register("description", { required: true })}
            />
          </label>

          <button disabled={btnLoading} type="submit">
            Qo`shish
          </button>
        </form>
      </div>
      <div className="right">
        <div className="img">
          {inputImageValue && (
            <img src={getURlFile(inputImageValue[0])} alt="" />
          )}
        </div>
      </div>

      <Drawer
        anchor={"right"}
        open={isOpenDrawer}
        onClose={() => {
          handleOpenCategoryDrawer();
        }}
      >
        <ModalHeader className="modal-header">
          <h2 className="title">Category qo`shish</h2>
          <button className="closeSvg" onClick={handleCloseCategoryDrawer}>
            <CloseSvg />
          </button>
        </ModalHeader>
        <ModalContent>
          <form onSubmit={categoryForm.handleSubmit(submitAddCategory)}>
            <input
              type="text"
              placeholder="Category nomi"
              className="form-control"
              {...categoryForm.register("name")}
            />
            <br />
            <button type="submit" className="btn btn-primary">
              Qo`shish
            </button>
          </form>
        </ModalContent>
      </Drawer>
    </ProductAddWrapper>
  );
};

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");
  const [totalElements, setTotalElements] = useState(20);
  const [forRender, setForRender] = useState(null);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const { register, handleSubmit, control, reset, setValue } = useForm();
  const filterForm = useForm();
  const [filterState, setFilterState] = useState({});

  useEffect(() => {
    setLoading(true);
    SeoProvider.getAllProducts(1, 20, filterState)
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
    SeoProvider.getAllCategory()
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
    SeoProvider.imgPreview(obj.imageHashId).then((res) => {
      const fileType = res.data.type.split("/")[1];
      const file = new File([res.data], `image.${fileType}`, {
        type: res.data.type,
      });

      setUrl(getURlFile(file));
    });
  }, []);

  const showModal = (obj) => {
    setDeleteObj(obj);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    await SeoProvider.deleteProduct(deleteObj.id);
    setProducts((p) =>
      p.filter((teach) => {
        return teach.id !== deleteObj.id;
      })
    );
    toast.success("O'chirildi!");
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        <CardActions>
          <Button
            size="small"
            style={{ margin: "auto", width: "100%" }}
            variant="outlined"
            color="error"
            // onClick={() => deleteProduct(obj)}
            onClick={() => showModal(obj)}
          >
            O`chirish
          </Button>
        </CardActions>
      </Card>

      <Modal
        className="modalStyle"
        title="O'chirish"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Mahsulot o`chirilsinmi?</p>
        {/* <div className="btns">
          <button>Yo`q</button>
          <button>Ha</button>
        </div> */}
      </Modal>
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
    SeoProvider.confirmOrder(obj.id)
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
    SeoProvider.getAllOrders(currentPage, 20)
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
      <table className="table table-borderless table-hover">
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
