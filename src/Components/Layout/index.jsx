import React, { useRef, useState } from "react";
import DashboardHeader from "./DashHeader";
import Sidebar from "./Sidebar";
import { Wrapper } from "./style";
import { ModalContextProvider } from "../../Context/ModalContext";
import ConfirmModal from "../Common/ConfirmModal";

const DashboardLayout = ({ children }) => {
  const RefObj = useRef({resolve(){}, reject(){}});
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
      <Wrapper>
        <div className="layout__sidebar">
          {/*<Sidebar/>*/}
          <Sidebar />
        </div>
        <div className="layout__right">
          <div className="layout__top">
            <DashboardHeader RefObj={RefObj} setIsOpen={setIsOpen}/>
          </div>
          <main className="layout__main">{children}</main>
        </div>
      </Wrapper>
      <ModalContextProvider
        RefObj={RefObj}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      >
        <ConfirmModal>{RefObj.current.textContent}</ConfirmModal>
      </ModalContextProvider>
    </>
  );
};

export default DashboardLayout;
