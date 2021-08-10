import styled from "styled-components"

interface StickyNoteProps{
  color: string
}
interface FavContainerProps{ 
  active:boolean
}
export const StickyNoteContainer = styled.div<StickyNoteProps>`
  background-color: ${props=>props.color};
  
  color: black;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const StyledText = styled.span`
  word-wrap: break-word;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const StyledDate = styled.div``
export const StyledFavContainer = styled.div<FavContainerProps>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  clear: both;
  background-color: black;
  svg {
    width: 50%;
    height: 50%;
    fill: ${props=>props.active?'yellow':'grey'};
    transition: 0.2s;
  }
  
`
export const TopWrapper = styled.div`
  max-height: 73%;
  overflow: hidden;
  padding: 10px 10px 0 10px;
`
export const StyledEditContainer = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  svg {
    width: 50%;
    height: 50%;
    fill: white;
    transition: 0.2s;
  }
  &:hover svg {
    fill: black;
  }
  &:hover {
    background-color: white;
  }
`
export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px 5px 10px;
  align-items: center;
`