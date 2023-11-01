const Room = require('../models/rooms/room');
const { gptapi } = require('../api/gpt');
const { meaningcloudapi } = require('../api/meaningCloud');
const { textToSpeechapi } = require('../api/googletxtspeech');
const {buildResponse} = require('../utils/apihelpers');
const { google } = require('@google-cloud/text-to-speech/build/protos/protos');
//FIXME: remove this dummy response
const dummyResponse ={
    room: "This is a dummy text room",
    question: "This is a dummy text question",
    response: {
        gpt: "This is a dummy text gpt",
        google: "This is a dummy text google",
        meaningCloud: {
            ironic: "Ironic",
            subjectivity: "Subjective",
            general_score_tag: "P+",
            sentence_list: [
                {
                    sentence: "This is a dummy text sentence 1",
                    score_tag: "P+",
                    score_name: "Strong Positive", 
                    style_class: "strongpositive"
                },
                {
                    sentence: "This is a dummy text sentence 2",
                    score_tag: "P",
                    score_name: "Positive",
                    style_class: "positive" 
                },
                {
                    sentence: "This is a dummy text sentence 3",
                    score_tag: "NEU",
                    score_name: "Neutral", 
                    style_class: "neutral"
                },
                {
                    sentence: "This is a dummy text sentence 4 ",
                    score_tag: "N",
                    score_name: "Negative",
                    style_class: "negative"
                },
                {
                    sentence: "This is a dummy text sentence 5",
                    score_tag: "N+",
                    score_name: "Strong Negative",
                    style_class: "strongnegative"
                },
                {
                    sentence: "This is a dummy text sentence 6",
                    score_tag: "NONE",
                    score_name: "Without Sentiment",
                    style_class: "withoutsentiment"
                },
            ]
        }
    }
}



module.exports.renderRoom = async (req, res) => {
    const { id } = req.params;
    const room = await Room.findById(id).lean();//.populate('conversations');
    const info = buildResponse(room, undefined, undefined , undefined, undefined);
    res.render('rooms/show', { info:info });
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
        req.flash('error', e.message);
        const info = buildResponse(room, question, "something went wrong!",undefined,meaningCloudResponse);
        res.render('rooms/show',{info: info});
    }
       
}


