# F4B FRILUFT
Tech Store 2.0 
https://github.com/FredrikLjungqvist/F4B.git

### Gruppen
Fredrik Ljungqvist - projektledare
Axel Sundin
Linda Gustafsson 
Niklas Hådell
Susan Isaksson

### Inloggning 
Admin: anv: admin / pw: admin
User: registrera dig själv sidan

### Kravspecifikation på projektet: 
 

#### Alla sidor skall vara responsiva. (G) - KLART 

#### Arbetet ska implementeras med objektorienterade principer. (G) - KLART 

#### Skapa ett konceptuellt ER diagram, detta ska lämnas in vid idégodkännandet (G) - KLART 

#### Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet (G) - KLART 
Se bifogat dokument F4B-projektidé.docx 

#### All data som programmet utnyttjar ska vara sparat i en MYSQL databas (produkter, beställningar, konton mm) (G) - KLART 

Vår databas heter f4b och innehåller följande tabeller: cartitem, category, newsletter, newsletter_user, orderitems, orders, productcategory, products, shipper och user. 

#### Det ska finnas ett normaliserat diagram över databasen i gitrepot (G) - KLART 

#### Man ska kunna logga in som administratör i systemet (G) - KLART 
Inloggningen görs via “gubben” i header och user som roll är default. En blivande administratör skapar alltid ett user-konto först, för att sedan kunna ansöka som admin via en knapp när denne är inloggad. Ansökan hanteras sedan av en admin, som godkänner eller nekar ansökan. 

#### Inga Lösenord får sparas i klartext i databasen (G) - KLART 
Alla lösenord är hashade. 

#### En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G) - KLART 
En inloggad user/admin beställer produkter på main-sidan – lagersaldot i databasen påverkas först när beställningen är bekräftad i varukorgen.  

#### Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G) - KLART 
Administratören kan som inloggad och i “Adminvyn”, uppdatera antalet produkter i lager vid “Change in stock”.  

#### Administratörer ska kunna se en lista på alla gjorda beställningar (G) - KLART 
Administratören kan som inloggad och i “Adminvyn”, se lista på alla gjorda beställningar i “ordersvyn” - gjorda orders, shipped orders och complete orders.. 

#### Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G) - KLART 
Sidans produkter ingår i en kategori. Vi har valt att ha tre huvudkategorier, bärsystem, fritidskläder och kringutrustning som kan visas tillsammans eller var för sig i “kategorier” i “header” på förstasidan. Vi har även ytterligare två kategorier, lättviktsutrustning och säsongsRea, där produkter från huvudkategorierna väljs ut och presenteras.  

#### Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G) - KLART 
Vi har löst detta genom att lägga alla kategorier i en dropDown-meny där man kan välja att se alla kategorier samtidigt, eller bara välja en specifik. 

#### Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i session på servern (G) - KLART 
Vi har valt att spara i databasen istället för session. Det innebär att inloggad user kan se sin varukorg och valda produkter, oavsett på vilken enhet inloggningen sker.  

#### Man ska från hemsidan kunna skriva upp sig för att få butikens nyhetsbrev genom att ange sitt namn och epostadress (G) - KLART 
Vi har valt att spara eposten, för att skicka ut generella nyhetsbrev. Möjligheten att skriva upp sig för nyhetsbrev finns i header, vid registrering och vid “bekräfta order” i varukorgen.  

#### Administratörer ska kunna se en lista över personer som vill ha nyhetsbrevet och deras epost adresser (G) - KLART 
Vi valde att skapa en "adminvy” där tre stora knappar finns. En av dessa står det newsLetter på, klickar man på den får man upp 3 knappar där man ska trycka på “users with newsletter”. Där finner du personer som valt att få nyhetsbrev. 

#### Tillgängliga fraktalternativ ska vara hämtade från databasen (G) - KLART 
I databasen “shipper” har vi tre fraktalternativ och dessa presenteras i kundkorgen i samband med att beställningen bekräftas av kund.  

#### Besökare ska kunna välja ett av flera fraktalternativ (G) - KLART 
Inne på kundkorgen finner man olika fraktalternativ. Vi valde Bring, PostNord och DHL.  

#### Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen (VG) - KLART 
Vi valde att man inne på “huset” (ens egen sida) har en knapp där man kan begära att bli admin.  

#### En administratör behöver godkännas av en tidigare administratör innan man kan logga in fösta gången (VG) - KLART  
Vid registrering blir user och begär därefter att bli admin. Förfrågningen hamnar på “adminvyn” lite länge ner i “pending admins”. Där kan Admin  neka/godkänna förfrågningen. 
 
#### Administratörer ska kunna markera beställningar som skickade (VG) - KLART 
Admin kan godkänna ordern som skickad i “adminvyn” på knappen “orders” väl inne i orders finner man “orders to approve” och kan sedan styra vilka som ska godkännas.  

#### När man gör en beställning ska man också få chansen att skriva upp sig för nyhetsbrevet (VG). - KLART 
Inne på “kundvagnen” kan man bocka i att man vill skriva upp sig på nyhetsbrev, men det steget kan man även göra vid registrering. 

#### När besökare gör en beställning ska hen få ett lösenord till sidan där man kan logga in som kund. Det är ok att spara all kundinformation i användartabellen, ni behöver alltså inte ha en separat costumer tabell om inloggning finns (VG) - KLART 
Vi har valt att kunden ska ha en inloggning och konto för att kunna beställa något. 
Vi vill att våran F4B-FRILUFT sida ska vara exklusiv. Vi vill kunna ha en överblick över kunder för att säkerställa betalningar mm. 
Innan du blivit kund kan du alltså inte handla något utan av varje klick på sidan kommer vår login-modal upp där man kan logga in eller registrera sig. 

#### När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (VG) - KLART 
Inloggad kund/admin kan via “huset” och “min sida” se alla gjorda beställningar och en status anger om ordern är “under behandling (1)”, “skickad (2)” eller “mottagen (3)”.  

#### Som inloggad kund ska man kunna markera sin beställning som mottagen (VG) - KLART 
Inloggad kund/admin kan via “huset” och “min sida” markera sin beställning mottagen via “tidigare beställningar” där tidigare och nya beställningar visas. Detta görs med knappen “mottagen” och beställningens status ändras till “3” som betyder “mottagen”.  

#### Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG) - KLART 
Administratören kan som inloggad och i “Admin vyn” redigera kategori för produkt genom att ange “productID” och categoryID i “Set category of product” som sedan sparas i databasen “productcategory”. 
 
#### Administratörer ska kunna skicka nyhetsbrev från sitt gränssnitt, nyhetsbrevet ska sparas i databasen samt innehålla en titel och en brödtext (VG) - KLART 
Administratören kan som inloggad och i “Admin vyn”, välja “Newsletter” och “add newsletter”. Därefter fylla i titel och brödtext som sparas i databasen newsletter. En lista på emailadresser för newletter finns i “users with newsletter”.  

#### Administratörer ska kunna lägga till och ta bort produkter (VG) - KLART 
Administratören kan som inloggad och i “Admin vyn” lägga till (“Create a new product”) och ta bort (“Delete product”) produkter. 

 
