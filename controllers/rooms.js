const Room = require('../models/rooms/room');
const { gptapi } = require('../api/gpt');
const { meaningcloudapi } = require('../api/meaningCloud');
const { textToSpeechapi } = require('../api/googletxtspeech');
module.exports.renderRoom = async (req, res) => {
    const { id } = req.params;
    const room = await Room.findById(id).lean();//.populate('conversations');
    res.render('rooms/show', { room });
}

module.exports.fetchQuestionFromAPIs = async (req, res) => {
    const { id } = req.params;
    const { question } = req.body.chat;
    // const gptResponse = await gptapi(question,20, words_limit = 100);
    // if(gptResponse.error){
    //     return res.send(gptResponse);
    // }
    const meaningCloudResponse = await meaningcloudapi("En un día lluvioso, me sentí triste al ver cómo la lluvia empapaba todo a su paso. Las nubes grises cubrían el cielo, y el viento soplaba con fuerza. Me refugié en casa, recordando los días soleados en los que solía jugar en el parque. Extrañaba la sensación cálida del sol en mi piel. Las lágrimas se mezclaron con las gotas de lluvia en mi ventana. Sin embargo, decidí hacer una taza de chocolate caliente y leer un buen libro. El aroma reconfortante y las palabras en las páginas me hicieron sentir mejor. A veces, la tristeza puede encontrar consuelo en las pequeñas cosas.");
    //TODO: fetch a question from the APIs
    //TODO: MAKE A RESPONSE IN A JSON FORMAT
    //TODO_ MAKE A TEMPLATE SUPPORTING THE JSON FORMAT NOT ONLY ROOM
    const room = await Room.findById(id).lean();//.populate('conversations');
    // res.render('rooms/show', { room });
    const response = {
        room: room,
        question: question,
        response: {
            //gpt: gptResponse,
            meaningCloud: meaningCloudResponse
        }
    }
    res.send(response);

}



