import styled from "styled-components";

const CreateLessonWrapper=styled.div`
h3 {
    font-family: Azo sans;
  }
span {
    font-family: Azo sans;
    color: red;
  }
  input{
    width: 80%;
    margin-bottom: 30px;
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

  .wrap {
    display: flex;
    .left {
      padding: 20px;
      width: 50%;
      .label {
        width: 80%;
        margin-bottom: 30px;

        label{
          margin-bottom: 20px;
        }
      }

      .radio {
        margin-left: 50px;
      }
    }

    .right {
      width: 50%;
      border-radius: 4px;
      padding: 20px;
      p {
        h3 {
          font-family: Azo sans;
        }
      }
    }
  }
`

export{CreateLessonWrapper}