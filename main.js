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
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                container.appendChild(createEntry(entry));
            }
        }
        if(doneCallback != null) {
            doneCallback();
        }
    });
}

function createEntry(entry) {
    var div = document.createElement("div");

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


    div.appendChild(heading);
    div.appendChild(text);
    div.appendChild(author);
    div.appendChild(date);

    var link = document.createElement("a");
    link.setAttribute("href", entry.link)

    link.appendChild(div);
    return link;
}

function formatDate(dateStr) {
    var date = new Date(dateStr);
    var weekday = new Array("neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota");
    var result = "";
    result += weekday[date.getDay()] + " ";
    result += date.getDate() + ". ";
    result += (1 + date.getMonth()) + ". ";
    result += date.getFullYear() + ". ";
    result += date.getHours() + ":";
    result += date.getMinutes();
    return result;
}