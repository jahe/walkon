window.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded");

    document.querySelector('#stop').addEventListener('click', function() {
        function reqListener() {
            console.log(this.responseText);
        }

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", "stop");
        oReq.send();
    });

    var songBtns = document.querySelectorAll('.song');

    for (var i = 0; i < songBtns.length; i++) {
        var songBtn = songBtns[i];
        var song = {
            filename: songBtn.getAttribute('data-filename'),
            nickname: songBtn.getAttribute('data-nickname'),
            title: songBtn.getAttribute('data-title'),
            interpret: songBtn.getAttribute('data-interpret')
        };

        (function(songBtn, song) {
            songBtn.addEventListener('click', function(button) {
                function reqListener() {
                    console.log(this.responseText);
                    updateCurrentSong(song);
                }

                var oReq = new XMLHttpRequest();
                oReq.addEventListener("load", reqListener);
                oReq.open("GET", "play?filename=" + song.filename + "&nickname=" + song.nickname + "&interpret=" + song.interpret + "&title=" + song.title);
                oReq.send();
            });
        })(songBtn, song);
    }
});

function updateCurrentSong(song) {
    document.querySelector('#current-nickname').innerHTML = song.nickname;
    document.querySelector('#current-song').innerHTML = song.interpret + ' - ' + song.title;
}