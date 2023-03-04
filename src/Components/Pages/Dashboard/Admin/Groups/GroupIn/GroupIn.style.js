import styled from "styled-components";

const GroupInWrapper=styled.div`
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
            width: 35% !important;


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
            width: 65%;
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

export{GroupInWrapper, ModalHeader, ModalContent}