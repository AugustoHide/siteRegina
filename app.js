const express = require('express');
const app = express();

const ejsMate = require('ejs-mate');
const path = require('path');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
const viewPath = path.join(__dirname, '/views');
app.set('views', viewPath);

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('paginaInicial');
});

app.get('/terapia-tradicional', (req, res) => {
    res.render('terapiaTradicional');
});

app.get('/orientacao-familiar', (req, res) => {
    res.render('orientacaoFamiliar');
});

app.get('/terapia-casal', (req, res) => {
    res.render('terapiaCasal');
});

app.get('/ansiedade-depressao', (req, res) => {
    res.render('ansiedadeDepressao');
});

app.get('/positiva', (req, res) => {
    res.render('positiva');
});

app.get('/sobremim', (req, res) => {
    res.render('sobremim');
});

app.get('/contatos', (req, res) => {
    res.render('contatos');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}!!!`);
});