function Item(){
    var id;
    var descricao;
    var valor;

   this.getId=function(){
        return this.id;
    };

    this.setId=function(novoId){
        this.id = novoId;
    };
    this.getDescricao=function(){
        return this.descricao;
    };

    this.setDescricao=function(novaDescricao){
        this.descricao = novaDescricao;
    };
    this.getValor=function(){
        return this.valor;
    };

    this.setValor=function(novoValor){
        this.valor = novoValor;
    };
}
