const axios = require('axios');
require('dotenv').config();

const {PROTOCOL, BASE_URL, Q , APP_ID, CNT, IDIOM} = process.env;

const url = `${PROTOCOL}://${BASE_URL}?q=${Q}&appid=${APP_ID}&cnt=${CNT}&lang=${IDIOM}&units=metric`;

axios.get(url).then(res => {
    console.log("Exibe a data");
    console.log(res.data);
    console.log("------------------------------");
    return res.data;
}).then(res => {
    console.log("exibe o cnt");
    console.log(res.cnt);
    console.log("------------------------------");
    return res;
}).then(res => {
    console.log("Exibe a lista de previsões");
    for (let previsao of res.list) {
        let data = new Date(+previsao.dt * 1000);
        let tempMax = previsao.main.temp_max;
        let tempMin = previsao.main.temp_min;
        let feelsLike = previsao.main.feels_like;
        let description = previsao.weather[0].description;
        console.log (`
            Data: ${data}
            Temperatura Máxima: ${tempMax}
            Temperatura Mínima: ${tempMin}
            Sensação Térmica: ${feelsLike}
            Descrição: ${description}
        `);
    }
    return res;
}).then(res => {
    let i = 0
    for (let previsao of res.list) {
        if(previsao.main.feels_like > 20)
            i++;
    }
    console.log("Dias com sensação térmica maior que 20 graus: " + i);
});


