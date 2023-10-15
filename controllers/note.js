const { use } = require('passport');
const Note = require('../models/note');

module.exports.getAllNotes = async (req, res) => {
    const userid = req.user._id;
    const notes = await Note.find({ author: userid }).lean();
    console.log(req.user._id)
    console.log(notes);
    res.send(notes);
}
module.exports.getOneNote = async (req, res) => {
    //TODO: render one note logic
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
module.exports.saveNotes = async (req, res) => {
    const userid = req.user._id;
    const notes = req.body.notes;
    console.log(notes)
    try {
        const existingNotes = await Note.find({ author: userid }).lean();

        if (existingNotes.length === 0) {
            // // If there are no existing notes, create new notes
            // const newNote = new Note({
            //     author: userid,
            //     notes: notes,
            // });

            // await newNote.save();
            // console.log("Saved notes");
        } else {
            // If notes already exist, update the existing notes
            // await Note.findOneAndUpdate(
            //     { author: userid, chatroom: chatroomid },
            //     { notes: notes },
            //     { new: true }
            // );
        }

        // Fetch and return all notes after update
        const updatedNotes = await Note.find({ author: userid }).lean();
        return res.json(updatedNotes);
    } catch (error) {
        return res.status(500).json({ message: "Error saving notes", error: error.message });
    }

}