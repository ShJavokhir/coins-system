import styled from "styled-components";

const DemoWrapper = styled.div`
display: flex;
  padding: 100px;
  .out {
    border: 1px solid #000;
    width: 40px;
    height: 30px;
    border-radius: 20px;
    position: relative;
    transition: 300ms !important;

    &:hover {
      .in {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 2;
        cursor: pointer;

        button:nth-child(1) {
          width: 50%;
          height: 100%;
          border-radius: 20px;
          background-color: transparent;
          border: none;

          svg {
            color: rgb(114, 225, 40);
          }

          &:hover {
            background-color: rgb(114, 225, 40);
            svg {
              color: #fff;
            }
          }
        }
        button:nth-child(2) {
          width: 50%;
          height: 100%;
          border-radius: 20px;
          background-color: transparent;
          border: none;

          svg {
            color: rgb(255, 77, 73);
          }

          &:hover {
            background-color: rgb(255, 77, 73);
            svg {
              color: #fff;
            }
          }
        }
      }
    }
  }

  .in {
    border: 1px solid #000;
    width: 80px;
    height: 31px;
    border-radius: 20px;

    display: none;

    position: absolute;
    top: -10px;
    left: -50%;
  }

  .success{
    background-color: rgb(114, 225, 40);
    border: 1px solid rgb(114, 225, 40);

    &::after{
        position: absolute;
        content: "Bor";
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        font-family: Nunito sans;
    }
    
  }

  .cancel{
    background-color:  rgb(255, 77, 73);
    border: 1px solid rgb(255, 77, 73);

    &::after{
        position: absolute;
        content: "Yo'q";
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        font-family: Nunito sans;
    }
  }

  //radio

  .radio{
    margin-left: 50px;
  }
`;

export { DemoWrapper };
