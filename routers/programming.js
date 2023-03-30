const express = require('express');

const {programming} = require('../data/courses').infoCourses

const routerProgramming = express.Router();

//Middleware
routerProgramming.use(express.json())

routerProgramming.get('/', (req, res) => {
  res.send(programming);
});

routerProgramming.get('/:language', (req, res) => {
  const language = req.params.language;
  const results = programming.filter(
    (courses) => courses.language === language
  );

  if (results.length === 0) {
    return res.status(404).send(`They were not found "${language}" courses.`);
  } else {
    res.send(results);
  }
});

routerProgramming.get('/:language/:level', (req, res) => {
  const language = req.params.language;
  const level = req.params.level;

  const results = programming.filter(
    (courses) => courses.language === language && courses.level === level
  );

  if (results.length === 0) {
   res.status(404).send(`They were not found any ${language} course with level ${level}`); 
  } else if (req.query.order === 'views') {
    res.send(results.sort((a, b) => a.views - b.views));
  } else {
    res.send(results);
  }
});

//Method POST
routerProgramming.post('/', (req, res) => {
    let newCourse = req.body;
    programming.push(newCourse);
    res.send(programming);
});

//Method PUT
routerProgramming.put('/:id', (req, res) => {
    const updatedCourse = req.body;
    const id = req.params.id;

    const index = programming.findIndex(course => course.id == id);

    if(index >= 0){
        programming[index] = updatedCourse;
    }else{
        res.status(404)
    }

    res.send(programming);
    
})

//Method PATCH
routerProgramming.patch('/:id', (req, res) => {
    const updatedInfo = req.body;
    const id = req.params.id;

    const index = programming.findIndex(course => course.id == id);

    if(index >= 0){
        const courseUpdate = programming[index];
        Object.assign(courseUpdate, updatedInfo);
    }
    else{
        res.status(404)
    }

    res.send(programming);
});

// Method DELETE
routerProgramming.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = programming.findIndex(course => course.id == id);

    if(index >= 0){
        programming.splice(index, 1)
    }else{
        res.status(404)
    }

    res.send(programming)
})

module.exports = routerProgramming;