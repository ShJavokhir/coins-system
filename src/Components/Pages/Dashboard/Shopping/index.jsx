import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Drawer,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StudentProvider from "../../../../Data/StudentProvider";
import getURlFile from "../../../../utils/getUrlFromFile";
import MinLoader from "../../../Common/MinLoader";
import CoinSvg from "../../../Common/Svgs/CoinSvg";
import CloseSvg from "../../../Common/Svgs/CloseSvg";
import DashboardLayout from "../../../Layout";
import { ModalContent, ModalHeader, ShoppingWrapper } from "./Shopping.style";
import { useForm } from "react-hook-form";
import ButtonLoader from "../../../Common/ButtonLoader"
import { toast } from "react-toastify";


const Shopping = () => {
  const studentId = localStorage.getItem("id");
  const { register, handleSubmit, control, reset, setValue } = useForm();

  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [img, setImg] = useState("");
  const [forRender, setForRender] = useState(null);

  const [counter, setCounter] = useState(1);
  const [product, setProduct] = useState({})
  const [narx, setNarx] = useState(null)

  const [isOpenModal, setIsOpenModal] = useState(false);


  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const filterForm = useForm();
  const [filterState, setFilterState] = useState({});


  const openModal = (obj) => {
    setProduct(obj);
    setNarx(obj.price);
    setIsOpenModal(true);
  };
  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    setLoading(true);
    StudentProvider.getAllProducts(1, 200)
      .then((res) => {
        setForRender(Math.random());
        setProducts(res.data.data);
        setTotalElements(res.data.recordsTotal);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const addOrder = () => {
    const body ={}
      body.studentId = +studentId,
      body.productId = product.id,
      body.amount = counter,
      body.price = counter*narx

      setLoading2(true)
    StudentProvider.createOrder(body)
    .then((res) => {
      console.log(res);
      toast.success("Buyurtma yaratildi")
      onCloseModal();
      setCounter(1);
    })
    .catch((err) => {
      if(product.availableAmount===0){
        toast.error("Mahsulot yetarli emas")
      }else{
        toast.error("Coin yetarli emas")
      }
      console.log(err);
    }).finally(()=>{
      setLoading2(false)
    });
  };

  const increment = () => {
    setCounter((p) => p + 1);
  };
  const decrement = () => {
    setCounter((p) => p - 1);
  };

  // useEffect(() => {
  //   SeoProvider.getAllCategory()
  //     .then((res) => {
  //       console.log(res.data);
  //       setForRender(Math.random());
  //       setCategory(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [filterState]);

  // const categoryOption = [
  //   ...category.map((i) => ({
  //     label: i.name,
  //     value: i.id,
  //   })),
  // ];

  // const filterCategoryOption = [
  //   { label: "Barchasi", value: null },
  //   ...category.map((i) => ({
  //     label: i.name,
  //     value: i.id,
  //   })),
  // ];

  // const onFilterSubmit = filterForm.handleSubmit((values) => {
  //   console.log(values);
  //   const obj = {
  //     categoryId:
  //       values.categoryId?.value === "nullCategory"
  //         ? ""
  //         : values.categoryId?.value,
  //   };

  //   console.log("obj", obj);

  //   setFilterState(obj.categoryId);
  // });

  // const handleFilter =(obj)=>{
  //   console.log(obj.value);
  //   setFilterState(obj.value);
  // }

  // useEffect(() => {
  //   onFilterSubmit(filterForm.getValues());
  //   console.log(filterForm.getValues());
  // }, [filterForm.watch("categoryId")]);


  return (
    <DashboardLayout>
      <ShoppingWrapper>
      {/* <form onSubmit={onFilterSubmit}>
        <label>Bo`limlar</label>
          <ul>
            {filterCategoryOption.map((v, i) => (
              <li key={i} >
                <Button onClick={()=>handleFilter(v)}>{v.label}</Button>
              </li>
            ))}
          </ul>
      </form> */}
        <div className="wrap">
          {!loading ? (
            products ? (
              products.map((obj, index) => (
                <CardPro key={index} obj={obj} openModal={openModal} />
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
      </ShoppingWrapper>

      {/* =====drawer ========== */}

      <Drawer
        anchor={"right"}
        open={isOpenModal}
        onClose={() => {
          onCloseModal();
        }}
      >
        <ModalHeader className="modal-header">
          <h2 className="title">Buyurtma qilish</h2>
          <button className="closeSvg" onClick={onCloseModal}>
            <CloseSvg />
          </button>
        </ModalHeader>
        <ModalContent>
          <form
            className="p-3"
            style={{ width: 500 }}
            onSubmit={handleSubmit(addOrder)}
          >
            <div className="label">
              <label>Soni</label>
              <div className="counter">
                <span className="countBtn" onClick={decrement}>
                  -
                </span>
                <span>{counter}</span>
                <span className="countBtn" onClick={increment}>
                  +
                </span>
              </div>
            </div>
            <div className="label">
              <label>Narxi</label>
              <span style={{marginLeft:40}}>{counter*narx} <CoinSvg/></span>
            </div>
            <button type="submit" className="btn btn-primary" >
              Qo`shish {loading2 && <ButtonLoader/>}
            </button>
          </form>
        </ModalContent>
      </Drawer>
    </DashboardLayout>
  );
};

const CardPro = ({ obj, openModal }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    StudentProvider.imgPreview(obj.imageHashId).then((res) => {
      const fileType = res.data.type.split("/")[1];
      const file = new File([res.data], `image.${fileType}`, {
        type: res.data.type,
      });

      setUrl(getURlFile(file));
    });
  }, []);

  return (
    <div className="cardOut">
      <Card sx={{ maxWidth: 345 }} className="card">
        <CardMedia
          component="img"
          alt=""
          height="250"
          style={{ objectFit: "contain" }}
          image={url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {obj.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {obj.description}
          </Typography>
          <p style={{ marginTop: 15 }} className="category">
            Category: {obj.categoryName}
          </p>
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
            variant="outlined"
            style={{ margin: "auto" }}
            onClick={() => openModal(obj)}
          >
            Buyurtma qilish
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Shopping;
