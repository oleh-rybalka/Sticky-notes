import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import CreateNoteMenu from './components/CreateNoteMenu'
import EditMenu from './components/EditMenu'
import Header from './components/Header'
import StickyNotesList from './components/StickyNotesList'
import { getNotes } from './services/NoteService'
import { selectAppState, setNotes } from './store/slices/appSlice'

const Root = styled.div<{ editorOpen: boolean }>`
  height: 100%;
  overflow-y: ${(props) => (props.editorOpen ? 'hidden' : 'auto')};
`

function App() {
  const dispatch = useDispatch()
  const appState = useSelector(selectAppState)
  const setNotesFunc = useCallback(async () => {
    const notes = await getNotes()
    dispatch(setNotes(notes))
  }, [dispatch])

  useEffect(() => {
    setNotesFunc()
  }, [setNotesFunc])
  return (
    <Root editorOpen={appState.showCreator || appState.editorState.show}>
      <Header />
      <StickyNotesList />
      {appState.editorState.show && <EditMenu />}
      {appState.showCreator && <CreateNoteMenu />}
    </Root>
  )
}

export default App
