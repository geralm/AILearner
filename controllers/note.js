const { use } = require('passport');
const Note = require('../models/note');
const User  = require('../models/user');
module.exports.getAllNotes = async (req, res) => {
    const userid = req.user._id;
    const notes = await Note.find({ author: userid }).lean();
    res.send(notes);
}
module.exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        const notes = await Note.find({ author: deletedNote.author }).lean();
        return res.send(notes);
    } catch (error) {
        return res.status(500).json({ message: "Error deleting note", error: error.message });
    }
}

module.exports.createNote = async(req, res) =>{
    const userID = req.user._id; 
    const noteTitle = req.body.title;
    const noteContent = req.body.content;
    // const userNotes = await User.findById(userID);
    const note = new Note({
        title: noteTitle,
        content: noteContent, 
        author: userID
    })
    await note.save();
    res.send(note);
}
module.exports.updateNote = async(req, res) =>{
    const noteId = req.params.id;
    const noteTitle = req.body.title;
    const noteContent = req.body.content;
    const note = await Note.findById(noteId);
    note.title = noteTitle;
    note.content = noteContent;
    await note.save();

    res.send(note);
}
