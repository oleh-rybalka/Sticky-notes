import { useDispatch, useSelector } from 'react-redux'
import {
  changeColor,
  changeNotesType,
  openCreator,
  selectAppState,
} from '../../store/slices/appSlice'
import {
  HeaderContainer,
  LogoContainer,
  FavButton,
  AddButton,
  ButtonContainer,
} from './styles'

const Header = () => {
  const appState = useSelector(selectAppState)
  const dispatch = useDispatch()
  function showOrHideFav() {
    dispatch(changeNotesType())
  }
  function openCreateNote() {
    dispatch(changeColor({ color: '#f8c97b' }))
    dispatch(openCreator())
  }
  return (
    <HeaderContainer>
      <LogoContainer>
        <h1>Sticky notes</h1>
      </LogoContainer>
      <ButtonContainer>
        <FavButton
          active={appState.notesType === 'favorite'}
          onClick={showOrHideFav}
        >
          {appState.notesType === 'favorite'
            ? 'Hide favorite'
            : 'Show favorite'}
        </FavButton>
        <AddButton onClick={openCreateNote}>Add note</AddButton>
      </ButtonContainer>
    </HeaderContainer>
  )
}
export default Header
