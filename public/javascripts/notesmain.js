import App from './notesapp.js';

//This is the entry point of the application 
//This is where we create the NotesView instance to render the UI
const root  = document.getElementById('roomnotes');
const app = new App(root);

// console.log(NotesAPI.getAllNotes());

// 652c2100089e0a6e15082847
// console.log(NotesAPI.deleteNotes("652c2100089e0a6e15082847")
// Verifica si se encontró un valor

// console.log(NotesAPI.saveNotes({title: "Hello", body: "World"}),);
// const view = new NotesView(app,{
//     onNoteAdd(){
//         console.log('Note add');
//     },
//     onNoteSelect(id){
//         console.log('Note select',id);
//     },
//     onNoteDelete(id){
//         console.log('Note delete',id);
//     },
//     onNoteEdit(newTitle,newBody){
//         console.log('Note edit');
//     }
// });
// const notes = NotesAPI.getAllNotes();
// view.updateNoteList(notes);
// view.updateActiveNote(notes[0]);
