
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });
const fs = require('fs');

require("openai/shims/web");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const philosophyCompletion = async () => {
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{
            role: "assistant", content:
                "Explicame de una forma sencilla y corta las redes neuronales"
        }],
        // temperature: 1,
    })
    console.log(response.choices[0].message.content); // Acceder al contenido de la respuesta
}
// philosophyCompletion();
module.exports.gptapi = async (question, age, words_limit, system) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: `Eres el mejor ${system} respondiendo en ${words_limit} a palabras para alguien de ${age} años `  },
            { role: "assistant", content: question }],
            // temperature: 1,
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.log(error);
        return { error: {from:'gptapi', content: error} }
    }
}
