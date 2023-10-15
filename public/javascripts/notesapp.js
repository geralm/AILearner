import NotesView from "./notesView.js";
import NotesAPI from "./notesAPI.js";
export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());
        
        this._refreshNotes();
    }
    async _refreshNotes() {
        const notes = await NotesAPI.getAllNotes();
        this._setNotes(notes);
        if(notes.length > 0){
            this._setActiveNoteId(notes[0].id);
        }
    }
    _setActiveNoteId(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }
    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    } 

    _handlers() {
        return {
            onNoteSelect: noteId => {
                console.log('Note select', noteId);
                // this._setActiveNote(noteId);
            },
            onNoteAdd : () => {
                console.log('Note add');
            },
            onNoteEdit: (newTitle, newBody) => {
                console.log('Note edit');
            },
            onNoteDelete: noteId => {
                console.log('Note delete', noteId);
            }
        };
    }

   

}
