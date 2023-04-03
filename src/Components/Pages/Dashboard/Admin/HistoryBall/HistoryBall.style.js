import styled from "styled-components";

const HistoryBallWrapper=styled.div`
.top{
    display: flex;
    align-items: center;

    h3{
        margin: 0;
        font-family: "Azo sans";
        margin-right: 100px;
    }

    .select{
        width: 30%;
    }
}
.table{
    margin-top: 20px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.06), 0 3px 6px rgba(0,0,0,0.03);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* box-shadow: rgb(20 21 33 / 18%) 0px 2px 10px 0px; */

    thead{
      width: 100%;
      tr{
        display: flex;
        background: #006786;
        border-radius: 6px 6px 0px 0px;
        border-bottom: 1px solid rgba(159, 160, 184, 0.3);
        /* padding: 5px 0; */
        
        th.col{
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

    tbody{
      background: #fff;
      height: 50vh;
    overflow-y: scroll;
      tr{
        display: flex;
        /* border-bottom: 1px solid rgba(159, 160, 184, 0.3); */
        justify-content: space-between;
        
        td.col {
          font-style: normal;
          font-weight: 600;
          font-size: 15px;
          height: 50px;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: start;
          color: rgba(0, 0, 0, 0.7);
          font-family: "Azo sans";
          /* padding: 5px; */
          
        }


        img{
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

export{HistoryBallWrapper}