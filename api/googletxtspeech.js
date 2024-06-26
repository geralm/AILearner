//Google text to speech
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });


const textToSpeech = require('@google-cloud/text-to-speech');

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


module.exports.textToSpeechapi = async (text) => {
  try {
    const requests = {
      "audioConfig": {
        "audioEncoding": "LINEAR16",
        "effectsProfileId": [
          "small-bluetooth-speaker-class-device"
        ],
        "pitch": 0,
        "speakingRate": 1.05
      },
      "input": {
        "text": text
      },
      "voice": {
        "languageCode": "es-US",
        "name": "es-US-Neural2-C"
      }
    };
    const [response] = await client.synthesizeSpeech(requests);

    // Convert the audio content to a base64-encoded string
    const audioData = response.audioContent.toString('base64');

    // Send the audio data as a JSON response
    return audioData;
    // Optionally, you can save the audio data as an MP3 file
    // await util.promisify(fs.writeFile)('output.mp3', response.audioContent, 'binary');
    // console.log('Archivo de salida generado con éxito.');
  } catch (error) {
    console.error('Error:', error);
    return { error: {from:'gooogleapi', content: error} }
  }
}