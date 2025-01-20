Specifikáció

**Rendszerterv:**

A féléves feladatom egy Trello által inspirált projekt menedzselő, ToDo
kezelő alkalmazás. A rendszerbe felvitt feladatokat projektekhez
rendeli. A projekteket illetve feladatokat lehet listázni, a feladatokat
akár projekt szerint szűrni. A feladatokhoz tartozik a projekt, amely
alá létrehozták, van neve, leírása, állapota (kész, nincs kész), illetve
a bejelentkezett felhasználó hozzárendelheti magát egy-egy feladathoz
(amelyhez más még nem csatlakozott), így látható, hogy ki foglalkozik
vele. Felhasználó regisztrálás lehetséges hagyományos módon. Az oldal
tartalma csak bejelentkezés után válik elérhetővé.


**Lokális futtatás:**
-  'backend' mappában található a módosított szerver oldali féléves feladatom API végpontokkal kiegészítve. A projektet csak futtatni kell.
-  'frontend' mappa tartalmazza az Angular frontendet, 'ng serve' parnccsal futtatható, az oldalon regisztrálni kell a tartalmak megtekintéséhez.


**Funkció/végpont lista:**

Task:
-   **GET** /Task

-   **GET** /Task/Create

-   **POST** /Task/Create

-   **GET** /Task/Update/{id}

-   **POST** /Task/Update

-   **GET** /Task/Delete/{id}

-   **GET** /Task/Assign/{id}

-   **GET** /Task/Detach/{id}

Projekt:

-   **GET** /Project

-   **GET** /Project/Create

-   **POST** /Project/Create

-   **GET** /Project/Update/{id}

-   **POST** /Project/Update

-   **GET** /Project/Delete/{id}

Home:

**Felhasznált technológiák:**

Backend:

-   Framework: C# .NET CORE ENTITY FRAMEWORK

-   Adatbázis: SQL, LiteDB

Frontend:

-   Framework: Angular

-   UI: CSS Bootstrap


**Tervezett design**

![A képen képernyőkép, szöveg, szoftver, Multimédiás szoftver látható
Automatikusan generált leírás](./image1.png)


