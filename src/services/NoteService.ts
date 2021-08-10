import { notes } from "../components/consts"

interface NoteProps{
    id: number
    text:string
    color: string
    favorite: boolean
    date: string
  }

export class NoteService{
    static getNotes(){
        return new Promise<NoteProps[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(notes);
            }, 1000)
        })
    }
}

export async function getNotes():Promise<NoteProps[]>{
    return await NoteService.getNotes()
}