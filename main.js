function constructUrl(feedLink) {
  var yql = 'select * from xml where url="' + feedLink + '"';
  return 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(yql) + '&format=json&diagnostics=false&callback=render';
}

function render(results) {
  var container = document.getElementById("feed");
  if(results.error) {
      console.error(results.error);
  } else {
    var items = results.query.results.rss.channel.item;
    items.forEach(function(item){
      container.appendChild(createArticleEntry(item));
    });

    var loaderElement = document.getElementById("loader");
    if (loaderElement !== null) {
      loaderElement.parentNode.removeChild(loaderElement);
    }
  }
}

function initialize()  {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', constructUrl('http://www.weblogy.cz/export/rss/'));
    document.getElementsByTagName('body')[0].appendChild(script);
}

function createArticleEntry(entry) {
    var oneArticleDiv = document.createElement("div");

    // weblogy RSS feed provides in title both 'original blog name' and 'article title', separated by //
    var title = entry.title.split(" // ");

    var heading = document.createElement("h1");
    heading.appendChild(document.createTextNode(title[1]));

    var text = document.createElement("p");
    text.appendChild(document.createTextNode(entry.description));

    var author = document.createElement("span");
    author.appendChild(document.createTextNode(title[0]));
    author.setAttribute("class", "author");

    var date = document.createElement("span");
    date.appendChild(document.createTextNode(getFormattedDate(entry.pubDate)));
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

var currentDate = new Date();
var TODAY = formatDate(currentDate, false);
var YESTERDAY = formatDate(new Date().setDate(currentDate.getDate() -1), false);

function getFormattedDate(dateStr) {
    var result = formatDate(dateStr, true);
    return result.replace(TODAY, "dnes").replace(YESTERDAY, "včera");
}

function formatDate(dateStr, includeTime) {
    var date = new Date(dateStr);
    var result = "";
    result += WEEKDAYS[date.getDay()] + " ";
    result += date.getDate() + ".";
    result += (1 + date.getMonth()) + ".";
    result += date.getFullYear();
    if (includeTime) {
        result = result + " ";
        result += date.getHours() + ":";
        result += padTwoDigits(date.getMinutes());
    }
    return result;
}

function padTwoDigits(n) {
    return (n < 10) ? ("0" + n) : n;
}

initialize();
