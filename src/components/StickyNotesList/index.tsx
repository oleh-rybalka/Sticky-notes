import StickyNote from '../StickyNote'
import { useDrop } from 'react-dnd'
import { useCallback, useEffect, useState } from 'react'
import update from 'immutability-helper'
import { NoteProps, selectAppState } from '../../store/slices/appSlice'
import { useSelector } from 'react-redux'
import { StickyNotesContainer } from './styles'
import { ItemTypes } from '../consts'

const StickyNotesList = () => {
  const appState = useSelector(selectAppState)
  const [notes, setNotes] = useState<NoteProps[]>()
  const chooseNotes = useCallback(
    (noteType: string) => {
      if (noteType === 'default') {
        setNotes(appState.notes)
      } else {
        setNotes(appState.favNotes)
        console.log(appState.favNotes)
      }
    },
    [appState.favNotes, appState.notes]
  )

  useEffect(() => {
    chooseNotes(appState.notesType)
  }, [appState.notesType, chooseNotes])
  const findNote = useCallback(
    (id: string) => {
      const note = notes!.filter((n) => `${n.id}` === id)[0]
      return {
        note,
        index: notes!.indexOf(note),
      }
    },
    [notes]
  )

  const moveNote = useCallback(
    (id: string, atIndex: number) => {
      const { note, index } = findNote(id)
      setNotes(
        update(notes, {
          $splice: [
            [index, 1],
            [atIndex, 0, note],
          ],
        })
      )
    },
    [findNote, notes, setNotes]
  )
  const [, drop] = useDrop(() => ({ accept: ItemTypes.NOTE }))
  return (
    <StickyNotesContainer ref={drop}>
      {notes?.length ? (
        notes?.map((note) => (
          <StickyNote
            key={note.id}
            id={`${note.id}`}
            text={note.text}
            color={note.color}
            favorite={note.favorite}
            moveNote={moveNote}
            findNote={findNote}
            date={note.date}
          />
        ))
      ) : (
        <h1>There are no notes!</h1>
      )}
    </StickyNotesContainer>
  )
}

export default StickyNotesList
