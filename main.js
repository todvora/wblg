google.load("feeds", "1");

google.setOnLoadCallback(initialize);

function initialize() {
    downloadAndRender(function(){
        var loaderElement = document.getElementById("loader");
        if (loaderElement != null) {
            loaderElement.parentNode.removeChild(loaderElement);
        }
    });
}

function downloadAndRender(doneCallback)  {
    var feed = new google.feeds.Feed("http://www.weblogy.cz/export/rss/");
    feed.setNumEntries(20);
    feed.load(function (result) {
        if (!result.error) {
            var container = document.getElementById("feed");
            var feedEntries = result.feed.entries;
            for (var i = 0; i < feedEntries.length; i++) {
                var feedEntry = feedEntries[i];
                container.appendChild(createArticleEntry(feedEntry));
            }
        } else {
            alert(result.error);
        }
        if(doneCallback != null) {
            doneCallback();
        }
    });
}

function createArticleEntry(entry) {
    var oneArticleDiv = document.createElement("div");

    // weblogy RSS feed provides in title both 'original blog name' and 'article title', separated by //
    var title = entry.title.split(" // ");

    var heading = document.createElement("h1");
    heading.appendChild(document.createTextNode(title[1]));

    var text = document.createElement("p");
    text.appendChild(document.createTextNode(entry.content));

    var author = document.createElement("span");
    author.appendChild(document.createTextNode(title[0]));
    author.setAttribute("class", "author");

    var date = document.createElement("span");
    date.appendChild(document.createTextNode(formatDate(entry.publishedDate)));
    date.setAttribute("class", "date");

    oneArticleDiv.appendChild(heading);
    oneArticleDiv.appendChild(text);
    oneArticleDiv.appendChild(author);
    oneArticleDiv.appendChild(date);

    // whole article div is link (good for small screen devices)
    var link = document.createElement("a");
    link.setAttribute("href", entry.link);

    link.appendChild(oneArticleDiv);
    return link;
}

var WEEKDAYS = new Array("neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota");

function formatDate(dateStr) {
    var date = new Date(dateStr);
    var result = "";
    result += WEEKDAYS[date.getDay()] + " ";
    result += date.getDate() + ".";
    result += (1 + date.getMonth()) + ".";
    result += date.getFullYear() + " ";
    result += date.getHours() + ":";
    result += date.getMinutes();
    return result;
}