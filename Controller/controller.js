function insertItem(desc,valor){
  var objItem = new Item();
 
  objItem.setDescricao(desc);
  objItem.setValor(valor);
  objItem.setImagem($imagem);
  
  onInsert(objItem);
}

function updateItem(id,desc,valor,src){
  var objItem = new Item();
  objItem.setId(id);
  objItem.setDescricao(desc);
  objItem.setValor(valor);
  objItem.setImagem(src);
  
  onUpdate(objItem);
}

function delItem(id){
  var objItem = new Item();
  objItem.setId(id);
  
  onDelete(objItem);
}
