# Aplikacija MojSodnik
Projekt pri predmetu Spletno programiranje

Prva faza projekta je na voljo na ogled na klavdij.gstarman.com - naložena je na domačem strežniku.

Za svoj projekt pri predmetu bom razvil spletno aplikacijo z imenom MojSodnik. To je aplikacija namenjena vsem košarkarskim sodnikom za lažje vodenje evidence tekem, izplačil, kilometrin ter poročil o tekmah. Vsak sodnik bo lahko tudi naložil poročilo o tekmi ter zraven dodal še svoj komentar, da bo lahko vodil evidenco katerim stvarem mora posvetiti več pozornosti v prihodnjih tekmah.
Aplikacija bo s scrapanjem podatkov iz strani Košarkarske zveze Slovenije (http://www.kzs.si/tekmovanja-in-projekti/zveza/informacije-za-sodnike-in-komisarje/), tvorila bazo za vsakega posameznega sodnika. Te podatki se bodo potem prikazovali na strani v obliki tabel, zraven pa se bo izvajalo še računanje posameznih stroškov iz vpisanih podatkov o taksah in kilometrin, ...
V aplikacijo se bo vsak sodnik prijavil s svojim uporabniškim imenom in geslom (vsebuje avtorizacijo). Odprla se mu bo nova stran kjer bo njegov "dashboard", kjer bo lahko izbral tekme za posamezni mesec oz. leto.
Tekme se bodo zvrstile v tabelo, kjer bo v posamezni vrstici več elementov, ki bodo opisovale posamezno tekmo, kdo je bil sosodnik ter možnost dodajanja podatkov za kilometrino, dnevnico ter podatkov o tekmi (poročila o tekmi ter lastnega komentarja). Zadnji dve stvari bosta v form obliki, ki ste bosta po verifikaciji vnesli v bazo.
Vsak sodnik bo imel tudi možnost nastavitev svojega profila - spreminjanja gesla ter nalaganja profilne fotografije.

#Poročilo 1. faze

Spletno stran sem stestiral v brskalnikih Safari, Firefox ter Google Chrome. Pri vseh vse funkcionalnosti delajo normalno, po pričakovanjih, razvijal sem namreč le s pomočjo Google Chroma. Pri Firefoxu je potrebno paziti za stiliranje list, kjer je treba posebaj nastaviti stil liste, da nam pri li elementih ne da "pikic". Sicer pa so danes moderni browserji vsi na približno istem nivoju, sama stran pa tudi nima posebno zahtevnih gradnikov, ki bi se prikazovali drugače na drugih brskalnikih.

Dve funkcionalnosti na kateri sem kar ponosen je celoten look and feel aplikacije, ki deluje zelo čisto, je minimalističen ter tudi način kako izpade na samem telefonu. Všeč mi je tudi gradnik za dashboard, kjer bom v drugi fazi sicer še kar dodelal sam table, da bo lepši ter da bo tudi scrollanje lepše in uporabniška izkušnja boljša.
Zelo mi je tudi všeč, kako je izpadel stranski meni za navigiranje po spletni strani, predvsem zaradi občutka globine ter samega dizajna. Pri urejanju sem tudi dodal modal, ki nam bo kasneje omogočal dodajanja komentarja tekme v bazo. Tukaj bom razmislil še katero funkcionalnost bi najbolj prav prišla sodniku - uporabniku.

Sama spletna stran je bila v prvi fazi zasnovana zelo preprosto, v drugi fazi, kjer pa bom vse to povezal tudi z pridobivanjem podatkov pa se bo sama kompleksnost spremenila. Poskusil bom se malo polepšati dashboard ter ga mogoče dodati še kakšno funkcionalnost, sicer pa bom čim bolj dodelal glavno tabelo ter spodnji izpis v footerju, da bodo uporabniku najpomembnješi podatki najbolj jasni. 