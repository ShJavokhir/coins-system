import styled from "styled-components";

const Wrapper=styled.div`
display: flex;

  .layout__sidebar {
    flex-shrink: 0;
    width: 120px;
    border-right: 1px solid rgba(31, 60, 136, 0.2);
  /* box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 14%); */

  }
  
  .layout__top {
    border-bottom: 1px solid rgba(31, 60, 136, 0.2);
    position: absolute;
    top: 0;
    left: 120px;
    width: calc(100% - 120px);
  /* box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 14%); */
  

  }
  
  .layout__main {
    margin-top: 75px;
    height: calc(100vh - 100px);
    overflow-y: auto;
    padding: 15px;
    &::-webkit-scrollbar-track {
      /* -webkit-box-shadow: inset 0 0 6px rgba(187, 187, 187, 0.3); */
      background-color: #c4bebe;
    }
    &::-webkit-scrollbar {
      width: 8px;
      background-color: #F5F5F5;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #838383;
    }
  }
  
  .layout__right {
    flex-grow: 1;
  }

  
  /* @media(max-width: 992px){
    .layout__top{
      left: 0;
      width: 100%;
    }
  }  */
`

export{Wrapper}