const express = require('express');
const app = express();

const {infoCourses} = require('./data/courses');

//Routers
const routerProgramming = require('./routers/programming')
app.use('/api/courses/programming', routerProgramming);

const routerMath = require('./routers/math');
app.use('/api/courses/math', routerMath);

//Routing
app.get('/', (req, res) => {
    res.send('My First server with express');
});

app.get('/api/courses', (req, res) => {
    res.send(JSON.stringify(infoCourses));
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})

