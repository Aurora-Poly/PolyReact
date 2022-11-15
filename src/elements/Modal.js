import React from 'react';
import styled, {keyframes} from "styled-components";

function Modal(props){
    const { open, submit, close, header, is_detail, width, height, margin } = props;
    const openModal = {
      display: "flex",
      aligItems: "center"
    };

    const generalmodal = {
      display: "none",
      position: "fixed",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      zIndex: "99",
      backgroundColor: "rgba(0, 0, 0, 0.6)"
    }

    if(is_detail){ //포트폴리오 상세 모달
      return(
        <ModalContainer style={open ? openModal : generalmodal }>
      {open ? (
        <ModalSection width={width} height={height} margin={margin}>
          <ModalHeader>
            {header} &nbsp;
            <ModalButton className="close" onClick={close}>
              &times;
            </ModalButton>
          </ModalHeader>
          <ModalMain>{props.children}</ModalMain>
          <ModalFooter>
            <ModalButton className="modify">
              수정
            </ModalButton>
            <button className="close" onClick={submit}>
              저장
            </button>
          </ModalFooter>
        </ModalSection>
      ) : null}
    </ModalContainer>
      );
    }
  
    return (
        <ModalContainer style={open ? openModal : generalmodal }>
      {open ? (
        <ModalSection height={height} margin={margin}>

          {/* 모달 헤더 */}
          <ModalHeader>
            {header} &nbsp;
            <CloseButton className="close" onClick={close}>
              <span>x</span>
            </CloseButton>
          </ModalHeader>

          {/* 모달 컨텐츠 */}
          <ModalMain>
            {props.children}
          </ModalMain>

          {/* 모달 푸터 */}
          <ModalFooter>
            <ModalButton className="close" onClick={submit}>
              저장
            </ModalButton>
          </ModalFooter>

        </ModalSection>
      ) : null}
    </ModalContainer>
    )
}

const ModalContainer = styled.div`
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
`;

const ModalSection = styled.div`
    max-width: 770px;
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    margin: ${(props)=>props.margin};
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    /* overflow: hidden; */
`;

const ModalHeader = styled.div`
    position: relative;
    padding: 16px;
    color: #343a40;
    margin-left: 10px;
    font-weight: 800;
    font-size: 18px;
    text-align: left;
`;

const CloseButton = styled.button`
    outline: 0;
    border: 0;
    background-color: transparent;
    font-size: 20px;
    float: right;
    margin-right: 10px;
    color: rgb(113,136,208);
    cursor: pointer;
`;

const ModalButton = styled.button`
    width: 90%;
    height: 45px;
    outline: 0;
    border: 0;
    border-radius: 10px;
    background: #54d498; 
    color: #fff;
    cursor: pointer;
`;

const ModalMain = styled.main`
  padding: 0 16px 16px 16px;
  background-color: #fff;
`;

const ModalFooter = styled.div`
  text-align: center;
  padding-bottom: 16px;
`;

// const slidetop = keyframes`
//   0% {
//     transform: translateY(0);
//   }
//   100% {
//     transform: translateY(-100px);
//   }
// `;


export default Modal;