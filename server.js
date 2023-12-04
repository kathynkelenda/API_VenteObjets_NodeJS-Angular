//Import du package http de node (1)
const http = require('http')  /*Permet de créer un serveur=unprogramme qui attend des requêtes http et qui va y repondre.
                                On a now accès à l'objet hhtp quei ns permet de créer un serveur*/

//Import de l'appli contenu ds app.js(7)
const app = require('./app');

//Renvoi un port valide s/f de nombre ou de chaîne
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

    //On dit à l'appli express sur quel port il tournera(9)
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Gestion des erreurs
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;  
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
//Création du serveur (2, 8)
const server = http.createServer(app)  /* Pr 2 : On call la meth createserver du package http. Elle prend coè argument la fxion qui 
                                    sera call à chaque fois requête reçue par le serveur. Elle reçois automatiquement 2
                                    argument, la requête et la réponse. 
                                    Pr 8 : On va passer en argument l'appli express crée ds app.js 
                                    Bref, l'appli crée par express ds app.js est une fxion qui recevra la requete 
                                    et la réponse, et qui les modifiera exactement coè on faisait avec la fxion qu'il
                                    y'avait avant et qui est expliquée pae 2(cfr notes) */

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
}); /**Pour les conditions ternaires, ça signifie :est-ce que l' "address" est de type "string" ? *
        Si oui, alors on écrit "pipe " + address, 
        si non, on écrit "port: "+port  */

//Pr l'écoute par le serveur des réponses envoyées (3)
server.listen(port);  /*Entre() se trouve le numérod du port que l'on va écouter. Pr défaut, en développement, on used le 
                       port 3000, mais il y'a des cas où le port 3000 isn't dispo. Alors, on va used une variable environ-
                       nement qui est process.env.port(used si l'environnement sur lequel tourne le serveur vs send un 
                       port à used) */











                      
                     
                      
                     
                      