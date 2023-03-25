import styled from "styled-components";

const StatistikaWrapper = styled.div`
  svg {
    width: 50px;
    height: 50px;
    stroke: #006786 !important;
    fill: #006786;
  }

  .cards {
    display: flex;
    gap: 30px;
    .kart {
      text-align: center;
      width: 25%;
      display: flex !important;
      padding: 20px;
      border-radius: 10px;
      transition: 300ms;
      border: 1px solid #e7e8ed;

      &:hover{
        box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.06),
        0 1px 4px rgba(0, 0, 0, 0.08);
      }

      .left{
        width: 30%;
      }

      .right{
        width: 70%;
        display: flex;
        flex-direction: column;
        span{
          font-size: 22px;
          font-weight: 700;
          color: #006786;
        }
      }
    }
  }
`;

export { StatistikaWrapper };
