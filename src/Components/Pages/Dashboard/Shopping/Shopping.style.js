import styled from "styled-components";

const ShoppingWrapper=styled.div`
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

    .cardOut {
      width: 25%;
      padding: 15px 10px;

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
        padding: 15px 10px;
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

`

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
`


const ModalContent = styled.div`
  border-bottom: 1px solid #f5f6f8;
  background: #fff;

  form {
    background: #fff;
    font-family: "Inter";

    svg {
          width: 20px;
          height: 20px;
          margin-left: 5px;
          margin-top: -3px;
          fill: #FEDF43;
        }

    .counter{
      margin-left: 40px;
      width: 30%;
      display: flex;
      justify-content: space-between;
      border: 1px solid rgb(0, 0, 0, 0.3);
      span{
        width: 100%;
        text-align: center;
      }
      .countBtn{
        cursor: pointer;
        background-color: rgb(0, 0, 0, 0.3);
      }
    }

    .label {
      width: 100%;
      display: block;
      position: relative;
      display: flex;
      position: relative;
      margin-bottom: 20px;
      font-family: Azo sans;

      span {
        font-style: normal;
        font-weight: 400;
        color: #000000;
        display: flex;
        text-align: center;
        justify-content: center;
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

`

export{ShoppingWrapper, ModalHeader, ModalContent}