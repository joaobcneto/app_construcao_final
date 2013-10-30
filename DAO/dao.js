// Inicialização
var localDB = null;
function teste(){
   try {
      if (!window.openDatabase) {
         updateStatus("Erro: Seu navegador não permite banco de dados.");
      } else {
         initDB(); // VER ESSA FUNÇÃO
         createTables();
         queryAndUpdateOverview();
         total(); // atualiza o total dos gastos
      }
   }
   catch (e) {
      if (e == 2) {
         updateStatus("Erro: Versão de banco de dados inválida.");
      } else {
         updateStatus("Erro: " + e + ".");
      }
      return;
   }
}

function initDB(){
    localDB = window.openDatabase('obraDB', '1.0', 'MyobraDB', 65536);
}

function createTables(){
    var query = 'CREATE TABLE IF NOT EXISTS obra(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, descricao VARCHAR NOT NULL, valor VARCHAR NOT NULL, src TEXT DEFAULT "null");';
	try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Tabela 'obra' status: OK.");
        });
    } catch (e) {
        updateStatus("Erro: Data base 'obra' não criada " + e + ".");
        return;
    }
}

