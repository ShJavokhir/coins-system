import React, { useRef, useState } from "react";
import { ModalContextProvider } from "../../../../../Context/ModalContext";
import ConfirmModal from "../../../../Common/ConfirmModal";
import DashboardLayout from "../../../../Layout";
import DirectorMain from "./DirectorMain";

const Director = () => {
  const RefObj = useRef({ resolve() {}, reject() {} });
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <DashboardLayout>
      <DirectorMain RefObj={RefObj} setIsOpen={setIsOpen}/>
      <ModalContextProvider
        RefObj={RefObj}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
      >
        <ConfirmModal>{RefObj.current.textContent}</ConfirmModal>
      </ModalContextProvider>
    </DashboardLayout>
  );
};

export default Director;
