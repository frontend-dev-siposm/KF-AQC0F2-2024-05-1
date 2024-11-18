Specifikáció

**Rendszerterv:**

A féléves feladatom egy Trello által inspirált projekt menedzselő, ToDo
kezelő alkalmazás. A rendszerbe felvitt feladatokat projektekhez
rendeli. A projekteket illetve feladatokat lehet listázni, a feladatokat
akár projekt szerint szűrni. A feladatokhoz tartozik a projekt, amely
alá létrehozták, van neve, leírása, állapota (kész, nincs kész), illetve
a bejelentkezett felhasználó hozzárendelheti magát egy-egy feladathoz
(amelyhez más még nem csatlakozott), így látható, hogy ki foglalkozik
vele. Felhasználó regisztrálás lehetséges hagyományos módon vagy
facebook fiókkal is. Az oldal tartalma csak bejelentkezés után válik
elérhetővé.

**Funkció/végpont lista:**

Task:

-   **GET** /Task/Create

-   **POST** /Task/Create

-   **GET** /Task/Update/{id}

-   **POST** /Task/Update

-   **GET** /Task/Delete/{id}

-   **GET** /Task/GetImage?userid={userid}

-   **GET** /Task/Assign/{id}

-   **GET** /Task/Detach/{id}

Projekt:

-   **GET** /Project/Index

-   **GET** /Project/Details/{id}

-   **GET** /Project/Create

-   **POST** /Project/Create

-   **GET** /Project/Update/{id}

-   **POST** /Project/Update

-   **GET** /Project/Delete/{id}

Home:

**Felhasznált technológiák:**

Backend:

-   Framework: C# .NET

-   Adatbázis: SQL, LiteDB

Frontend:

-   Framework: Angular

-   UI: CSS Bootstrap


**Tervezett design**

![A képen képernyőkép, szöveg, szoftver, Multimédiás szoftver látható
Automatikusan generált leírás](./image1.png)


