import App from './notesapp.js';

//This is the entry point of the application 
//This is where we create the NotesView instance to render the UI
const root  = document.getElementById('roomnotes');
const app = new App(root);

