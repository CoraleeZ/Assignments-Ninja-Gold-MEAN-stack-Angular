const controller = require('./controllers');
module.exports = (app) => {
    app
        .get('/api/tasks', controller.getAllTask)
        .get('/api/tasks/:id', controller.getOneTask)
        .post('/api/tasks', controller.createTask)
        .post('/api/all/tasks', controller.insertManyTask)
        .put('/api/tasks/:id', controller.updateTask)
        .delete('/api/tasks/:id', controller.deleteTask)
        .delete('/api/tasks', controller.deleteAllTask)
        ///
        .get('/api/savegame', controller.getAllSave)
        .get('/api/savegame/:id', controller.getOneSave)
        .post('/api/savegame', controller.createSave)
        .put('/api/savegame/:id', controller.updateSave)
        .delete('/api/savegame/:id', controller.deleteSave)
        .delete('/api/savegame', controller.deleteAllSave)
}