export default class NotesAPI {
    static async getAllNotes() {
        try {
            const response = await fetch('/note', {
                method: 'get'
            });

            if (response.status === 401) {
                window.location.href = '/login';
            }

            if (!response.ok) {
                throw new Error('Error in fetching notes');
            }

            const notes = await response.json();

            return notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        } catch (error) {
            return []; // Devuelve un valor predeterminado en caso de error
        }
    }

    static async saveNotes(noteToSave, chatroomid) {
        try {
            const notes = await NotesAPI.getAllNotes();

            notes.push(noteToSave);
            const data = {chat: chatroomid, notes: notes};
            const response = await fetch(`/note`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data) ,
                redirect: 'follow',
            });

            if (response.status === 401) {
                window.location.href = '/login';
            }

            if (!response.ok) {
                throw new Error('Error in saving notes');
            }

            return response.json();
        } catch (error) {
            return console.log("Failed to save notes") // Re-lanza el error para que pueda ser manejado en otro lugar si es necesario
        }
    }

    static async deleteNotes(noteToDelete) {
        try {
            const response = await fetch(`/note${noteToDelete._id}`, {
                method: 'DELETE'
            });

            if (response.status === 401) {
                window.location.href = '/login';
            }

            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Error al eliminar la nota');
            }
        } catch (error) {
            return console.log("Failed to delete notes")
        }
    }
}
