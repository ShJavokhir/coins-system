import styled from "styled-components";

const TransactionWrapper = styled.div`
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Azo sans;
    svg {
      width: 20px;
      height: 20px;
      margin-left: 10px;
      margin-top: -3px;
      fill: #fedf43;
    }
  }

  h3{
    font-family: Azo sans;
  }

  .cards{
    margin-bottom: 30px;
    display: flex;
    gap: 20px;
    .card{
      width: 25%;
      padding: 20px;
      /* background: rgb(161,204,215, 0.5); */
      /* border: 1px solid #e7e8ed; */
      box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06),
        0 1px 4px rgba(0, 0, 0, 0.08);
      transition: 300ms;
      border: none;
      
      &:hover{
        /* background: rgb(161,204,215, 0.8); */
        /* box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06),
        0 1px 4px rgba(0, 0, 0, 0.08); */
      }
      img{
        width: 20%;
        margin: auto;
        margin-bottom: 20px;
      }
    }
  }

  form {
    background: #fff;
    font-family: "Azo Sans";
    width: 30%;

    .label {
      width: 100%;
      display: block;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      margin-bottom: 20px;
      font-family: Azo sans;

      span.label-text {
        font-style: normal;
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 18px;
        color: #000000;
        margin-bottom: 8px;
      }

      input {
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 16px;
        color: #000000;
        border-radius: 6px;
        padding: 10px 10px;
      }

    }

      button {
        width: 100%;
        text-align: center;
        font-style: normal;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 18px;
        border-radius: 4px;
        padding: 12px 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Azo sans;

        &:disabled {
          cursor: not-allowed;
          opacity: 0.8;
        }
      }
  }
`;

export { TransactionWrapper };
