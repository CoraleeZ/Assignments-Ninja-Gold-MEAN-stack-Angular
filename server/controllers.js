var Ninja = require('./models').Ninja;
var Save = require('./models').Save;

module.exports = {

    getAllTask: (req, res) => {
        Ninja.find().then(data => res.json(data)).catch(err => res.json(err))
    },

    getOneTask: (req, res) => {
        const ID = req.params.id;
        Ninja.find({ _id: ID }).then(data => {
            console.log('successfully get one!');
            res.json(data)
        }).catch(err => res.json(err))
    },

    createTask: (req, res) => {
        const DATA = req.body;
        Ninja.create(DATA).then(data => res.json(data)).catch(err => res.json(err))
    },
    ///
    insertManyTask: (req, res) => {
        const DATA = req.body;
        Ninja.insertMany(DATA).then(data => res.json(data)).catch(err => res.json(err))

    },
    ///
    updateTask: (req, res) => {
        const DATA = req.body;
        const ID = req.params.id;
        Ninja.findOneAndUpdate({ _id: ID }, DATA, { runValidators: true, new: true }).then(data => res.json(data)).catch(err => res.json(err))
    },

    deleteTask: (req, res) => {
        const ID = req.params.id;
        Ninja.findOneAndDelete({ _id: ID }).then(data => res.json(data)).catch(err => releaseEvents.json(err))
    },

    deleteAllTask: (req, res) => {
        Ninja.deleteMany({}).then(data => res.json(data)).catch(err => releaseEvents.json(err))
    },
    //////////////////
    getAllSave: (req, res) => {
        Save.find().then(data => res.json(data)).catch(err => res.json(err))
    },

    getOneSave: (req, res) => {
        const ID = req.params.id;
        Save.find({ _id: ID }).then(data => {
            console.log('successfully get one!');
            res.json(data)
        }).catch(err => res.json(err))
    },

    createSave: (req, res) => {
        const DATA = req.body;
        Save.create(DATA).then(data => res.json(data)).catch(err => res.json(err))
    },

    updateSave: (req, res) => {
        const DATA = req.body;
        const ID = req.params.id;
        Save.findOneAndUpdate({ _id: ID }, { $push: { savegame: { $each: DATA } } }, { runValidators: true, new: true }).then(data => res.json(data)).catch(err => res.json(err))
    },

    deleteSave: (req, res) => {
        const ID = req.params.id;
        Save.findOneAndDelete({ _id: ID }).then(data => res.json(data)).catch(err => releaseEvents.json(err))
    },

    deleteAllSave: (req, res) => {
        Save.deleteMany({}).then(data => res.json(data)).catch(err => releaseEvents.json(err))
    }
}