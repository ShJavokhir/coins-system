import React, { useState } from "react";
import { DemoWrapper } from "./Demo.style";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Radio, Tooltip } from "antd";

const Demo = () => {
  const [active, setActive] = useState("");
  const [isActive, setIsActive] = useState(false)

  const handleButtonSuccess=()=>{
    setActive("success")
    setIsActive(true)
  }

  const handleButtonCancel=()=>{
    setActive("cancel")
    setIsActive(false)
  }

  const changeRadio = (e) => {
    // setHomeWork(parseInt(e.target.value));
    console.log(e);
  };


  return (
    <DemoWrapper>
      <div className={`out ${active}`}>
        <div className="in">
          <Tooltip placement="top" title="Bor" color="rgb(114, 225, 40)">
            <button onClick={handleButtonSuccess}>
              <CheckCircleOutlineIcon />
            </button>
          </Tooltip>
          <Tooltip placement="top" title="Yo'q" color="rgb(255, 77, 73)">
            <button onClick={handleButtonCancel}>
              <CancelOutlinedIcon />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="radio" >
      <Radio.Group
          defaultValue="a"
          buttonStyle="solid"
          onChange={changeRadio}
          disabled={!isActive}
        >
          <Radio.Button value="0">Qilinmagan</Radio.Button>
          <Radio.Button value="1">To`liq emas</Radio.Button>
          <Radio.Button value="2">To`liq</Radio.Button>
        </Radio.Group>
      </div>
    </DemoWrapper>
  );
};

export default Demo;
