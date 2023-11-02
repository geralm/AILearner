const Room = require('../models/rooms/room');
const { gptapi } = require('../api/gpt');
const { meaningcloudapi } = require('../api/meaningCloud');
const { textToSpeechapi } = require('../api/googletxtspeech');
const {buildResponse} = require('../utils/apihelpers');




module.exports.renderRoom = async (req, res) => {
    const { id } = req.params;
    const room = await Room.findById(id);//.populate('conversations');
    console.log(room);
    res.render('rooms/show', { room });
}
module.exports.renderHall = async (req, res) => {
    const rooms = await Room.find({}).select('name description img').lean();
    res.render('rooms/hall', {rooms: rooms, info: undefined});
}

module.exports.fetchQuestionFromAPIs = async (req, res) => {
    const { id } = req.params;
    const { question } = req.body.chat;
    const gptResponse = await gptapi(question,30, words_limit = 100);
    const room = await Room.findById(id).lean();//.populate('conversations');
    if(!gptResponse.error){
        const googleResponse = await textToSpeechapi(gptResponse);
        const meaningCloudResponse = await meaningcloudapi(question);
        const info = buildResponse(room, question,gptResponse,googleResponse,meaningCloudResponse);
        res.render('rooms/show',{info: info});
    }else{
        req.flash('error', gptResponse.error);
        const info = buildResponse(room, question, "something went wrong!",undefined,meaningCloudResponse);
        res.render('rooms/show',{info: info});
    }
       
}


