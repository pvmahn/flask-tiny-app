const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');

const db = require('./config/database');
const router = require('./routes/index');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

const hbs = exphbs.create({
   extname: '.hbs',
   helpers: {
      toString: (value) => {
         return value ? value.toString() : ''
      },
      formatDate: (date) => {
         return date ? new Date(date).toLocaleString().split(',')[0] : '';
      }
   }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

db.connection()
router(app);

app.listen(5500, () => {
   console.log("The server is running!")
});