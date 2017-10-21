var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db=require('./model/db');
var session=require('express-session');
var hbs=require('express-handlebars');
var fileUpload=require('express-fileupload');


var admin=require('./routes/admin');
var news=require('./routes/news');
var syllabus=require('./routes/syllabus');

var seed=require('./routes/seed');



var app = express();

// view engine setup
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname + '/views/layouts/',partialsDir:__dirname + '/views/partials/'}));

app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secretkey'}));
app.use(fileUpload());

app.get('/getnews',news.getnews);
app.get('/getspecificnews/:id',news.getspecificnews);
app.get('/news/delete/:id',news.delete);
app.get('/news/edit/:id',news.edit);
app.post('/news/edit',news.doEdit);

app.get('/', admin.login);//first load login page
app.post('/login', admin.doLogin);
app.get('/adminhome', admin.index);
app.get('/news/add',news.add);
app.post('/news/add',news.doAdd);
app.get('/news/view',news.view);
app.get('/news/detailedview/:id',news.detailedview);
// Add admin profile
app.get('/admin/new', admin.create);
// Create new user form
app.post('/admin/new', admin.doCreate);
app.get('/admin/view',admin.view);
app.get('/admin/changepassword/:id',admin.changepassword);
app.post('/admin/changepassword',admin.dochangepassword);
app.get('/admin/delete/:id',admin.delete);


app.get('/syllabus/getChildById/:path',syllabus.getChildById);
//Syllabus - Course view abu
app.get('/syllabus/course/view',syllabus.viewcourse);
app.get('/syllabus/course/new',syllabus.coursecreate);
app.get('/syllabus/course/:course',syllabus.editCourse);
app.get('/syllabus/course/sem/:course',syllabus.viewSemester);
app.get('/syllabus/course/addSem/:courseparant',syllabus.addSemester);
app.get('/syllabus/course/sem/branch/:sem',syllabus.viewbranch);
app.get('/syllabus/course/sem/addbranch/:sem',syllabus.addbranch);
app.get('/syllabus/course/sem/branch/subj/:subj',syllabus.viewSubj);
app.get('/syllabus/course/sem/branch/addsubj/:subj',syllabus.addSubj);

app.post('/syllabus/course/new',syllabus.docoursecreate);
app.post('/syllabus/course/:course',syllabus.doeditCourse);
app.post('/syllabus/course/sem/new',syllabus.doaddSemester);
app.post('/syllabus/course/sem/branch/new',syllabus.doaddbranch);
app.post('/syllabus/course/sem/branch/addsubj/:branch',syllabus.doaddSubj);
app.post('/syllabus/course/sem/branch/subj/download/:subj',syllabus.dodownloadsub);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
