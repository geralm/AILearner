
const path = require('path')
require('dotenv').config({path:  path.join(__dirname, '../config/.env')}).parsed;
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const philosophyCompletion = async () => {  
    const response =  await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "assistant", content: "Dime una frase de Nicolas Maquiavelo" }],
        // temperature: 1,
    })
    console.log(response.choices[0].message.content); // Acceder al contenido de la respuesta
}
philosophyCompletion();
