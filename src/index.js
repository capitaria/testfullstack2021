const express = require('express');
const morgan = require('morgan');
const path = require('path');
const task = require ('./routes/task.routes');
const list = require ('./routes/list.routes');
const { mongoose } = require('./database');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/tasks',task);
app.use('/api/list',list);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () =>{
  console.log("es",app.get('port'));
})
