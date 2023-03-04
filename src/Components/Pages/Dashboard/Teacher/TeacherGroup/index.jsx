import React, { useRef, useState } from "react";
import { ModalContextProvider } from "../../../../../Context/ModalContext";
import ConfirmModal from "../../../../Common/ConfirmModal";
import TeacherGroupMain from "./TeacherGroupMain";

const TeacherGroup = () => {
  const RefObj = useRef({ resolve() {}, reject() {} });
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
      <TeacherGroupMain  RefObj={RefObj} setIsOpen={setIsOpen} />
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

export default TeacherGroup;
