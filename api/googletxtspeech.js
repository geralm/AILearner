//Google text to speech
const path = require('path');
require('dotenv').config({path:  path.join(__dirname, '../config/.env')});


const textToSpeech = require('@google-cloud/text-to-speech');
// require('dotenv').config(); //FIXME: app.js already has this line

//Dot env
const fs = require('fs');
const util = require('util');//for promisify


const client = new textToSpeech.TextToSpeechClient();

async function quickStart() {
  try {
    const text = "Hola mundo, esto es una prueba de el API de Google Text to Speech!";
    console.log('Texto a sintetizar:', text);

    // Agrega esta impresión para verificar la configuración de autenticación
    console.log('Configuración de autenticación:', client.auth);

    const requests = {
      input: { text: text },
      voice: { languageCode: 'es-ES', ssmlGender: 'NEUTRAL2' },
      audioConfig: { audioEncoding: 'MP3' }
    };
    console.log('Solicitud de síntesis:', requests);

    const [response] = await client.synthesizeSpeech(requests);
    console.log('Respuesta del servicio de síntesis:', response);

    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Archivo de salida generado con éxito.');
  } catch (error) {
    console.error('Error:', error);
  }

}


quickStart()
