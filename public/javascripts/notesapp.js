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
        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }
    _setActiveNote(note) {
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
                const selectedNote = this.notes.find(note => note._id === noteId);
                this._setActiveNote(selectedNote);
                // this._setActiveNote(noteId);
            },
            onNoteAdd: () => {
                NotesAPI.createNote("title", "write something here...");
                this._refreshNotes();
            },
            onNoteEdit: (newTitle, newBody) => {
                NotesAPI.updateNote({
                    _id: this.activeNote._id,
                    title: newTitle,
                    content: newBody
                });
                this._refreshNotes();
            },
            onNoteDelete: noteId => {
                NotesAPI.deleteNotes(noteId);
                this._refreshNotes();
            }
        };
    }



}
