const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index');
})
app.get('/dashboard', function (req, res) {
    res.render('dashboard');
})
app.get('/simpleDashboard', function (req, res) {
    res.render('simpleDashboard');
})

app.listen(3000, function () {
  console.log('Dapp started on port 3000!')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));