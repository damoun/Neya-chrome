var canVote = false;

var playerList = [];
var playerCount = 0;
setTimeout(loadPlayerMarkers, 1000);

function loadPlayerMarkers()
{
    $.getJSON('http://minemap.verygames.net/server5115/world/markers.json', function(data) {
	playerList = [];
	playerCount = 0;
        for (i in data)
        {
            var item = data[i];
            if (item.msg != "Spawn")
            {
                if (playerCount < 10)
                    playerList.push('<div class="player link" onclick="chrome.tabs.create({url: \'http://minemap.verygames.net/server5115/world/#/' + item.x + '/' + item.y + '/' + item.z + '/max\'})"><img src="http://www.verygames.net/minecraft/Player-Avatar/player-avatar.php?player=' + item.msg + '&usage=list" border="0" /> ' + item.msg + '</div>');
                ++playerCount;
            }
	}
	playerList.sort();
	if (playerCount >= 10)
	    playerList.push('<div class="link center" onclick="chrome.tabs.create({url: \'http://minemap.verygames.net/server5115/world/\'})">+++</div>');
    });
    setTimeout(loadPlayerMarkers, 1000);
}

function haveYouVote()
{
    var content;
    $.ajax({
        url: "http://www.serveurs-minecraft.org/vote.php?id=1962",
        type: "POST",
        dataType: "html",
	async: false,
        success: function(data) {
            content = data;
        }
    });
    setTimeout(loadPlayerMarkers, 3600000);   
    if (content.search('Vous avez déjà voté aujourd\'hui !') != -1)
	return (true);
    return (false);
}

haveYouVote();