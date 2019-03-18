const mongoose = require('mongoose');
// const connectionString = 'mongodb://localhost/tasks_api';
mongoose.connect('mongodb://localhost/tasks_api', { useNewUrlParser: true });

const NinjagoldSchema = new mongoose.Schema({
    type: { type: String, required: true },
    gold: { type: Number, required: true }
}, { timestamps: true });

const SaveGameSchema = new mongoose.Schema({
    savegame: { type: Array }
}, { timestamps: true })

var Ninjagold = mongoose.model('Ninjagold', NinjagoldSchema);
var Savegame = mongoose.model('Savegame', SaveGameSchema);
module.exports = { Ninja: Ninjagold, Save: Savegame }