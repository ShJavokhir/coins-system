import styled from "styled-components";

const TransferWrapper = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    h3 {
      font-family: Azo sans;
    }

    a {
      font-family: "Azo sans";
      color: "#fff";
      background: "#006786";
    }
  }

  .label {
    display: flex;
    align-items: flex-start !important;

    .sel {
      width: 35%;
      margin-bottom: 20px;

      .table {
        width: 100%;
        padding: 30px;
        height: auto;
        border: 1px solid #e5e5e5;
        border-radius: 5px;
        margin-top: 30px;

        .item {
          font-family: Azo sans;
        }
      }
    }
  }

  .transferBtn {
    width: 20%;
  }

  .ant-transfer-list {
    height: auto;
  }
`;

export { TransferWrapper };
