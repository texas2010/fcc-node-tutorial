var express = require('express');
const bodyParser = require('body-parser');
var app = express();

console.log('Hello World');

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
})

app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({ message: 'HELLO JSON' })
    } else {
        res.json({ message: 'Hello json' })
    }
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString()
    next();
}, (req, res) => {
    res.json({ time: req.time })
})

app.get('/:word/echo', (req, res) => {
    res.json({ echo: req.params.word })
})

app.route('/name').get((req, res) => {
    const { first, last } = req.query
    res.json({ name: `${first} ${last}` })
}).post((req, res) => {
    const { first, last } = req.body
    res.json({ name: `${first} ${last}` })
})

if (!process.env.PORT) {
    app.listen(3000, () => {
        console.log('server started.');
    })
}

module.exports = app;
