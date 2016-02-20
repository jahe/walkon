var express    =    require('express');
var app        =    express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

var server     =    app.listen(3000,function(){
console.log("Express is running on port 3000");
});