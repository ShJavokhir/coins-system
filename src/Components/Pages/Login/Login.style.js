import styled from "styled-components";

const LoginWrapper = styled.div`
  /* background-image: url("images/loginBanner.jpg"); */
  background: rgb(29,84,141);
  background: linear-gradient(90deg, rgba(29,84,141,1) 0%, rgba(44,146,191,1) 48%, rgba(185,0,246,1) 100%);
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .main {
    position: relative;
    z-index: 33 !important;
    background-color: #fff;
    width: 50%;
    height: auto;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
    display: flex;
    align-items: center;

    .right{
      width: 50%;
      h4{
        color: #332e38;
        font-size: 32px;
    }

    form {
      .input {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        label {
          font-style: normal;
          font-family: "Inter";
          font-weight: 300;
          font-size: 20px;
          /* color: #000; */
          color: #70657b;;
          margin-bottom: 10px;
          text-align: start;
          width: 100%;
        }

        input {
          width: 100% !important;
          background: rgba(31, 60, 136, 0.05);
          border: 2px solid #000;
          border: 1px solid rgba(31, 60, 136, 0.2);
          border-radius: 24px;
          margin-bottom: 35px;
          padding: 15px;
          font-size: 1rem;
          font-weight: 600;
          font-family: "Inter";
        }
      }

      .loginBtn {
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 20px;
        padding: 15px 60px;
        color: #ffffff;
        background: #1f3c88;
        border-radius: 6px;
        border: none;
        height: 50px;
        cursor: pointer;
        margin: auto;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;

        &:disabled {
          cursor: not-allowed !important;
        }
      }
    }
    }

    .left{
      width: 50%;

      img{
        width: 100%;
        height: auto;
      }
    }
    
  }
`;

export { LoginWrapper };
