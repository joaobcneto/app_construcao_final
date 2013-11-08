function onUpdate(Item){

    var id = Item.getId();
    var descricao = Item.getDescricao();
    var valor = Item.getValor();
	var imagem = Item.getImagem();
	
    if (descricao == "" || valor == "" || imagem == "") {
        updateStatus("'descrição', 'valor' e 'imagem' são campos obrigatórios!");
    } else {
        //var query = "update obra set descricao=?, valor=?,  where id=?;";
		var query = "update obra set descricao=?, valor=?, src=? where id=?;";
        try {
            localDB.transaction(function(transaction){
                //transaction.executeSql(query, [descricao, valor, id], function(transaction, results){
				transaction.executeSql(query, [descricao, valor, imagem, id], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Erro: Update não realizado.");
                    }
                    else {
                        updateForm("", "", "", "");
                        updateStatus("Update realizado:" + results.rowsAffected);
                        queryAndUpdateOverview();
						
						// faz sumir a imagem do formulário após o update
						$('img[name=imagem]').attr('src','');
						$('img[name=imagem]').css('display','none');
						
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Erro: UPDATE não realizado " + e + ".");
        }
    }
    total();
}

function onDelete(Item){
    var id = Item.getId();
    
    var query = "delete from obra where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Erro: Delete não realizado.");
                }
                else {
                    updateForm("", "", "", "");
                    updateStatus("Linhas deletadas:" + results.rowsAffected);
                    queryAndUpdateOverview();
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Erro: DELETE não realizado " + e + ".");
    }
    total();
}

function onInsert(Item){

    var descricao = Item.getDescricao();
    var valor = Item.getValor();
	var $imagem = Item.getImagem();
	
    if (descricao == "" || valor == "") {
        updateStatus("Erro: 'descricao' e 'valor' são campos obrigatórios!");
    }
    else {
        var query = "insert into obra (descricao, valor, src) VALUES (?, ?, ?);";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [descricao, valor, $imagem], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Erro: Inserção não realizada");
                    }
                    else {
                        updateForm("", "", "","");
                        updateStatus("Inserção realizada, linha id: " + results.insertId+$imagem);
                        queryAndUpdateOverview();
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Erro: INSERT não realizado " + e + ".");
        }
    }
    total();
}

function onSelect(htmlLIElement){
	var id = htmlLIElement.getAttribute("id");
	
	query = "SELECT * FROM obra where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm(row['id'], row['descricao'], row['valor'], row['src']);
                
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
   
}

function queryAndUpdateOverview(){

	//Remove as linhas existentes para inserção das novas
    var dataRows = document.getElementById("itemData").getElementsByClassName("data");
	
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("itemData").removeChild(row);
    };
    
	//Realiza a leitura no banco e cria novas linhas na tabela.
    var query = "SELECT * FROM obra;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
					li.setAttribute("id", row['id']);
                    li.setAttribute("class", "data");
                    li.setAttribute("onclick", "onSelect(this);$('#btnInserir').attr('disabled','disabled');");
                    
                    var liText = document.createTextNode(row['descricao'] + " - "+ row['valor']);
                    li.appendChild(liText);
                    
                    document.getElementById("itemData").appendChild(li);
                }
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
}

// 3. Funções de tratamento e status.

// Tratando erros

errorHandler = function(transaction, error){
    updateStatus("Erro: " + error.message);
    return true;
}

nullDataHandler = function(transaction, results){
}

// Funções de update

function updateForm(id, descricao, valor, imagem){
    document.itemForm.id.value = id;
    document.itemForm.descricao.value = descricao;
    document.itemForm.valor.value = valor;
//<<<<<<< HEAD
	$('img[name=imagem]').css('display','block');
	//$('#fotografar').css('display','none');
	$('img[name=imagem]').attr('src',imagem);
	
//=======
//>>>>>>> parent of 28fe7cf... Teste update imagem
}

function updateStatus(status){
    document.getElementById('status').innerHTML = status;
}

function total() {
    var query = "SELECT valor FROM obra;";
    try {
       localDB.transaction(function(transaction){
            var soma = 0;
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                     var row = results.rows.item(i);
                     soma += parseFloat(row['valor'].replace(',','.'));
                }
                $("#total").html("TOTAL: "+soma.toFixed(2).replace('.',','));
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
}
