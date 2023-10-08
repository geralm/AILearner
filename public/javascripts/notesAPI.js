export default class NotesAPI{
    static getAllNotes(){
        return fetch('/api/notes').then(response => response.json());
    }
    static saveNotes(note){
        return fetch('/api/notes',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        }).then(response => response.json());
    }
    static deleteNotes(noteId){
        return fetch(`/api/notes/${noteId}`,{
            method: 'delete'
        }).then(response => response.json());
    }
}