import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeColor,
  closeCreator,
  createNote,
  selectAppState,
} from '../../store/slices/appSlice'

import { ReactComponent as ExitSvg } from '../../icons/exit.svg'
import {
  ColorContainer,
  ControlButtonsContainer,
  ExitContainer,
  ModalMenuContainer,
  ModalPage,
  StyledLi,
  StyledTextarea,
} from '../modalStyles'

const CreateNoteMenu = () => {
  const dispatch = useDispatch()
  const [noteText, setNoteText] = useState('')
  const appState = useSelector(selectAppState)
  function colorSwitchFunc(color: string) {
    dispatch(changeColor({ color: color }))
  }
  function creatorCloseFunc() {
    dispatch(closeCreator())
  }

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNoteText(e.target.value)
  }
  const noteCreateFunc = useCallback(() => {
    if (noteText.trim()) {
      dispatch(
        createNote({
          text: noteText,
          color: appState.color,
        })
      )
      dispatch(closeCreator())
    } else alert('You have to write your note!')
  }, [appState.color, dispatch, noteText])

  const colors = [
    '#f8c97b',
    '#f49479',
    '#e4f598',
    '#7986cb',
    '#80deea',
    '#f48fb1',
    '#e6ee9c',
  ].map((item, i) => (
    <StyledLi
      onClick={() => colorSwitchFunc(item)}
      color={item}
      selected={item === appState.color}
      key={i}
    ></StyledLi>
  ))
  return (
    <ModalPage>
      <ModalMenuContainer>
        <ExitContainer>
          <button
            onClick={() => {
              creatorCloseFunc()
            }}
          >
            <ExitSvg />
          </button>
        </ExitContainer>
        <div>Pick your note color:</div>
        <ColorContainer>{colors}</ColorContainer>
        <div>Write your note:</div>
        <StyledTextarea defaultValue='' onChange={(e) => changeHandler(e)} />
        <ControlButtonsContainer>
          <button
            onClick={() => {
              noteCreateFunc()
            }}
          >
            Create
          </button>
        </ControlButtonsContainer>
      </ModalMenuContainer>
    </ModalPage>
  )
}
export default CreateNoteMenu
