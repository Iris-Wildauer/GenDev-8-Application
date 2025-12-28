# DEVELOPER_GUILELINE.md

## Einleitung
Diese Guideline beschreibt die Erstellung eines minimalen Produktionsreifen Widget Microservice nach dem Speedboat Muster.

## Benötigte Technologien
Im Grundprinzip muss das Speedboat ein Server sein, welcher JSONs senden kann. Die Technologieauswahl ist frei wählbar. Diese Guideline verwendet Express.js und Docker als Beispiel-Stack.


## Setup
Für dieses Beispiel brauchen wir folgende Installation in diesem Fall mit npm:
 ```
npm init //für package files
npm install express //für den express server
npm install cors //für cross site scripting
```

## Core Widget Logik
Die gesendete JSON muss dieser Form entsprechen:

  ```
  {
		 category:  "Internet",
	   design:  "style1", //oder "style2"
	   data:  [  
			   { 
				   id:"",
				   title:"",
				   picture: "images/BildName"},
				} 
			] 
   } 
   ```

Beispiel Implementierung:
```
const  getInternetWidgets =() => {  
	return{
		 category:  "Internet",
		 design:  "style2",
		 data: [ 
		   {
			    id:  "widget-1",
			    title:  "News Widget",
			     picture:  "images/news.jpg" 
	     },
	     {
		     	id:  "widget-2",
		      title:  "Weather Widget",
	        picture:  "images/weather.jpg"
          } 
		]
	}; 
};   
module.exports =  { getInternetWidgets };`
```
## Server Setup

Das BFF-Backend ruft die Daten per REST-API auf.

```
server.js

const internet =  require("./internet.js");  
const express = require('express')  
const app = express();  
const port = 8081;  
const cors = require('cors');  
const path = require("path");  
  
app.use(cors())  
  
app.get('/', (req, res) => {  
    const internetInfo = internet.getInternetWidgets()  
    res.json(internetInfo)  
});  
  
app.listen(port, () => {  
    console.log(`Example app listening at ${port}`);
});
```
Am besten Verlagert man seinen Port in eine .env Datei.
```
package.json

{
   "scripts":{
		   "start":"node server.js" 
     }
}
       
```


## Docker Setup (optional)
```
FROM node:20-alpine  
  
WORKDIR /app/api/bff/widgets/internet  
  
COPY package*.json ./  
  
RUN npm install  
  
COPY . .  
  
ENV PORT=8081  
  
EXPOSE 8081  
  
CMD ["npm", "start"]
```

In einer Docker Compose würde das dann so aussehen:

```
internet:  
  build: app/api/widgets/internet/  
  ports:  
    - "8081:8081"  
  networks:  
    - app_network
```

## Bilder

Bilder liegen im eigenen `images/` Ordner des Speedboats (Port 8082)
**JSON-Pfad:** `"images/BildName"`  
**URL:** `http://localhost:8081/images/BildName`

## Das Speedboat im Backend einbauen

Das WebBFF ruft die Speedboat-Daten über die GET-Funktion ab und speichert sie zwischengespeichert in `cache.ts` für optimale Performance. Parallel wird das Internet-Widget in der `widgetOrder` der Benutzer hinterlegt, wodurch eine individuelle Reihenfolge der Widgets auf dem Dashboard festgelegt werden kann. Damit ist die Integration komplett abgeschlossen.

```mermaid
graph TD;
 1[User lädt Dashboard] --> 2[ WebBFF liest user.widgetOrder] --> 3[WebBFF ruft GET und cached die Response] --> 4[Speedboat antwortet mit JSON + Bild-URLs] --> 5[Frontend rendert Widgets in Reihenfolge]
 ```
 