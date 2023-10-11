const Room = require('../models/rooms/room');

module.exports.renderRoom = async (req, res) => {
    const { id } = req.params;
    const room = await Room.findById(id).lean();//.populate('conversations');
    res.render('rooms/show', { room });
}



