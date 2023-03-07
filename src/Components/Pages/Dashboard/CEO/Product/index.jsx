import { Tabs } from "antd";
import React from "react";
import DashboardLayout from "../../../../Layout";

const Product = () => {
  const items = [
    {
      key: "1",
      label: `Mahsulot qo'shish`,
      children: <ProductAdd />,
    },
    {
      key: "2",
      label: `Category qo'shish`,
      children: <CategoryAdd />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="tabs">
        <Tabs defaultActiveKey="1" type="card" size="large" items={items} />
      </div>
    </DashboardLayout>
  );
};

const ProductAdd = () => {
    const handle=()=>{
      console.log();
    }
  return (
    <>
      <input type="file" onClick={handle}/>
    </>
  );
};

const CategoryAdd = () => {
  return <>category add</>;
};

export default Product;
