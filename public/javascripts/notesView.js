export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add">Add Note</button>
                <div class="notes__list"></div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="New note...">
                <textarea class="notes__body" placeholder="Start writing..."></textarea>
            </div>
        `;
        this.btnAddNote = this.root.querySelector('.notes__add');
        this.btnAddNote.addEventListener('click', () => {
            this.onNoteAdd(); //when the user clicks on the add button
        });
        this.noteList = this.root.querySelector('.notes__list');
        this.notePreview = this.root.querySelector('.notes__preview');
        const noteTitle = this.root.querySelector('.notes__title');
        const noteBody = this.root.querySelector('.notes__body');
        [noteTitle, noteBody].forEach(elem => {
            elem.addEventListener('blur', () => { //when the user clicks outside of the input field
                const updatedTitle = noteTitle.value.trim();
                const updatedBody = noteBody.value.trim();
                // update the note
                this.onNoteEdit(updatedTitle, updatedBody);
                // this.updateNote();
            });
        });

        this.updateNotePreviewVisibility(false); //hide the note preview by default because there is no note selected
    }
    //Is a private method because has a underscore in the beginning
    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;
        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? '...' : '' /*if overflow lenght*/ } 
                    </div>
                <div class="notes__small-updated">${updated.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}</div>
            </div>
        `;
    }
    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector('.notes__list');
        notesListContainer.innerHTML = '';
        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.content, new Date(note.created_at));
            notesListContainer.insertAdjacentHTML('beforeend', html);
        }
        //Setup the click handler for each note in the list
        notesListContainer.querySelectorAll('.notes__list-item').forEach(noteListItem => {
            noteListItem.addEventListener('click', () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });
            noteListItem.addEventListener('dblclick', () => {
                if (window.confirm('Are you sure you want to delete this note?')) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });

        });
    }
    updateActiveNote(note){
        this.root.querySelector('.notes__title').value = note.title;
        this.root.querySelector('.notes__body').value = note.body;
        //Update the active note in the list of notes
        this.root.querySelectorAll('.notes__list-item').forEach(noteListItem => {
            noteListItem.classList.remove('notes__list-item--selected');
            
        });
        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add('notes__list-item--selected');
    }
    updateNotePreviewVisibility(visible){ // true or false for visible or not visible the note preview
        this.root.querySelector('.notes__preview').style.visibility = visible ? 'visible' : 'hidden';
    }
}
