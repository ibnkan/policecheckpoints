//global variables
var map;
var Bahrain = new google.maps.LatLng(26.125, 50.55);
var markerIcon = "CheckPoint.png";
var mapmarkers = [];

//create an infoWindow object to be used by markers on the map
var infoWindow = new google.maps.InfoWindow({
    maxWidth: 240
});

function initialize() {
    
    //map options 
    var mapOptions = {
        zoom: 10,
        center: Bahrain,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //create map
    map = new google.maps.Map(document.getElementById("the_map"), mapOptions);
    
    /*overlay infobox image on map
    var imageBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(26.112, 50.456),
        new google.maps.LatLng(26.049, 50.390));
        
            
    var infobox = new google.maps.GroundOverlay("infobox.png", imageBounds);
    infobox.setMap(map);*/
    
    //close infoWindow when map is clicked
    google.maps.event.addListener(map, 'click', function() {
        infoWindow.close();
        
    });
    
    $(document).ready(function() {
        $(document).bind('ProcessTweets', ProcessTweets);
        $(document).bind('ProcessLinks', ProcessLinks);
        $(document).bind('LongUrlReceived', LongUrlReceived);
        $(document).bind('ShowResults', ShowResults);
        
        $.getJSON("http://search.twitter.com/search.json?q=%23Bahrain%20%22%D9%86%D9%82%D8%B7%D8%A9%20%D8%AA%D9%81%D8%AA%D9%8A%D8%B4%22%20-filter%3Aretweets&rpp=100&result_type=recent&callback=?", function(data) {

            window.response = data;

            window.twitterdata = [];
            window.linkindex = 0;

            $(document).trigger('ProcessTweets');
        
        
        });
    });
}

//////////////////////////////////////////////////////////////////////
function randomDecimal() {
    var y = Math.random() - Math.random();
    if (y <= 0) {
        y = -1;
    }
    else {
        y = 1;
    }
    var x = y * (0.00008 + (Math.random() * 0.00008));
    
    return x;
    
}

//////////////////////////////////////////////////////////////////////

function findlocation(tweettext) {

    var latlng = null;
    for (point in mappoints) {
        if (mappoints.hasOwnProperty(point)) {

            if (point == tweettext.match(point)) {
                latlng = extractLatLng(mappoints[point]);
                break;
            }
        }

    }

    return latlng;
}

//////////////////////////////////////////////////////////////////////

function extractURL(tweet) {
    var url = tweet.match(/\b(http|https):\/\/\S+/g);
    if (url !== null) {
        return url[0];
    }
    else {
        return null;
    }

}

//////////////////////////////////////////////////////////////////////

function extractLatLng(text) {
    var latlng = text.match(/\d+[.]\d+/g);
    return latlng;

}

//////////////////////////////////////////////////////////////////////

function PrintTweet(tweet) {

    var htmltext = '<div style="background-color:GhostWhite"><img src="' + tweet[0] + '\" style="float:left; margin-bottom:20px; margin-right:10px;" /img><strong>' + tweet[1] + '</strong><br /><em style="font-size:75%;">' + tweet[2].replace(/(@|#)\w+/g, "") + '</em><br /><span style="font-size:55%;">posted @ ' + tweet[3] + '</span></div>';

    //document.getElementById("txt").innerHTML += htmltext;

    return htmltext;

}

//////////////////////////////////////////////////////////////////////

function ProcessTweets(evt) {

    //show number of tweets found
    //document.getElementById("txt").innerHTML += "Total tweets found -->> " + response.results.length;

    for (i = 0; i < response.results.length; i++) {

        var tweet = response.results[i].text.replace(/(\b(http|https):\/\/\S+)/g, '<a href="$&">$&</a>');
        //var tweeturl = extractURL(tweet);
        var profilename = '@' + response.results[i].from_user;
        var profileimage = response.results[i].profile_image_url;
        var timestamp = response.results[i].created_at;

        twitterdata[i] = [profileimage, profilename, tweet, timestamp];

    }

    //$(document).trigger('ProcessLinks');
    $(document).trigger('ShowResults');
}

//////////////////////////////////////////////////////////////////////

function ProcessLinks(evt) {

    for (i = 0; i < twitterdata.length; i++) {

        var url = twitterdata[i][2];

        if (url !== null) {

            $.getJSON("http://api.longurl.org/v2/expand?url=" + url + "&format=json&callback=?&user-agent=BahrainMapTest", function(result) {
                var longurl = result["long-url"];

                $(document).trigger('LongUrlReceived', longurl);
            });
        }
        else {
            twitterdata.splice(i, 1);
            i--;
        }
    }

}

//////////////////////////////////////////////////////////////////////

function LongUrlReceived(evt, longurl) {
    twitterdata[linkindex][2] = longurl;
    linkindex++;
    if (linkindex >= twitterdata.length) {
        $(document).trigger('ShowResults');
    }

}

//////////////////////////////////////////////////////////////////////

function ShowResults() {

    for (i = 0; i < twitterdata.length; i++) {

        var html = PrintTweet(twitterdata[i]);

        var latlng = findlocation(twitterdata[i][2]);
        
            
        if (latlng !== null) {
            
            latlng[0] = parseFloat(latlng[0])+randomDecimal();
            latlng[1] = parseFloat(latlng[1])+randomDecimal();
            

            //create the marker
            mapmarkers[i] = new google.maps.Marker({
                position: new google.maps.LatLng(latlng[0], latlng[1]),
                map: map,
                Icon: markerIcon,
                title: 'Marker ' + (i + 1),
                html: html,
                draggable: false
            });

            //show infoWindow when marker is clicked
            google.maps.event.addListener(mapmarkers[i], 'click', function() {
                infoWindow.setContent(this.html);
                infoWindow.open(map, this);
            });


        }

    }

}
//////////////////////////////////////////////////////////////////////
