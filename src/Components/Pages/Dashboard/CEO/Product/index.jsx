import { InboxOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Tabs, Upload } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React from "react";
import { toast } from "react-toastify";
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
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            toast.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            toast.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };
  return (
    <>
      <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </Dragger>
    </>
  );
};

const CategoryAdd = () => {
  return <>category add</>;
};

export default Product;
