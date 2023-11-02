const path = require('path')
require('dotenv').config({path:  path.join(__dirname, '../config/.env')});
const axios = require('axios');

// const data = new URLSearchParams();
// data.append("key", process.env.MEANING_CLOUD_API_KEY);
// data.append("txt", "¡El sistema académico actual está obsoleto! ¡Necesitamos un cambio!");
// data.append("lang", "es");  // 2-letter code, like en es fr ...
// // "Es simplemente asombroso cómo algunas 
// // personas parecen tener la capacidad de olvidar por 
// // completo sus responsabilidades. A pesar de que se les ha 
// // recordado varias veces, aún parece que no pueden encontrar el
// //  tiempo para cumplir con sus tareas. Uno podría pensar que la
// //   comunicación clara y las expectativas bien definidas serían suficientes, 
// //   pero parece que eso no es así para algunos. No sé cómo explicar esto de una
// //    manera más simple o directa, pero parece que algunos necesitan un recordatorio 
// //    constante para hacer lo que se espera de ellos. Pero bueno, supongo que todos somos 
// //    diferentes en la forma en que manejamos nuestras obligaciones, ¿verdad?");

// const config = {
//   method: 'post',
//   url: 'https://api.meaningcloud.com/sentiment-2.1',
//   data: data,
// };

// axios(config)
//   .then(function (response) {
//     console.log(response.status, response.data);
//   })
//   .catch(function (error) {
//     console.log('error', error);
//   });

module.exports.meaningcloudapi = async (text) => {
    const data = new URLSearchParams();
    data.append("key", process.env.MEANING_CLOUD_API_KEY);
    data.append("txt", text);
    data.append("lang", "es");  // 2-letter code, like en es fr ...
    const config = {
        method: 'post',
        url: 'https://api.meaningcloud.com/sentiment-2.1',
        data: data,
    };
    const response = await axios(config);
    return response.data;

}
