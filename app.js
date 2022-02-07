const express = require('express');
const app = express();

const helmet = require('helmet');
const ejsMate = require('ejs-mate');
const path = require('path');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
const viewPath = path.join(__dirname, '/views');
app.set('views', viewPath);

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet({ contentSecurityPolicy: false }));

app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP
        res.redirect(`https://${req.hostname}${req.url}`); //Redireciona pra HTTPS
    else //Se a requisição já é HTTPS
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado
});

app.get('/', (req, res) => {
    res.render('paginaInicial', { pagina: 'Home' });
});

app.get('/orientacao-familiar', (req, res) => {
    res.render('orientacaoFamiliar', { pagina: 'Orientação Familiar' });
});

app.get('/terapia-casal', (req, res) => {
    res.render('terapiaCasal', { pagina: 'Terapia de Casal' });
});

app.get('/ansiedade-depressao', (req, res) => {
    res.render('ansiedadeDepressao', { pagina: 'Ansiedade e Depressão' });
});

app.get('/positiva', (req, res) => {
    res.render('positiva', { pagina: 'Empoderamento' });
});

app.get('/sobremim', (req, res) => {
    res.render('sobremim', { pagina: 'Sobre Mim' });
});

app.get('/contatos', (req, res) => {
    res.render('contatos', { pagina: 'Contatos' });
});

app.get('/robots.txt', (req, res) => {
    res.sendFile('robots.txt');
});

app.get('/sitemap.xml', (req, res) => {
    res.sendFile('sitemap.xml');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}!!!`);
});