# Problema del agente viajero
Taller #1 de sistemas basados en geolocalización
## Problema
Una agencia de viajes quiere optimizar los tiempos de recorrido para 10 ciudades 
teniendo en cuenta las distancias entre ellas y las demoras que cotidianamente surgen 
en los aeropuertos de las mismas. Para ello se propone el uso de algoritmos o heurísticas
que solucionen el problema del Agente Viajero (TSP), en donde se deben establecer 
como valores en los arcos (el valor de arco se define como el esfuerzo necesario para 
llegar de un punto a otro representado en un valor numérico) las distancias recorridas 
en línea recta más los tiempos de retraso en cada aeropuerto.

Entrega: Sistema de software que reciba como parámetros un archivo en el que se 
encuentra la lista de ciudades que se quieren recorrer con sus respectivas informaciones 
de localización geográfica, tiempos de demora en aeropuerto y su nombre. Después de 
procesar esta información, el sistema deberá presentar en pantalla la lista ordenada de 
las ciudades a visitar, la cual es producto de algoritmo o heurística TSP aplicado, con su 
respectiva ubicación en un mapa dinámico.

**Nota:** El problema del agente viajero es conocido por ser NP-completo, lo que significa que no se conoce ningún algoritmo eficiente que pueda resolverlo para todos los casos en un tiempo razonable.

## Otros
Para la lista de ciudades es posible usar el formato estandar GeoJSON, aunque aquí se usa su equivalencia con db_file.json y para los puntos a generar.

