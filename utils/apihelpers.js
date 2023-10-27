


const analizeSentimentJson = (jsontext) => {
    if(jsontext.status.code !== "0"){
        return {error: {from: "meaningCloud", content: jsontext.status.msg}}
    }
    const ironic = jsontext.irony === "IRONIC" ? "Ironic" : "Not Ironic";
    const subjectivity = jsontext.subjectivity === "SUBJECTIVE" ? "Subjective" : "Objective";
    const general_score_tag = jsontext.score_tag;
    const sentence_list = jsontext.sentence_list.map(sentence => {
        return {
            sentence: sentence.text,
            score_tag: sentence.score_tag,
            score_name: getScoreName(sentence.score_tag),
        }
    });
    return  {ironic : ironic, 
        subjectivity: subjectivity, 
        general_score_tag : general_score_tag,
        sentence_list : sentence_list};
}

const getScoreName = (score_tag) => {
    switch (score_tag) {
        case "P+":
            return "Strong Positive";
        case "P":
            return "Positive";
        case "NEU":
            return "Neutral";
        case "N":
            return "Negative";
        case "N+":
            return "Strong Negative";
        case "NONE":
            return "Without Sentiment";
        default:
            return "Without Sentiment";
    }

}

module.exports.buildResponse = (room, question,gpt,google, meaningCloud) => {
    return {
        room: room,
        question: question,
        response: {
            gpt: gpt,
            google: google,
            meaningCloud: meaningCloud ? analizeSentimentJson(meaningCloud): undefined
        }
    }
}

// analizeSentimentJson(example);
// console.log(analizeSentimentJson(example));