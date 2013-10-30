function insertItem(desc,valor,imagem){
  var objItem = new Item();
 
  objItem.setDescricao(desc);
  objItem.setValor(valor);
  objItem.setImg(imagem);
  
  onInsert(objItem);
}

function updateItem(id,desc,valor){
  var objItem = new Item();
  objItem.setId(id);
  objItem.setDescricao(desc);
  objItem.setValor(valor);
  
  onUpdate(objItem);
}

function delItem(id){
  var objItem = new Item();
  objItem.setId(id);
  
  onDelete(objItem);
}
