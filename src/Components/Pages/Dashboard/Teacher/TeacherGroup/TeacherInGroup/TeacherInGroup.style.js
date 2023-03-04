import styled from "styled-components";

const TeacherInGroupWrapper=styled.div`
    font-family: Azo Sans;

    h3{
        font-size: 28px;
        font-weight: 400;
        text-transform: uppercase;
        color: #212121;
    }

    .wrap{
        display: flex;
        gap: 30px;
        justify-content: space-between;
        
        .left{
            box-shadow: 0 3px 6px rgba(0,0,0,0.06), 0 3px 6px rgba(0,0,0,0.03);
            width: 25% !important;
            .top{
                padding: 20px;
                border-bottom: 1px solid rgba(159, 160, 184, 0.3);

                .grName{
                    
                }

                .courseName{
                    div{
                        display: flex;
                        span{
                            margin-right: 10px;
                        }
                    }
                }
            }

            .students{
                padding: 10px;
                ul{
                    padding: 0;

                    .student{
                        display: flex;
                        justify-content: space-between;
                    }

                    li{
                        display: flex;
                        align-items: center;
                        font-size: 13px;
                        font-weight: 400;
                        color: rgb(33, 33, 33, 0.4);
                        span{
                            margin: 0 5px 0 10px;
                            color: #39B329;
                            font-size: 20px;
                        }

                        p{
                            margin-bottom: 0;
                            margin-right: 10px;
                            color: rgb(33, 33, 33);
                        }
                    }
                }
            }
        }
        
        .right{
            width: 75%;
            box-shadow: 0 3px 6px rgba(0,0,0,0.06), 0 3px 6px rgba(0,0,0,0.03);
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
        font-family: Azo sans;

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


const DavomatWrapper=styled.div`
  padding: 15px;

  button{
    &:disabled {
          cursor: not-allowed !important;
          opacity: 0.8;
        }
  }


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
        background: #f5f5f7;
        border-radius: 6px 6px 0px 0px;
        border-bottom: 1px solid rgba(159, 160, 184, 0.3);
        padding: 5px 0;

        th.col {
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: start;
          text-align: center;
          font-family: "Azo sans";
          padding: 15px 12px 10px 20px;
        }
      }
    }

    tbody {
      background: #fff;
      tr {
        display: flex;
        /* border-bottom: 1px solid rgba(159, 160, 184, 0.3); */
        justify-content: space-between;

        td.col {
          font-style: normal;
          font-weight: 400;
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

        img {
          width: 50px;
          height: 50px;
        }

        .btns {
          width: 40%;
          display: flex;
          margin-left: 20px;
          justify-content: start;

          button {
            cursor: pointer;
            transition: 300ms;
            background: transparent;

            svg {
              fill: none;
              width: 20px;
              height: 20px;
              /* fill: rgb(253, 181, 40); */
            }
          }
        }
      }
    }
  }


  //radio style

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

  
`

const ImtihonWrapper=styled.div`
padding: 15px;
button{
    &:disabled {
          cursor: not-allowed !important;
          opacity: 0.8;
        }
  }


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
        background: #f5f5f7;
        border-radius: 6px 6px 0px 0px;
        border-bottom: 1px solid rgba(159, 160, 184, 0.3);
        padding: 5px 0;

        th.col {
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 24px;
          color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: start;
          text-align: center;
          font-family: "Azo sans";
          padding: 15px 12px 10px 20px;
        }
      }
    }

    tbody {
      background: #fff;
      tr {
        display: flex;
        /* border-bottom: 1px solid rgba(159, 160, 184, 0.3); */
        justify-content: space-between;

        td.col {
          font-style: normal;
          font-weight: 400;
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

        img {
          width: 50px;
          height: 50px;
        }

        .btns {
          width: 40%;
          display: flex;
          margin-left: 20px;
          justify-content: start;

          button {
            cursor: pointer;
            transition: 300ms;
            background: transparent;

            svg {
              fill: none;
              width: 20px;
              height: 20px;
              /* fill: rgb(253, 181, 40); */
            }
          }
        }
      }
    }
  }

`

export{TeacherInGroupWrapper, ModalHeader, ModalContent, DavomatWrapper, ImtihonWrapper}