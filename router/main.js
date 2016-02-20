var path = require('path');
var Player = require('player');
var fs = require('fs');
var player;
var currentSong;

module.exports = function(app) {
    app.get('/', function(req, res) {
    	var files = fs.readdirSync('songs');
    	var songs = [];

    	files.forEach(function(filename) {
    		var splitted = filename.split('-');
    		if (splitted.length < 3)
    			return;

    		var nickname = splitted[0];
    		var interpret = splitted[1];
    		var title = splitted[2].substring(0, splitted[2].length-4);
    		
    		songs.push({
    			nickname: nickname,
    			interpret: interpret,
    			title: title,
    			filename: filename
    		});
    	});

        res.render('index', {
            songs: songs,
            currentSong: currentSong
        });
    });

    app.get('/stop', function(req, res) {
    	if (player)
    		player.stop();

    	res.json({
            stopped: true
        });
    });

    app.get('/play', function(req, res) {
    	if (player)
    		player.stop();

    	currentSong = {
    		nickname: req.query.nickname,
    		filename: req.query.filename,
    		interpret: req.query.interpret,
    		title: req.query.title
    	};
    	
    	var filename = req.query.filename;

        var songs = [
            path.join(__dirname, '../songs/' + filename)
        ];

        player = new Player(songs)
            .on('playing', function(song) {
                console.log('I\'m playing... ');
                console.log(song);
            })
            .on('playend', function(song) {
                console.log('Play done, Switching to next one ...');
            })
            .on('error', function(err) {
                console.log('Opps...!');
                console.log(err);
            })
            .play();

        res.json({
            played: true
        });
    });

    app.post('/login', function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        res.json({
            "done": "yes"
        });
        res.render('account');
    });

    app.get('/profile', function(req, res) {
        var profile_id = req.query.id;
        res.render('profile', {
            id: profile_id
        });
    });

    app.get('/logout', function(req, res) {
        res.json({
            "logout": "yes"
        });
    });
};
