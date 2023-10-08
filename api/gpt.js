
const path = require('path')
require('dotenv').config({path:  path.join(__dirname, '../config/.env')});
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const philosophyCompletion = async () => {  
    const response =  await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "assistant", content: 
        "Explicame de una forma sencilla y corta las redes neuronales" }],
        // temperature: 1,
    })
    console.log(response.choices[0].message.content); // Acceder al contenido de la respuesta
}
philosophyCompletion();
