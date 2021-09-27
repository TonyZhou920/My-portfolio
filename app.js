//Add variables to require the necessary dependencies.
const express = require('express');
const app = express();
const path = require("path");
const newError = require("http-errors");
const { projects } = require('./data.json');

app.use(express.json());

//Set up view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static middleware for serving static files.
app.use('/static', express.static('public'));

//GET home page.
app.get('/', (req, res) => {
    res.render('index', { projects });
});

// Get about page.
app.get('/about', (req, res) => {
    res.render('about' );
});

//Get project page.
app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    if (project) {
        res.render('project', {project});
    } else {
        next(newError(404));
    }
});

// Handle 404 Errors
app.use((req, res, next) => {
    next(newError(404));
});

//Global error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err: {};
    if(err.status === 404) {
        res.status(err.statusCode);
        err.message = 'Oops, page not found. Looks like that route does not exist.';
        console.log(`${err.statusCode}: ${err.message}`);
        res.render('page-not-found', {err});
    }else {
        res.status(err.statusCode || 500);
        err.message ='Looks like there might be a problem with server.'
        console.log(`${err.statusCode}: ${err.message}`);
        res.render('error',{err});
    }
});
//Deploy for Heroku set up PORT.
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`the application is up and running on local host port: ${PORT}`)
}); 

