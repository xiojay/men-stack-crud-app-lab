const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.set('view engine', 'ejs')

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err))


// app.get('/test', (req, res) => {
//     res.send('Server is running');
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

const Game = require('./models/game.js')

app.get('/games', async (req, res) => {
    const games = await Game.find({})
    res.render('index', { games })
});

app.get('/games/new', (req, res) => {
    res.render('new')
});

app.post('/games', async (req, res) => {
    const newGame = new Game(req.body)
    await newGame.save()
    res.redirect('/games')
});

app.get('/games/:id', async (req, res) => {
    const game = await Game.findById(req.params.id)
    res.render('show', { game })
});

app.get('/games/:id/edit', async (req, res) => {
    const game = await Game.findById(req.params.id)
    res.render('edit', { game })
});

app.put('/games/:id', async (req, res) => {
    await Game.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/games')
});

app.delete('/games/:id', async (req, res) => {
    await Game.findByIdAndDelete(req.params.id)
    res.redirect('/games')
});
