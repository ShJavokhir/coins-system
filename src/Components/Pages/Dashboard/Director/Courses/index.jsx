import React, { useRef, useState } from 'react';
import { ModalContextProvider } from '../../../../../Context/ModalContext';
import ConfirmModal from '../../../../Common/ConfirmModal';
import DashboardLayout from '../../../../Layout';
import CoursesMain from './CoursesMain';

const Courses = () => {
    const RefObj = useRef({resolve(){}, reject(){}});
  const [modalIsOpen, setIsOpen] = useState(false);

    return (
       <>
        <DashboardLayout>
            <CoursesMain RefObj={RefObj} setIsOpen={setIsOpen}/>
        </DashboardLayout>
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

export default Courses;