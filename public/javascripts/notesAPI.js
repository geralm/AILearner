export default class NotesAPI {
    static getAllNotes() {
        return fetch('/note', {
            method: 'get'
        })
        .then(response => {
            if (response.status === 401) {
                window.location.href = '/login';
            }
    
            if (!response.ok) {
                throw new Error('Error in fetching notes');
            }
            
            return response.json();
        })
        .then(notes => notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)))
        .catch(error => {
            console.error('Error:', error);
            return []; // Devuelve un valor predeterminado en caso de error
        });
    }
    static async createNote(title, content){
        try{
            const response = await fetch(`/note`,{
                method: 'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title:title, content: content}),
                redirect : 'follow'
            })
            return this._resolvePromise(response);
        }catch(error){
            console.log("Error al crear notas")
            console.log(error)
        }
    }
    static async updateNote(noteToUpdate){
        
        try{
            const response = await fetch(`/note/${noteToUpdate._id}`,{
                method: 'put',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(noteToUpdate),
                redirect : 'follow'
            });
            return this._resolvePromise(response);
        }catch(error){
            console.log("Error al actualizar la nota")
            return error;
        }
    }

    static async deleteNotes(noteToDeleteId) {
        try {
            const response = await fetch(`/note/${noteToDeleteId}`, {
                method: 'DELETE'
            });
            return this._resolvePromise(response);
        } catch (error) {
            return console.log("Failed to delete notes")
        }
    }
    static async _resolvePromise(response){
        if(response.status === 401){
            window.location.href = '/login';
        }
        if(response.status === 200){
            return response.json();
        }else{
            throw new Error('Error, algo sucedió mal');
        }
    }
}
