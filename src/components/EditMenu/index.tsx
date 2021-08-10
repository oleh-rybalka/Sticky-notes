import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as ExitSvg } from '../../icons/exit.svg'
import {
  changeColor,
  closeEditor,
  deleteNote,
  saveNote,
  selectAppState,
  selectEditorState,
} from '../../store/slices/appSlice'
import { colors } from '../consts'
import {
  ColorContainer,
  ControlButtonsContainer,
  ExitContainer,
  ModalMenuContainer,
  ModalPage,
  StyledLi,
  StyledTextarea,
} from '../modalStyles'

const EditMenu = () => {
  const editorState = useSelector(selectEditorState)
  const [noteText, setNoteText] = useState(editorState.text)
  const dispatch = useDispatch()
  const appState = useSelector(selectAppState)
  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNoteText(e.target.value)
  }
  function editorClose() {
    dispatch(closeEditor())
  }
  const liColors = colors.map((item, i) => (
    <StyledLi
      onClick={() => dispatch(changeColor({ color: item }))}
      color={item}
      selected={item === appState.color}
      key={i}
    ></StyledLi>
  ))
  function deletehandler() {
    dispatch(deleteNote({ id: editorState.id }))
    dispatch(closeEditor())
  }
  const saveNoteFunc = useCallback(() => {
    dispatch(
      saveNote({
        id: editorState.id,
        newNote: { color: appState.color, text: noteText },
      })
    )
    dispatch(closeEditor())
  }, [appState.color, dispatch, editorState.id, noteText])
  return (
    <ModalPage>
      <ModalMenuContainer>
        <ExitContainer>
          <button onClick={editorClose}>
            <ExitSvg />
          </button>
        </ExitContainer>
        <div>Pick your note color:</div>
        <ColorContainer>{liColors}</ColorContainer>
        <div>Edit your note:</div>
        <StyledTextarea
          defaultValue={editorState.text}
          onChange={(e) => changeHandler(e)}
        />
        <ControlButtonsContainer>
          <button
            onClick={() => {
              saveNoteFunc()
            }}
          >
            Save
          </button>
          <button onClick={deletehandler}>Delete</button>
        </ControlButtonsContainer>
      </ModalMenuContainer>
    </ModalPage>
  )
}
export default EditMenu
