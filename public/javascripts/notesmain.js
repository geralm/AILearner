import NotesView from './notesView.js';
import NotesAPI from './notesAPI.js';
//This is the entry point of the application 
//This is where we create the NotesView instance to render the UI
const app  = document.getElementById('roomnotes');
// console.log(NotesAPI.getAllNotes());
const urlParams = new URLSearchParams(window.location.search);

// Obtiene el valor del parámetro "chatroomid"
const chatroomid = urlParams.get("chatroomid");

// Verifica si se encontró un valor
if (chatroomid) {
  console.log("El valor de chatroomid es: " + chatroomid);
} else {
  console.log("El parámetro chatroomid no se encontró en la URL.");
}
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
