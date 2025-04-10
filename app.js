require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Route imports
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const xylophoneRouter = require('./routes/xylophone');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource');
require('./models/xylophone');

const app = express();

// 1. View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 2. Database Connection (with error handling)
mongoose.connect(process.env.MONGO_CON, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// 3. Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 4. Route Debugging Middleware (NEW - helps identify issues)
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} ${req.originalUrl}`);
  next();
});

// 5. Routes (EXACTLY as you have them)
app.use('/resource', resourceRouter);
app.use('/xylophone', xylophoneRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

// 6. Error Handling (Fixed to match your routes)
app.use((req, res, next) => {
  console.log('404 - Available routes:', [
    '/resource/xylophone',  // Changed to singular to match your routes
    '/xylophone',
    '/grid',
    '/pick',
    '/users',
    '/'
  ]);
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;