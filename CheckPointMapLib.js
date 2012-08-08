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
        zoom: 11,
        center: Bahrain,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //create map
    map = new google.maps.Map(document.getElementById("the_map"), mapOptions);
    
       
    //set zoom to 10 if on mobile
    var useragent = navigator.userAgent;

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
        map.setZoom(10);
    }
    
    /*overlay infobox image on map
    var imageBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(26.112, 50.456),
        new google.maps.LatLng(26.049, 50.390));
        
            
    var infobox = new google.maps.GroundOverlay("infobox.png", imageBounds);
    infobox.setMap(map); not working so commented out */
    
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

function hideInfo() {
    
    //hide the infodiv box when clicked
    document.getElementById("infodiv").style.display = "none";
    
}
//////////////////////////////////////////////////////////////////////

function formatTime(str){
    
    var d = new Date(str);
    //variable for AM/PM string
    var tt;

    if (d.getHours() >= 12) {
        tt = " PM</strong>";
        if (d.getHours() > 12) {
            d.setHours(d.getHours() - 12);
        }
    }
    else {
        tt = " AM</strong>";
        if (d.getHours() == 0) {
            d.setHours(12);
        }
    }

    //show local time in h:mm tt bold and underline, the (?:) if statement adds preceding zero for min [0-9]
    str = '<strong style="text-decoration:underline;">'+d.getHours() + ':' + (d.getMinutes()<10?'0':'') + d.getMinutes() + tt;
    //then date in ddd, dd mmm in a new line
    str += '<br />' + d.toLocaleString().substr(0, 3) + ', ' + d.toLocaleString().substr(8, 2)+ ' ' + d.toLocaleString().substr(4, 3);
    
    return str;
    
}
//////////////////////////////////////////////////////////////////////
var y = 1;
function randomDecimal() {
    y *= -1;
    var x = y * (Math.random() * 0.00075);
    return x;
    
}

//////////////////////////////////////////////////////////////////////

function findlocation(tweettext) {

    var latlng = null;
    for (point in mappoints) {
        if (mappoints.hasOwnProperty(point)) {

            if (point == tweettext.match(point)) {
                latlng = extractLatLng(mappoints[point]);
                //add the location name to latlng array
                latlng.push(point)
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

    var htmltext = '<div style="font-family: Tahoma;"><img src="' + tweet[0] + '\" style="height:28px; vertical-align: middle; border: lightgrey solid; border-width:1px; border-radius:4px;" /img>\n\
<a href="https://twitter.com/' + tweet[1] + '\" title="User Profile"><strong> @' + tweet[1] + '</strong></a></div>\n\
<div style="font-family: Tahoma; clear:both; background-color:GhostWhite; padding: 5px; margin-top: 2px; margin-bottom: 0; border-radius:8px;">\n\
<div style="font-size:75%; direction:rtl; text-align: right;">' + tweet[2].replace(/(@|#)\w+/g, "") + '</div>\n\
<div style="font-size:60%; direction:ltr; text-align: left; margin-top:3px;">' + tweet[3] + '</div>\n\
</div>';

    //document.getElementById("txt").innerHTML += htmltext;

    return htmltext;

}

//////////////////////////////////////////////////////////////////////

function ProcessTweets(evt) {

    for (i = 0; i < response.results.length; i++) {

        //create <a> tags for all links in a tweet using regexp $& = ($1,$2,$3...etc)
        var tweet = response.results[i].text.replace(/(\b(http|https):\/\/\S+)/g, '<a href="$&">$&</a>');
        //var tweeturl = extractURL(tweet);
        //Add an @ sign to the profile name as done on twitter
        var profilename = response.results[i].from_user;
        var profileimage = response.results[i].profile_image_url;
        //format time stamp to show as Day, dd mmm @ h:mm TT
        var timestamp = formatTime(response.results[i].created_at);

        twitterdata[i] = [profileimage, profilename, tweet, timestamp];

    }

    //$(document).trigger('ProcessLinks'); //expand links and find sent google maps coordinates to create exact markers
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
            

            //create the markers
            mapmarkers[i] = new google.maps.Marker({
                position: new google.maps.LatLng(latlng[0], latlng[1]),
                map: map,
                Icon: markerIcon,
                title: latlng[2]+ ' ' + (i + 1), //location name
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
