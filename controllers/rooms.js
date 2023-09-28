const Room = require('../models/rooms/room');
const Conversation = require('../models/conversation/conversation');

module.exports.renderRoom = async (req, res) => {
    const { id } = req.params;
    const room = await Room.findById(id);//.populate('conversations');
    console.log(room);
    res.render('rooms/show', { room });
}



