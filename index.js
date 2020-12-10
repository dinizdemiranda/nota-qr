const express = require('express') //importacao do pacote
const app = express() //instanciando express
const axios = require("axios");
const cheerio = require("cheerio");
 


app.get('/api/:qrCode', async function (req, res) { 
    const response = await getUrl(req.params.qrCode)
    res.send(response)

})

const getUrl = async (qrCode) => {
    const response = await axios.get('http://www.fazenda.pr.gov.br/nfce/qrcode?p=' + qrCode)
    // console.log(response.data)
    const $ = cheerio.load(response.data);

    // social= $('li:contains("CPF:")').text().replace(/\r?\n|\r/g, "").replace(/ /g, '').substring(4);
    // nome = $('li:contains("Nome:")').text().replace(/\r?\n|\r/g, "").trim().substring(5).trim();
    key = $(".chave").text();
    val = $(".txtMax").text();
    
    let nota = {chave: key, valor: val};
    console.log(qrCode)
    console.log(nota)
    return nota
}


app.listen(3000) //execucao do servidor