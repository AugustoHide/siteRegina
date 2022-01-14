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

app.get('/terapia-alternativa', (req, res) => {
    res.render('terapiaAlternativa');
});

app.get('/biomagnetismo', (req, res) => {
    res.render('biomagnetismo');
});

app.get('/barras', (req, res) => {
    res.render('barras');
});

app.get('/multidimensional', (req, res) => {
    res.render('multidimensional');
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