import styled from "styled-components";

const ProductAddWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .left {
    width: 40%;
    height: calc(100vh - 200px);

    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }
    form {
      display: flex;
      flex-direction: column;
      width: 100%;

      input {
        width: 100%;
        border: 1px solid #000;
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 16px;
        color: #000000;
        border-radius: 6px;
        padding: 3px;
      }
      .select {
        width: 100%;
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 20px;
        color: #000000;
        border: 1px solid #000 !important;
        font-family: Azo sans !important;
      }

      button {
        width: 100%;
        font-size: 0.875rem;
        line-height: 18px;
        font-weight: 600;
        padding: 12px 30px;
        background-color: #1f3c88;
        font-family: Azo Sans !important;
        color: #fff;
        border-radius: 6px;
        cursor: pointer;
        border: 1px solid transparent;

        &:disabled {
          cursor: not-allowed;
        }
      }
    }
  }

  .right {
    width: 50%;

    img {
      width: 100%;
      height: 400px;
      object-fit: contain;
    }
  }
`;

const ProductWrapper = styled.div`
  ul {
    padding: 0 !important;
    li {
      list-style: none;
      margin-bottom: 10px;
      font-family: Azo sans;
      cursor: pointer;

      button {
        background: transparent;
        border: none;
        color: #000;
      }
    }
  }
  display: flex;
  .wrap {
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    font-family: Azo sans;
    transform: translateX(30%);
    height: 75vh;
      overflow-y: scroll;

    .cardOut {
      width: 25%;
      padding: 15px;

      .price {
        display: flex;
        align-items: center;

        svg {
          width: 20px;
          height: 20px;
          margin-left: 5px;
          margin-top: -3px;
          fill: #fedf43;
        }
      }

      .card {
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px;
        img {
          width: 100%;
          height: 200px;
          object-fit: contain;
        }
        .title {
          font-size: 20px;
        }
        .btn {
          padding: 15px;
          button {
            width: 100%;
            font-size: 0.875rem;
            line-height: 18px;
            font-weight: 600;
            padding: 12px 30px;
            background-color: rgb(255, 77, 73);
            font-family: Azo Sans !important;
            color: #fff;
            border-radius: 6px;
            cursor: pointer;
            border: 1px solid transparent;
          }
        }
      }
    }
  }

  form {
    position: fixed;
    width: 20%;
    label {
      text-transform: uppercase;
      font-size: 24px;
    }
  }

  @keyframes spin {
    0% {
      width: 20px;
      box-shadow: 0 0 0 #120e08;
      animation-timing-function: ease-in;
    }

    49.999% {
      width: 0.1rem;
      box-shadow: 0.05rem 0 0 #896c3b, 0.1rem 0 0 #896c3b, 0.15rem 0 0 #896c3b,
        0.2rem 0 0 #896c3b, 0.25rem 0 0 #896c3b, 0.3rem 0 0 #896c3b,
        0.35rem 0 0 #896c3b, 0.4rem 0 0 #896c3b, 0.45rem 0 0 #896c3b,
        0.5rem 0 0 #896c3b, 0.55rem 0 0 #896c3b, 0.6rem 0 0 #896c3b,
        0.65rem 0 0 #896c3b, 0.7rem 0 0 #896c3b, 0.75rem 0 0 #896c3b;
      transform: translateX(-0.375rem);
      background-color: #111;
      animation-timing-function: linear;
    }

    50.001% {
      width: 0.1rem;
      box-shadow: -0.05rem 0 0 #896c3b, -0.1rem 0 0 #896c3b,
        -0.15rem 0 0 #896c3b, -0.2rem 0 0 #896c3b, -0.25rem 0 0 #896c3b,
        -0.3rem 0 0 #896c3b, -0.35rem 0 0 #896c3b, -0.4rem 0 0 #896c3b,
        -0.45rem 0 0 #896c3b, -0.5rem 0 0 #896c3b, -0.55rem 0 0 #896c3b,
        -0.6rem 0 0 #896c3b, -0.65rem 0 0 #896c3b, -0.7rem 0 0 #896c3b,
        -0.75rem 0 0 #896c3b;
      transform: translateX(0.375rem);
      background-color: #111;
      animation-timing-function: ease-out;
    }

    100% {
      width: 20px;
      box-shadow: 0 0 0 #120e08;
    }
  }
`;

const OrderListWrapper = styled.div`
  .table {
    margin-top: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06), 0 3px 6px rgba(0, 0, 0, 0.03);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* box-shadow: rgb(20 21 33 / 18%) 0px 2px 10px 0px; */

    thead {
      width: 100%;
      tr {
        display: flex;
        background: #006786;
        border-radius: 6px 6px 0px 0px;
        border-bottom: 1px solid rgba(159, 160, 184, 0.3);

        th.col {
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 24px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: start;
          text-align: center;
          font-family: "Azo sans";
          padding: 15px 12px 10px 10px;
        }
      }
    }

    tbody {
      height: 55vh;
      overflow-y: scroll;
      background: #fff;
      tr {
        display: flex;
        /* border-bottom: 1px solid rgba(159, 160, 184, 0.3); */
        justify-content: space-between;

        td.col {
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: start;
          color: rgba(0, 0, 0, 0.7);
          text-align: center;
          font-family: "Azo sans";
          padding: 5px;
        }

        button {
          &:disabled {
            cursor: not-allowed !important;
            opacity: 0.8;
          }
        }
      }
    }
  }
`;
const ModalHeader = styled.header`
  background: #fff;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f6f8;
  padding: 20px 20px 5px 20px;

  h2.title {
    margin-bottom: 0;
    font-size: 25px !important;
  }

  svg {
    height: 20px;
    width: 20px;
    color: #000;
  }

  button.closeSvg {
    background: transparent;
    border: none;
  }
`;

const ModalContent = styled.div`
  border-bottom: 1px solid #f5f6f8;
  background: #fff;
  padding: 20px;

  form {
    background: #fff;
    font-family: "Azo Sans";

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

      span.err-text {
        color: red !important;
        position: absolute;
        left: 0;
        top: 70px;
      }

      .select {
        font-style: normal;
        font-weight: 400;
        font-size: 1rem;
        line-height: 20px;
        color: #000000;
        border: 1px solid #000 !important;
        font-family: Azo sans !important;
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

export {
  ProductAddWrapper,
  ModalContent,
  ModalHeader,
  ProductWrapper,
  OrderListWrapper,
};
