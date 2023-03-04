import React, {useState, useRef} from "react";
import { ModalContextProvider } from "../../../../../Context/ModalContext";
import ConfirmModal from "../../../../Common/ConfirmModal";
import TeachersMain from "./TeacherMain";

const Teachers = () => {
    const RefObj = useRef({resolve(){}, reject(){}});
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
    <TeachersMain RefObj={RefObj} setIsOpen={setIsOpen}/>
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

export default Teachers;
