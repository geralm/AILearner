
const axios = require('axios');
const getIdeaById = async (id) => {
    //Function to get a single idea by id
    const response = await axios.get(`https://philosophyapi.pythonanywhere.com/api/ideas/${id}/`);
    return response.data;
   
};
const getIdeasCount = async () => {
    //Function to get the total number of ideas
    const response = await axios.get('https://philosophyapi.pythonanywhere.com/api/ideas/');
    return response.data.count;
}
const getRandomNumber = (max) => {
    //Function to get a random number between 0 and max
    return Math.floor(Math.random() * max);
}
const getRandomIdea = async () => {
    //Function to get a random idea
    const count = 254//await getIdeasCount();
    const id = getRandomNumber(count);
    const idea = await getIdeaById(id);
    return idea;
}
getRandomIdea()
    .then(idea => console.log(idea))
    .catch(error => console.log(error));