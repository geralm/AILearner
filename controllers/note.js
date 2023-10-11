const { use } = require('passport');
const Note = require('../models/note');

module.exports.getAllNotes = async (req, res) =>
{
    const userid = req.user._id;
    const notes = await Note.find({author: userid}).lean();
    console.log(req.user._id)
    console.log(notes);
    res.send(notes);
}
module.exports.getOneNote = async (req, res) =>
{
    //TODO: render one note logic
}
module.exports.deleteNote = async (req, res) => 
{
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    const notes = await Note.find({author: userid}).lean();
    return res.send(notes);
}
module.exports.saveNotes = async (req,res) =>
{
    const chatroomid = req.body.chat;
    const userid = req.user._id;
    const notes = req.body.notes;
    console.log(notes, chatroomid, userid);
    const existingNotes = await Note.find({author: userid, chatroom :chatroomid}).lean();
            

}