var application_root = __dirname,
    express = require("express"),
	path = require("path");
	var databaseUrl = "faodb"; // "username:password@example.com/mydb"
var collections = ["seeds"]
var db = require("mongojs").connect(databaseUrl, collections);

var app = express();



// Config
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  var methodOverride = require('method-override');
  app.use(methodOverride());
  app.use(express.static(path.join(application_root, "public")));
  var errorhandler = require('errorhandler');
  app.use(errorhandler());
}




app.route('/api').get(function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send('Ecomm API is running');
});


app.route('/getseeddata/:seedname').get(function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    seed = req.params.seedname;
	db.seeds.find({seedname:seed}, function(err, seeds) {
	if( err || !seeds) console.log("No seeds found");
	  else 
	{
		res.writeHead(200, {'Content-Type': 'text/json'});
		seedscollection = seeds[0].seedprice;
		str = '[';
		//console.log(seedscollection);
		
		seedscollection.forEach( function(seed) {
		   str = str + '{"month":"'+ seed.mmonth + '","price":"'+ seed.price +'"},';
		});
		str = str.substring(0,str.length-1)
		str = str + ']';
		res.end(JSON.stringify(str));
	}
  });
});



app.listen(1212);