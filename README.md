WBLG
====

Alternativní UI pro weblogy.cz - agregátor českých blogů zaměřených na internet a marketing.

Proč mít alternativní rozhraní
------------------------------
- Nechcete koukat na reklamy, twitter stream, upoutávky na další projekty iinfa
- Šetříte svůj drahocený FUP
- Prohlížíte si weblogy na mobilu a chybí vám responzivní verze
- Chcete mít svůj vlastní design

Kde vzít data
-------------
Naštestí weblogy poskytují svůj vlastní RSS feed, vzniklý agregací všech těch desítek a stovek českých blogů. Není tak třeba vytvářet a udržovat vlastní seznamy, stačí zpracovávat tento agregovaný feed - http://www.weblogy.cz/export/rss/


Žádný backend + žádný hosting = žádné problémy
----------------------------------------------
Bylo by snadné napsat krátký PHP skript, který by načetl RSS feed a vygeneroval stránku podle našich představ. Jenže pak příjdou ty problémy. Kde vzít hosting (ideálně zdarma), aby dovedl spouštět PHP skripty. Jak zálohovat, kde verzovat? Kterák se o svou práci podělit s dalšími?

Asi bude snazší od začátku celou věc postavit jinak. Když nebude třeba PHP, ale jen JavaScript na frontendu, nemusím mít chytrý hosting. Stačí takový, který umí statické stránky. A náhodou jeden takový (zdarma) poskytuje zrovna Github. A spolu s Githubem přichází další výhody - verzování/zálohování, dostupnost, možnost sdílet kód, snadné forkování. O GitHub pages si přečtěte na http://pages.github.com/.

Google Feed API
---------------
Jenže bez backendu nemůžeme načítat RSS feed přímo ve stránce JavaScriptem. Brání nám v tom Same Origin Policy. Můžeme ale využít API od Google, které problém řeší - https://developers.google.com/feed/ .  

Lze tak načíst RSS přímo v prohlížeči a nepotřebujeme žádný backend. Paráda. 

Lepíme věci dohromady
---------------------
Máme tedy vyřešeno, jak RSS feed načíst. Víme, kde hostovat. Zbývá vytvořit jednoduchou HTML stránku, přidat kapku JavaScriptu a okořenit špetkou CSS. Odpustíme si zbytečnosti jako jQuery, responzivní frameworky(bootstrap/foundation) a obrázky. Vznikne tak minimalistická varianta RSS čtečky. 

Když pak výsledek commitneme do větve 'gh-pages', github nám poskytne hotový výsledek na adrese username.github.io/wblb. 



