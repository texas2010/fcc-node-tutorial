var express = require('express');
var app = express();

console.log('Hello World');

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})
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

// app.get('/name', (req, res, next) => {
//     console.log(req.query);
//     next()
// })

app.route('/name').get((req, res) => {
    res.json(req.query)
}).post((req, res) => {
    res.json(req.query)
})

if (!process.env.PORT) {
    app.listen(3000, () => {
        console.log('server started.');
    })
}

module.exports = app;
