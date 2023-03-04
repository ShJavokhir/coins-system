import React, { useRef, useState } from "react";
import { ModalContextProvider } from "../../../../../Context/ModalContext";
import ConfirmModal from "../../../../Common/ConfirmModal";
import LessonMain from "./LessonMain";

const Lesson = () => {
  const RefObj = useRef({ resolve() {}, reject() {} });
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
      <LessonMain RefObj={RefObj} setIsOpen={setIsOpen} />
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

export default Lesson;
