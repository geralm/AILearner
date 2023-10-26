const Room = require('../models/rooms/room');
const { gptapi } = require('../api/gpt');
const { meaningcloudapi } = require('../api/meaningCloud');
const { textToSpeechapi } = require('../api/googletxtspeech');
const {buildResponse} = require('../utils/apihelpers');
const { google } = require('@google-cloud/text-to-speech/build/protos/protos');
module.exports.renderRoom = async (req, res) => {
    const { id } = req.params;
    const room = await Room.findById(id).lean();//.populate('conversations');
    const response = buildResponse(room, undefined, undefined , undefined, undefined);
    res.render('rooms/show', { response });
}

module.exports.fetchQuestionFromAPIs = async (req, res) => {
    const { id } = req.params;
    const { question } = req.body.chat;
    // const gptResponse = await gptapi(question,20, words_limit = 100);
    const gptResponse  = "test";
    const googleResponse = "google text to speech";
    // if(gptResponse.error){
    //     return res.send(gptResponse);
    // }
    const meaningCloudResponse = {status :{code: "-1"}}
    //await meaningcloudapi("En un hermoso día de verano, salí a dar un paseo por el parque. El sol brillaba en lo alto y el cielo estaba despejado. Mientras caminaba, escuché el canto de los pájaros y sentí la brisa fresca en mi rostro. Me rodeaba la belleza de la naturaleza en pleno esplendor. Respiré profundamente y me di cuenta de lo afortunado que era de poder disfrutar de este momento. Mis pensamientos se llenaron de gratitud y felicidad. A veces, la simpleza de la vida puede traer la mayor alegría.");
    //TODO: fetch a question from the APIs
    //TODO: MAKE A RESPONSE IN A JSON FORMAT
    //TODO_ MAKE A TEMPLATE SUPPORTING THE JSON FORMAT NOT ONLY ROOM
    const room = await Room.findById(id).lean();//.populate('conversations');
    // res.render('rooms/show', { room });
    const response = buildResponse(room, question, gptResponse,googleResponse,meaningCloudResponse);
    res.render('rooms/show',{response});

}




