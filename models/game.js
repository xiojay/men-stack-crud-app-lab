const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    developer: { type: String, required: true },
    releaseDate: { type: Date, required: true },
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;

