import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import dayjs from 'dayjs';

export interface NoteProps{
  id: number
  text:string
  color: string
  favorite: boolean
  date: string
}

export interface AppState {
  notesType:string
  color:string
  editorState:EditorStateProps
  notes:NoteProps[]
  favNotes:NoteProps[]
  showCreator: boolean
}
export interface EditorStateProps{
show:boolean
text:string 
id:number
}
const initialState: AppState = {
  notesType:'default',
  color: '#f8c97b',

  showCreator: false,
  editorState:{ 
    show:false,
    text: '',
    id:0,
    
  },

  notes:[],
favNotes:[]
};

export const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    createNote: (state, action:PayloadAction<{text:string, color:string}>) => {
      state.notes.push({
        text: action.payload.text,
        color: action.payload.color,
        id: Date.now(),
        favorite:false,
        date: dayjs().format('MMM D, YYYY')
      }
      )
    },
    deleteNote: (state, action:PayloadAction<{id:number}>) => {
      console.log(state)
      state.notes=state.notes.filter(note=>note.id!==action.payload.id)
    },
    saveNote: (state, action:PayloadAction<{id:number, newNote:{color:string, text:string}}>) => {  
      state.notes=state.notes.map(note=> {
       if (note.id !== action.payload.id) return note
       else return {
         ...note,
         text: action.payload.newNote.text,
         color: action.payload.newNote.color
       }
     })
    },
   openEditor:(state, action:PayloadAction<{ color: string; text: string, id:number}>) => {
    state.editorState.show=true
    state.color=action.payload.color
    state.editorState.text=action.payload.text
    state.editorState.id=action.payload.id
   },
   closeEditor:(state)=>{
    state.editorState.show=false
  },
  changeColor:(state, action:PayloadAction<{ color: string}>)=>{
    state.color=action.payload.color
  },
  changeFavorite:(state, action:PayloadAction<{id: number}>)=>{
    state.notes=state.notes.map(note=> {
      if (note.id !== action.payload.id) return note
      else {
        if(!note.favorite){
          state.favNotes.push({...note, favorite:true})
        }
        else{
          state.favNotes=state.favNotes.filter(favNote=>favNote.id !== action.payload.id)
        }
        return {
          ...note,
          favorite: !note.favorite,
        }
      }
      
      
    })
  },
  closeCreator:(state)=>{
    state.showCreator=false
  },
  openCreator:(state)=>{
    state.showCreator=true
  },
  changeNotesType:(state)=>{
    if(state.notesType==='default'){
      state.notesType='favorite'
    }else{
      state.notesType='default'
    }
  },
  setNotes(state, action:PayloadAction<NoteProps[]>){

    state.notes=[...action.payload]
    state.notes.forEach((note)=>{
      if(note.favorite===true) state.favNotes.push({...note})
    })
  }
  },
  
  
});

export const { createNote, deleteNote,openEditor,closeEditor, changeColor,saveNote, changeFavorite, openCreator, closeCreator, changeNotesType, setNotes} = appSlice.actions;
export const selectNotes= (state: RootState) => state.app.notes;
export const selectEditorState= (state: RootState) => state.app.editorState;
export const selectCreatorState= (state: RootState) => state.app.showCreator
export const selectAppState=(state: RootState) => state.app
export const selectFavNotes=(state: RootState) => state.app.favNotes
export const selectNotesType= (state: RootState) => state.app.notesType
export default appSlice.reducer;
