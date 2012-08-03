//global variables
var map;
var Bahrain = new google.maps.LatLng(26.05, 50.55);
var markerIcon = "http://uploadpic.net/HYC1.png";
var mapmarkers = [];
var mappoints = {
    "الدير": "26.28417,50.62361",
    "سماهيج": "26.2826,50.6337",
    "قلالي": "26.27333,50.65028",
    "البسيتين": "26.26417,50.60637",
    "عراد": "26.2590,50.6306",
    "المحرق": "26.25722,50.61194",
    "الحد": "26.24556,50.65417",
    "المنطقة الدبلوماسية": "26.2429,50.5870",
    "رأس رمان": "26.23738,50.58558",
    "راس رمان": "26.23738,50.58558",
    "جد الحاج": "26.2343,50.5017",
    "جدالحاج": "26.2343,50.5017",
    "الحورة": "26.2337,50.5932",
    "السيف": "26.23222,50.53681",
    "كرباباد": "26.2306,50.5289",
    "كرانة": "26.22917,50.50944",
    "باربار": "26.2281,50.4804",
    "الحلة": "26.2278,50.5199",
    "النعيم": "26.2277,50.5684",
    "حلة عبدالصالح": "26.2275,50.5166",
    "السنابس": "26.2268,50.5456",
    "جنوسان": "26.2258,50.4948",
    "الديه": "26.2258,50.5357",
    "المقشع": "26.2222,50.5173",
    "القضيبية": "26.2210,50.5912",
    "جدحفص": "26.21861,50.54778",
    "دوار القدم": "26.21794,50.52132",
    "السلمانية": "26.21759,50.57114",
    "أبو صيبع": "26.2174,50.5023",
    "ابو صيبع": "26.2174,50.5023",
    "الدراز": "26.2164,50.4678",
    "القدم": "26.2164,50.5175",
    "الصالحيه": "26.2157,50.5590",
    "المنامة": "26.21536,50.5832",
    "الشاخورة": "26.21472,50.50694",
    "العدلية": "26.2146,50.5847",
    "جبلة حبشي": "26.2137,50.5275",
    "بني جمرة": "26.2135,50.4571",
    "بني جمره": "26.2135,50.4571",
    "الحجر": "26.2132,50.5117",
    "البديع": "26.21306,50.45",
    "عين الدار": "26.2122,50.5363",
    "مقابة": "26.2112,50.4851",
    "الجفير": "26.2110,50.6011",
    "الزنج": "26.2105,50.5652",
    "المرخ": "26.2084,50.4733",
    "البلاد القديم": "26.2080,50.5559",
    "الماحوز": "26.2079,50.5859",
    "المصلى": "26.20667,50.53868",
    "الخميس": "26.2064,50.5493",
    "الغريفة": "26.2055,50.6021",
    "السهلة الشمالية": "26.2079,50.5310",
    "السهلة الجنوبية": "26.2002,50.5317",
    "السهلة": "26.2048,50.5265",
    "أم الحصم": "26.2029,50.5951",
    "عذاري": "26.1990,50.5508",
    "القرية": "26.1979,50.4658",
    "أبوقوة": "26.1966,50.5146",
    "سار": "26.1953,50.4855",
    "الجنبية": "26.1909,50.4645",
    "توبلي": "26.1889,50.5501",
    "الحجير": "26.1850,50.5514",
    "سلماباد": "26.1834,50.5175",
    "النبيه صالح": "26.1821,50.5847",
    "نبيه صالح": "26.1821,50.5847",
    "جدعلي": "26.17917,50.56028",
    "مدينة عيسى": "26.17361,50.54778",
    "عالي": "26.1712,50.5458",
    "مدينة زايد": "26.1712,50.5458",
    "المهزة": "26.16944,50.62611",
    "جرداب": "26.1685,50.5721",
    "الجسرة": "26.1638,50.4520",
    "مركوبان": "26.1637,50.6166",
    "الخارجية": "26.16361,50.60472",
    "واديان": "26.15917,50.61111",
    "أبو العيش": "26.15875,50.62157",
    "أبوالعيش": "26.15875,50.62157",
    "سترة": "26.1534,50.6183",
    "سند": "26.1501,50.5837",
    "الكورة": "26.1458,50.4978",
    "بوري": "26.1458,50.4978",
    "العكر": "26.14306,50.61028",
    "الهملة": "26.1409,50.4604",
    "المعامير": "26.1359,50.6113",
    "النويدرات": "26.13472,50.5975",
    "بوكوارة": "26.1305,50.5623",
    "بو كوارة": "26.1305,50.5623",
    "الرفاع الشرقي": "26.12389,50.57361",
    "الرفاع الغربي": "26.13278,50.52028",
    "الرفاع": "26.13,50.555",
    "دمستان": "26.1260,50.4766",
    "مدينة حمد": "26.11528,50.50694",
    "كرزكان": "26.1123,50.4821",
    "المالكية": "26.09806,50.48667",
    "صدد": "26.0862,50.4907",
    "عوالي": "26.0854,50.5475",
    "شهركان": "26.0754,50.4993",
    "داركليب": "26.06861,50.50389",
    "دار كليب": "26.06861,50.50389",
    "عسكر": "26.0610,50.6160",
    "الصخير": "26.0566,50.5350",
    "الزلاق": "26.0475,50.48639",
    "جو": "25.99861,50.61667",
    "جزر حوار": "25.6508,50.753"
}

//create an infoWindow object to be used by markers on the map
var infoWindow = new google.maps.InfoWindow({
    maxWidth: 240
    });

function initialize() {

    var mapOptions = {
        zoom: 10,
        center: Bahrain,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("the_map"), mapOptions);

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

    var htmltext = '<p style="background-color:Beige"><img src="' + tweet[0] + '\" style="float:left; margin-bottom:20px; margin-right:10px;" /img><strong>' + tweet[1] + '</strong><br /><em style="font-size:70%;">' + tweet[2] + '</em><br /><span style="font-size:55%;">posted @ ' + tweet[3] + '</span></p>';

    //document.getElementById("txt").innerHTML += htmltext;

    return htmltext;

}

//////////////////////////////////////////////////////////////////////

function ProcessTweets(evt) {

    //show number of tweets found
    //document.getElementById("txt").innerHTML += "Total tweets found -->> " + response.results.length;

    for (i = 0; i < response.results.length; i++) {

        var tweet = response.results[i].text;
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
