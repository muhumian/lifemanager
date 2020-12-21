const router = require('express').Router();
const User = require('../../models/account/user');
const Task = require('../../models/todo/task');
const auth = require('../../helper/token');
const responseFormat = require('../../helper/responseFormat');
const moment = require('moment');

//functions
const {taskValidation} = require("../../helper/taskHelper");

router.post('/task/update/', auth.authenticateToken, (req, res) => {

    const validatedData = taskValidation(req.body.task);

    if (!validatedData) {

        if (req.body.task.description.subtasks.length > 0) {
            req.body.task.status = !!req.body.task.description.subtasks.find(s => s.status === true);
        }

        Task.findOneAndUpdate({_id: req.body.task._id, owner: req.user.id}, req.body.task)
            .then(result => {
                if (result) {
                    res.send(responseFormat(true, null, null));
                } else {
                    res.send(responseFormat(false, null, "Access Denied"));
                }
            })
            .catch(() => {
                res.send(responseFormat(false, null, "Request failed"));
            });

    } else {
        res.send(responseFormat(false, null, validatedData));
    }
});

router.post('/task/update/status', auth.authenticateToken, (req, res) => {

    Task.findOneAndUpdate({_id: req.body.id, owner: req.user.id}, {status: !req.body.status})
        .then(result => {
            if (result) {
                res.send(responseFormat(true, null, null));
            } else {
                res.send(responseFormat(false, null, "Access Denied"));
            }
        })
        .catch((e) => {
            console.log(e);
            res.send(responseFormat(false, null, "Request failed"));
        });
});

router.post('/tasks/add', auth.authenticateToken, (req, res) => {

    const validatedData = taskValidation(req.body);

    if (!validatedData) {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            owner: req.user.id,
            date: moment()
        });

        task.save()
            .then(result => {
                if (result)
                    res.send(responseFormat(true, null, null));
                else res.send(responseFormat(true, null, "Something went wrong"));
            })
            .catch(err => {
                if (err.name === 'ValidationError')
                    res.send(responseFormat(false, null, err.errors[Object.keys(err.errors)[0]].properties.message));
                else if (err.code && err.code === 11000)
                    res.send(responseFormat(false, null, "Email already in use"));
            });
    } else {
        res.send(responseFormat(false, null, validatedData));
    }
});

router.get('/tasks/list', auth.authenticateToken, async (req, res) => {

    Task.find({owner: req.user.id}).sort({date: 1, status: 1})
        .then(tasks => {
            if (tasks) {
                res.send(responseFormat(true, tasks, null));
            } else res.send(responseFormat(true, [], null));
        })
        .catch((e) => {
            console.log(e);
            res.send(responseFormat(false, null, "Request failed"));
        });

});

router.get('/task/:id', auth.authenticateToken, (req, res) => {

    Task.findOne({_id: req.params.id, owner: req.user.id})
        .then(task => {
            // res.send(result);
            if (task)
                res.send(responseFormat(true, task, null));
            else res.send(responseFormat(false, null, "Task not found"));

        })
        .catch((e) => {
            console.log(e);
            res.send(responseFormat(false, null, "Request failed"));
            // res.send({result: false})
        });
});

router.delete('/task/delete/:id', auth.authenticateToken, (req, res) => {

    Task.findOneAndDelete({_id: req.params.id, owner: req.user.id})
        .then(task => {
            if (task) {
                res.send(responseFormat(true, null, null));
            } else {
                res.send(responseFormat(false, null, "Access Denied"));
            }
        })
        .catch(() => {
            res.send(responseFormat(false, null, "Request failed"));
        })
});

module.exports = router;
