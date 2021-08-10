import { ReactComponent as StarSvg } from '../../icons/star.svg'
import { ReactComponent as PencilSvg } from '../../icons/pencil.svg'
import { truncateThisString } from '../../utils'
import {
  BottomWrapper,
  StickyNoteContainer,
  StyledDate,
  StyledEditContainer,
  StyledFavContainer,
  StyledText,
  TopWrapper,
} from './styled'
import { FC } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { changeFavorite, openEditor } from '../../store/slices/appSlice'
import { useDispatch } from 'react-redux'
import { ItemTypes } from '../consts'

interface StickyNoteProps {
  id: string
  text: string
  moveNote: (id: string, to: number) => void
  findNote: (id: string) => { index: number }
  color: string
  favorite: boolean
  date: string
}
interface Item {
  id: string
  originalIndex: number
}
const StickyNote: FC<StickyNoteProps> = ({
  id,
  text,
  moveNote,
  findNote,
  color,
  favorite,
  date,
}) => {
  const originalIndex = findNote(id).index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.NOTE,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveNote(droppedId, originalIndex)
        }
      },
    }),
    [id, originalIndex, moveNote]
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.NOTE,
      canDrop: () => false,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findNote(id)
          moveNote(draggedId, overIndex)
        }
      },
    }),
    [findNote, moveNote]
  )

  const opacity = isDragging ? 0 : 1
  const dispatch = useDispatch()
  function markFavorite() {
    dispatch(changeFavorite({ id: parseInt(id) }))
  }
  function openEditorFunc() {
    dispatch(
      openEditor({
        text: truncateThisString(text),
        color: color,
        id: parseInt(id),
      })
    )
  }
  return (
    <StickyNoteContainer
      ref={(node) => drag(drop(node))}
      style={{ opacity }}
      draggable='true'
      color={color}
    >
      <TopWrapper>
        <StyledFavContainer active={favorite} onClick={markFavorite}>
          <StarSvg />
        </StyledFavContainer>
        <StyledText>{truncateThisString(text)}</StyledText>
      </TopWrapper>
      <BottomWrapper>
        <StyledDate>{date}</StyledDate>
        <StyledEditContainer onClick={openEditorFunc}>
          <PencilSvg />
        </StyledEditContainer>
      </BottomWrapper>
    </StickyNoteContainer>
  )
}
export default StickyNote
