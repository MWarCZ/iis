
---
**Obsah**
- [1. Cíl projektu](#1-cíl-projektu)
- [2. Rozsah implementace](#2-rozsah-implementace)
- [3. Implementační prostředky](#3-implementační-prostředky)
	- [3.1 Uživatelské rozhraní](#31-uživatelské-rozhraní)
	- [3.2 Implementační prostředí](#32-implementační-prostředí)
- [4. Dokumentace](#4-dokumentace)
- [5. Řešitelské týmy](#5-řešitelské-týmy)
- [6. Odevzdání](#6-odevzdání)
- [7. Body](#7-body)
- [Pokyny k tématu Internetový obchod.](#pokyny-k-tématu-internetový-obchod)

---

# 1. Cíl projektu

Cílem projektu je implementovat informační systém s webovým rozhraním, podle návrhu provedeného v rámci předmětu Databázové systémy (IDS) pro zvolené zadání (případně zadání z předmětu IUS). Výjimku tvoří téma Internetový obchod (viz níže). Postup řešení by měl být následující:
- Volba implementačního prostředí - databázového serveru a aplikační platformy
- Implementace navrženého databázového schématu ve zvoleném DB systému
- Návrh webového uživatelského rozhraní aplikace
- Implementace vlastní aplikace

# 2. Rozsah implementace

Implementovaný systém by měl být prakticky použitelný pro účel daný zadáním. Mimo jiné to znamená:
- Musí umožňovat vložení odpovídajících vstupů.
- Musí poskytovat výstupy ve formě, která je v dané oblasti využitelná. Tedy nezobrazovat obsah tabulek databáze, ale prezentovat uložená data tak, aby byla pro danou roli uživatele a danou činnost užitečná (např. spojit data z více tabulek, je-li to vhodné, poskytnout odkazy na související data, apod).
- Uživatelské rozhraní musí umožňovat snadno realizovat operace pro každou roli vyplývající z diagramu případů použití (use-case). Je-li cílem např. prodej zboží, musí systém implementovat odpovídající operaci, aby uživatel nemusel při každém prodeji ručně upravovat počty zboží na skladě, pamatovat si identifikátory položek a přepisovat je do objednávky a podobně.

Kromě vlastní funkcionality musí být implementovány následující funkce:

- Správa uživatelů a jejich rolí (podle povahy aplikace, např. obchodník, zákazník, administrátor). Tím se rozumí přidávání nových uživatelů u jednotlivých rolí, stejně tak možnost editace a mazání nebo deaktivace účtů. Musí být k dispozici alespoň dvě různé role uživatelů.
- Ošetření všech uživatelských vstupů tak, aby nebylo možno zadat nesmyslná nebo nekonzistentní data.
    - Povinná pole formulářů musí být odlišena od nepovinných.
    - Hodnoty ve formulářích, které nejsou pro fungování aplikace nezbytné, neoznačujte jako povinné (např. adresy, telefonní čísla apod.) Nenuťte uživatele (opravujícího) vyplňovat desítky zbytečných řádků.
    - Při odeslání formuláře s chybou by správně vyplněná pole měla zůstat zachována (uživatel by neměl být nucen vyplňovat vše znovu).
    - Pokud je vyžadován konkrétní formát vstupu (např. datum), měl by být u daného pole naznačen.
    - Pokud to v daném případě dává smysl, pole obsahující datum by měla být předvyplněna aktuálním datem.
    - Nemělo by být vyžadováno zapamatování a zadávání generovaných identifikátorů (cizích klíčů), jako např. ID položky na skladě. To je lépe nahradit výběrem ze seznamu. Výjimku tvoří případy, kdy se zadáním ID simuluje např. čtečka čipových karet v knihovně. V takovém případě prosím ušetřete opravujícímu práci nápovědou několika ID, která lze použít pro testování.
    - Žádné zadání nesmí způsobit nekonzistentní stav databáze (např. přiřazení objednávky neexistujícímu uživateli).
- Přihlašování a odhlašování uživatelů přes uživatelské jméno a heslo. Automatické odhlášení po určité době nečinnosti.

# 3. Implementační prostředky

## 3.1 Uživatelské rozhraní
- HTML5 + CSS, s využitím JavaScriptu, pokud je to vhodné. Je povoleno využití libovolných volně šířených JavaScriptových a CSS frameworků (jQuery, Bootstrap, atd.)
- Případně lze využít i AJAX či pokročilejší klientské frameworky (Angular, React, apod.), není to ale vyžadováno.

Rozhraní musí být funkční přinejmenším v prohlížečích Chrome, Firefox a Internet Explorer.

## 3.2 Implementační prostředí
- PHP + MySQL (server eva nebo jiný dostupný), případně libovolný open source PHP framework.
- Alternativně jiná serverová technologie (např. Java, .NET, Python, Ruby, apod.) - kontaktujte J. Hynka a domluvte se na detailech.

Při použití relační databáze specifikujte integritní omezení (např. unikátní hodnoty, cizí klíče, apod.) při vytváření databáze. Neponechávejte zajištění konzistence dat pouze na aplikaci. V MySQL je k tomu třeba použít tabulky typu InnoDB (typ je možno zvolit při vytváření tabulky nebo změnit dodatečně).

Použití jiné platformy je možné, ale je nutné se předem domluvit se cvičícím a samostatně si zajistit umístění vytvořené aplikace, aby bylo možno ji předvést.

# 4. Dokumentace
Součástí projektu je stručná dokumentace k implementaci, která popisuje, které PHP skripty (případně kontrolery, presentery apod. podle zvoleného frameworku) implementují jednotlivé případy použití uvedené v use-case diagramu z IDS. V případě, že bylo nutno při implementaci učinit změny v návrhu, musí být v dokumentaci zdůvodněny. Tato dokumentace je součástí dokumentu doc.html, viz níže.

# 5. Řešitelské týmy
Řešení projektů probíhá v týmech (obvykle dvojicích) stejného složení jako předchozí řešení v IDS. Pokud se původní tým rozpadl, je doporučeno vytvořit tým s jiným, podobně postiženým řešitelem i za cenu změny zadání. V nouzi může řešitel pracovat sám, znamená to ale odvést podstatně více práce (nelze odevzdat poloviční projekt). Složení týmu musí být uvedeno v souboru doc.html, viz níže.

Nejpozději do 1.11.2018 se členové týmu ujistí, že spolupráce funguje, nejlépe tím, že začnou na projektu pracovat. Do tohoto termínu také prosím založte tým v IS FIT a přihlaste se na projekt. V případě výpadku nebo nespolupráce jednoho člena lze situaci ohlásit a řešit opět výše uvedeným způsobem. Po tomto datu již změny nejsou možné - projekt by se již pravděpodobně nestihnul dokončit. Ostatní problémy v týmu budou řešeny individuálně.

# 6. Odevzdání
Odevzdání probíhá přes IS FIT. Od okamžiku odevzdání nejméně do 31.1.2019 musí být dále funkční aplikace přístupná přes síť Internet na některém fakultním nebo jiném serveru. Tato aplikace musí umožňovat přihlášení pod všemi rolemi uživatelů a musí být naplněna ukázkovými daty, na kterých lze vyzkoušet všechny funkce. Pokud je to technicky možné, použijte umístění http://www.stud.fit.vutbr.cz/~xlogin00/IIS. Vyhnete se případným problémům s funkčností hostingu. Výjimku tvoří předem domluvená a individuálně předvedená řešení na exotických platformách.

Přes IS se odevzdává jeden archiv pojmenovaný vas_login.zip obsahující:

- Všechny zdrojové kódy a datové soubory aplikace. Vzhledem k limitu velikosti odevzdaného souboru ve WISu (2 MB) odevzdávejte pouze vlastní kód a data. Neodevzdávejte prosím kódy použitých knihoven a frameworků třetích stran. Místo toho uveďte pouze jejich verze v dokumentaci.
- SQL skript nebo jiný prostředek pro vytvoření a inicializaci schématu databáze.
- Soubor doc.html obsahující dokumentaci. Stáhněte si šablonu dokumentace, editujte a přiložte k odevzdanému projektu. Respektujte prosím pokyny obsažené v tomto souboru. Některé pokyny mají formu komentářů v HTML kódu šablony.

Za každý tým odevzdává pouze vedoucí týmu.

Termín pro odevzdání do IS FIT je 3.12.2018. Po tomto termínu již nelze projekt akceptovat.

# 7. Body
Za projekt je možno získat až 30 bodů.

----
----

# Pokyny k tématu Internetový obchod.

Toto téma je ze značné části řešeno na přednáškách. Řešení z přednášek je v projektu možno využít. Aby však řešitelé tohoto tématu nebyli zvýhodněni vůči ostatním, bude v projektu požadováno následující rozšíření:
- Zákazník bude mít možnost tisknout faktury k již ukončeným (dodaným) objednávkám. Faktura musí obsahovat alespoň údaje o dodavateli (internetovém obchodě), odběrateli, číslo objednávky a účtované položky.
- Obsluha obchodu bude moci tisknout uskutečněné objednávky.
- Systém bude evidovat dodavatele (externí společnost) pro každou nabízenou položku zboží. V obchodě může být nabízeno i zboží, které právě není skladem. Zákazník musí být informován o přibližné době dostupnosti. Tato doba bude v systému zadána pro každého dodavatele. Systém musí obsluze obchodu umožnit objednání zboží u dodavatele, pokud není na skladě, zaevidování zboží dodaného od dodavatele a vyřízení čekajících objednávek. Zákazník i obsluha musí mít možnost sledovat stav objednávky.

