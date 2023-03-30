const express = require('express');

const {math} = require('../data/courses').infoCourses

const routerMath = express.Router();

//Middleware
routerMath.use(express.json())

routerMath.get('/', (req, res) => {
  res.send(math);
});

routerMath.get('/:topic', (req, res) => {
  const topic = req.params.topic;
  const results = math.filter((courses) => courses.topic === topic);

  if (results.length === 0) {
    res.status(404).send(`They were not found any courses with topic ${topic}`);
  } else {
    res.send(results);
  }
});

routerMath.get('/:topic/:level', (req, res) => {
  const topic = req.params.topic;
  const level = req.params.level;
  const results = math.filter(
    (courses) => courses.topic === topic && courses.level === level
  );

  if (results.length === 0) {
    res
      .status(404)
      .send(`Sorry, they were not found any ${topic} with level ${level}`);
  } else {
    res.send(results);
  }
});[]

//Method POST

routerMath.post('/', (req, res) => {
  let newCourse = req.body;
  math.push(newCourse);
  res.send(math);
});

//Method PUT
routerMath.put('/:id', (req, res) => {
    const updateCourse = req.body;
    const id = req.params.id;

    const index = math.findIndex(course => course.id == id);

    if(index >= 0){
        math[index] = updateCourse;
    }else{
        res.status(404);
    }

    res.send(math);
});

//Method PATCH
routerMath.patch('/:id', (req, res) => {
    const updatedInfo = req.body;
    const id = req.params.id;
    
    const index = math.findIndex(course => course.id == id);

    if(index >= 0){
        const courseUpdate = math[index]
        Object.assign(courseUpdate, updatedInfo)
    }
    else{
        res.status(404)
    }
    
    res.send(math);
});

//Method DELETE
routerMath.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = math.findIndex(course => course.id == id);

    if(index >= 0){
        math.splice(index, 1)
    }else{
        res.send(404);
    }

    res.send(math)
})
module.exports = routerMath;