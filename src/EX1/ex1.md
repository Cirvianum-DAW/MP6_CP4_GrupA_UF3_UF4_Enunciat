# Exercici:

Crea una pàgina web que obtingui dades de l'API de Star Wars (https://swapi.info/) i les mostri de manera estructurada. La pàgina web hauria de tenir les següents característiques.

Prioritza la funcionalitat per sobre de l'estètica. Teniu l'html amb alguns estils de Tailwind ja implementats.

## Part 1: Preparació (1p)

Crea't una funció genèrica `getData(url)` que utilitzi l'API Fetch per obtenir les dades de l'API de Star Wars. La funció hauria de retornar un objecte JSON amb les dades obtingudes i implementar una gestió d'errors per si l'operació de fetch falla.

## Part 2: Obtenir i mostrar els personatges amb informació bàsica (3p)

Quan la pàgina web es carregui, utilitza l'API Fetch per obtenir els personatges de l'API.
Mostra els personatges a ser possible en un format de "Card". Cada element de la llista hauria de mostrar el nom del personatge, el color dels ulls, del cabell, l'altura i el gènere.

## Part 3: Obtenir i mostrar informació addicional. (3p)

Modifica el codi per tal de poder mostrar informació addicional al final del "Card" com l'espècie del personatge i del planeta al qual pertany.

## Part 4: Ordenació (3p)

Permet als usuaris ordenar els personatges per nom, espècie o pel·lícula. Afegeix una barra d'ordenació a la part superior de la llista de personatges que permeti als usuaris seleccionar el criteri d'ordenació. Quan un usuari selecciona un criteri, la llista de personatges s'hauria d'actualitzar per reflectir l'ordenació seleccionada.
