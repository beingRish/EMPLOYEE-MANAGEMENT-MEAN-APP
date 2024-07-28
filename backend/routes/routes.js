const express = require('express')
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Employee = require('../models/employee')

// Get, Post, Put, Delete
//  Base path: http://localhost:3000/employees

// Get Api
router.get('/', async (req, res) => {
    try{    
        const doc = await Employee.find()
        res.status(201).send(doc);
    }
    catch{
        console.error('Error in Post Data:', err);
        res.status(500).send('Internal Server Error')
    }
})

// Post Api
router.post('/', async (req, res) => {
    try{
        let emp = new Employee({
            name: req.body.name,
            designation: req.body.designation,
            dept: req.body.dept,
            status: req.body.status
        });
    
        const doc = await emp.save()
        res.status(201).send(doc);
    }
    catch{
        console.error('Error in Post Data:', err);
        res.status(500).send('Internal Server Error')
    }
})

// Get Single Employee Api
router.get('/:id', async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
            const doc = await Employee.findById(req.params.id)
            res.status(200).send(doc);
        }else{
            return res.status(400).send('Error in get employee by id');
        }
    }
    catch{
        console.error('Error in Get Single Data:', err);
        res.status(500).send('Internal Server Error');
    }
})

// Delete Api
router.delete('/:id', async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
            const doc = await Employee.findByIdAndDelete(req.params.id)
            res.status(200).send(doc);
        }else{
            return res.status(400).send('Error in Delete employee by id');
        }
    }
    catch(err){
        console.error('Error in Get Single Data:', err);
        res.status(500).send('Internal Server Error');
    }
})


// Put Api
router.put('/:id', async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)){

            let emp = {
                name: req.body.name,
                designation: req.body.designation,
                dept: req.body.dept,
                status: req.body.status
            };
        
            const doc = await Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true})
            res.status(200).send(doc);
        }else{
            return res.status(400).send('Error in updat employee by id');
        }
    }
    catch(err){
        console.error('Error in Get Single Data:', err);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router