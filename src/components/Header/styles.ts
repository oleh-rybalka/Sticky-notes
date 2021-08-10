import styled from "styled-components"

export const LogoContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  transform: rotate(358deg);
  padding: 0 5px;
  margin: 10px 0;
  font-size: 10px;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
    transform: rotate(362deg);
  }
`
interface FavButtonProps {
  active: boolean
}
export const FavButton = styled.button<FavButtonProps>`
  cursor: pointer;
  width: 175px;
  height: 50px;
  border-radius: 25px;
  border: ${(props) =>
    props.active ? '2px solid lightgreen' : '2px solid white'};
  color: ${(props) => (props.active ? 'black' : 'white')};
  background-color: ${(props) => (props.active ? 'lightgreen' : 'transparent')};
  font-size: 25px;
  transition: 0.2s;
  &:hover {
    border: ${(props) =>
      props.active ? '2px solid lightgreen' : '2px solid black'};
    color: ${(props) => (props.active ? 'white' : 'black')};
  }
`
export const HeaderContainer = styled.header`
  background-color: #2196f3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  @media (max-width: 550px) {
      button{ 
          width:100px;
          height:40px;
          font-size:15px;
      }
  }
  @media (max-width: 400px) {
      button{ 
          width:100px;
          height:40px;
          font-size:15px;
      }
  }
`
export const AddButton = styled.button`
  cursor: pointer;
  width: 175px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid white;
  color: white;
  background-color: transparent;
  font-size: 25px;
  transition: 0.2s;

  &:hover {
    color: black;
    background-color: lightgreen;
    border: 2px solid lightgreen;
  }
`

export const ButtonContainer=styled.div`
display: flex;
button{
    margin:0 10px;
}

`
