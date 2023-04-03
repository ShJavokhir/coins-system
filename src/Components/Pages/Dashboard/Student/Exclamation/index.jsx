import React from "react";
import DashboardLayout from "../../../../Layout";
import { Wrapper } from "./Wrapper.style";

const Exclamation = () => {
  return (
    <DashboardLayout>
      <Wrapper>
        <h3>Ball to`plash yo`llari </h3>
        <ul>
          <li>Darsga kelsa 10 ball </li>
          <li>Kemasa. -20 ball </li>
        </ul>
        <ul>
          <li>Vazifa to`liq bajarsa. 15 ball </li>
          <li>Vazifa chala bo`sa 5 ball </li>
          <li>Vazifa tayyorlamasa -15 ball </li>
        </ul>
        <ul>
          <li>Haftalik natija 70% dan baland bo`sa 100ball </li>
          <li>
            Haftalik imtihon natijasi 40 % dan past bo`sa -50 ball jarima{" "}
          </li>
        </ul>
        <ul>
          <li>Sunday eventga kelish. 30 ball </li>
          <li>Haftada bir marta Qo`shimcha darsga kelish 20 ball </li>
          <li>Do`stini taklif qilsa 150 ball </li>
          <li>Bosqich imtihonidan 80 % dan baland ball toplasa. 200 ball </li>
          <li>Bosqich imtihonidan 50 % dan baland to`plasa 100 ball </li>
        </ul>
        <p>
          Agar o`quvchi bir oyda umumiy 200 balldan past to`plasa o`quv
          markazdan haydaladi
        </p>
      </Wrapper>
    </DashboardLayout>
  );
};

export default Exclamation;
