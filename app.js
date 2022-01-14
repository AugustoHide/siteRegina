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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}!!!`);
});