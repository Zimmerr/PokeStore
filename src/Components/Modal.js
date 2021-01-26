import React from 'react'
import styled from 'styled-components'

const StyledModal = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  -webkit-transition: opacity 0.5s ease-out;
  -moz-transition: opacity 0.5s ease-out;
  transition: opacity 0.5s ease-out;
  //pooutter-events: none;

`

const ModalContent = styled.section`
  position:fixed;
  background: white;
  width: 80%;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  

  button {
    position: absolute;
    width: 30px;
    right: -15px;
    top: -20px;
    text-align: center;
    line-height: 30px;
    margin-top: 5px;
    background: ${props => props.theme.buttonColor};
    border-radius: 50%;
    border: none;
    font-size: 16px;
    color: white;
    box-shadow: 2px 2px 3px #999;
  }
`;

const Modal = React.forwardRef(({ handleClose, children }, ref) => {
  return (
    <StyledModal ref={ref}>
      <ModalContent>
        {children}
        <button type="button" onClick={handleClose}>
          X
        </button>
      </ModalContent>
    </StyledModal>
  );
});

export default Modal;