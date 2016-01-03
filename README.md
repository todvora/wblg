WBLG
====

Alternativní UI pro [weblogy.cz](http://www.weblogy.cz) - agregátor českých blogů zaměřených na internet a marketing.

Demo / běžící aplikaci si můžete prohlédnout na http://todvora.github.io/wblg

[![Build Status](https://travis-ci.org/todvora/wblg.svg)](https://travis-ci.org/todvora/wblg)

Proč mít alternativní rozhraní
------------------------------
- Nechcete koukat na reklamy, twitter stream, kalendář, upoutávky na ostatní projekty iinfa.
- Šetříte svůj drahocený FUP (alternativa je 12-25x úspornější, naměřená data níže).
- Prohlížíte si weblogy na mobilu a chybí vám responzivní verze.
- Chcete mít svůj vlastní design stránky.

Kde vzít data
-------------
Weblogy poskytují svůj vlastní [RSS feed](http://www.weblogy.cz/export/rss/), vzniklý agregací všech těch desítek a stovek skvělých českých blogů. Není tak třeba vytvářet a udržovat vlastní seznamy RSS kanálů, stačí zpracovávat tento agregovaný feed.


Žádný backend + žádný hosting = žádné problémy
----------------------------------------------
Bylo by snadné napsat krátký PHP skript, který načte RSS feed a vygeneruje stránku s náhledy článků. Jenže pak přijdou ty problémy. Kde vzít hosting (ideálně zdarma), aby dovedl spouštět PHP skripty. Jak zálohovat, kde verzovat? Kterak se o svou práci podělit s dalšími?

Asi bude snazší od začátku celou věc postavit jinak. Když nebude třeba PHP, ale jen JavaScript na frontendu, nemusím mít plnohodnotný hosting. Stačí takový, který umí statické stránky. A náhodou takový hosting zdarma poskytují [GitHub Pages](http://pages.github.com/). S GitHubem přichází další výhody automaticky - verzování a zálohování, dostupnost, možnost sdílet kód, snadné forkování. 

Google Feed API
---------------
Jenže bez backendu nemůžeme načítat RSS feed přímo ve stránce JavaScriptem. Brání nám v tom [Same Origin Policy](http://en.wikipedia.org/wiki/Same-origin_policy). Můžeme ale využít [Feed API](https://developers.google.com/feed/) od Google, které problém řeší (obchází) a umožňuje načíst RSS JavaScriptem v prohlížeči. Nepotřebujeme žádný backend, paráda. 

Dáváme věci dohromady
---------------------
Máme tedy vyřešeno, jak RSS feed načíst. Víme, kde hostovat. Zbývá vytvořit jednoduchou HTML stránku, přidat pár řádek JavaScriptu a nastylovat. Odpustíme si zbytečnosti jako jQuery, responzivní framework (Bootstrap/Foundation) a grafiku. Mým cílem je minimalistická varianta RSS čtečky. 

Když pak zdrojáky commitneme do větve `gh-pages`, GitHub nám poskytne běžící aplikaci na adrese http://todvora.github.io/wblg

Kolik toho FUPu ušetřím?
---------------------------
Originální [weblogy.cz](http://www.weblogy.cz) na první načtení udělají 49 requestů, přenesou 800KB dat. Moje minimalistická verze udělá 8 requestů a přenese 66KB. První načtení je zhruba 12x úspornější na data. Každé další načtení je ještě lepší. Originál weblogy.cz jsou na 407KB a moje varianta na 16KB, tedy zhruba 25x úspornější. Na mobilu s velmi špatným a limitovaným připojením zásadní rozdíl. Navíc jednoduchá stránka nezabere tolik paměti telefonu a je responzivní - lépe se ovládá. 

Je libo vlastní variantu?
-------------------------
Líbí se vám nápad? Klidně používejte mou stránku http://todvora.github.io/wblg . Pak ale budete odkázáni na vzhled a chování, které vyhovuje mě. A co je dobré pro mě nemusí být super pro vás.

Jsme ale na GitHubu, tak toho využijme. Stačí, když si tenhle projekt [forknete](https://github.com/todvora/wblg/fork). V tu chvíli máte bez práce vlastní připravenu vlastní instanci. Tu si můžete měnit k vašim představám. Jen provedete úpravu a commitnete. Nic víc není třeba. První push do vaší větve `gh-pages` spustí build a během několika minut máte dostupnou aplikaci na `vasejmeno.github.io/wblg` (samotný fork zřejmě nespustí build `gh-pages` větve a nenasadí ji, [je třeba první push](http://stackoverflow.com/questions/8587321/github-pages-in-forked-repo)).  


Je to fér k originálním weblogům?
---------------------------------
Doufám, že ano. V zásadě jde jen o webovou RSS čtečku, přístupnou bez přihlášení. Weblogy poskytují RSS feed dobrovolně a veřejně. A já sám svůj [blog](http://www.tomas-dvorak.cz) také poskytuji weblogům ke zpracování. Pokud ale na věc máte jiný názor, rád si jej přečtu a zvážím, ať již na twitteru [@tdvorak](https://twitter.com/tdvorak) nebo na e-mailu [todvora@gmail.com](mailto:todvora@gmail.com).


Adblock friendly
----------------
Nebaví vás články určitého autora? Žádný problém. Každý článek má přidánu CSS třídu se jménem blogu. Lze tak snadno přidat další adblock pravidlo a články onoho autora skrýt. 
Například: 

```
###feed > .POOH-CZ
```