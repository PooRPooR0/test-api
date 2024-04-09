const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const {Error: JSONAPIError} = require("jsonapi-serializer");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
	res.status(err.status).json(new JSONAPIError({
		status: err.status,
		title: 'Internal Error',
		detail: 'Something went wrong'
	}))
})

app.use((req, res, next) => {
	res.status(404).json(new JSONAPIError({
		status: 404,
		title: 'Not Found',
		detail: 'Not found'
	}))
})

module.exports = app;
