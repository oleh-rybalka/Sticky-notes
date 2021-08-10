import styled from "styled-components"

export const StyledTextarea = styled.textarea`
  border-radius: 20px;
  padding: 10px 10px 0 10px;
  text-align: center;
  height: 200px;
  width: 400px;
  resize: none;
  margin-top: 20px;
`
export const ControlButtonsContainer = styled.div`
  display: flex;
  button {
    margin: 10px 10px -25px 10px;
    width: 150px;
    height: 40px;
    border: 1px solid red;
    background-color: white;
    color: red;
    border-radius: 25px;
  }
  button:hover {
    background-color: red;
    color: white;
  }
`
export const ModalMenuContainer = styled.div`
  position:relative;
  padding: 10px;
  width: 700px;
  height:500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  border: 1px solid black;
  background:white;
`
export const ColorContainer = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 30px 0;
  padding: 0;
`
export const ExitContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 50%;
  border: none;
  svg {
    transition: opacity 0.2s;
  }
  &:hover svg {
    opacity: 0.5;
  }
  button {
    border: 0;
    margin: 0;
    padding: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
`
export const StyledLi=styled.li<{color: string; selected : boolean}>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 5px;
    background-color: ${props=>props.color};
    border: 2px solid black;
    opacity:${props=>props.selected?'1':'0.5'};
`

export const ModalPage=styled.div`
   overflow: hidden;
    position: fixed;
left:0;
top:0;
width:100%;
height:100vh;
display: flex;
align-items:center;
justify-content: center;
&:before{
  z-index: 0;
    content: '';
    position: absolute;
    opacity: 0.9;
    width:100%;
height:100vh;
    background: black;
}
`