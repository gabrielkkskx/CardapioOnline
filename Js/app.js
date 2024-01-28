$(document).ready(function () {
    cardapio.eventos.init();
})

var cardapio = {};

cardapio.eventos = {

    init: () => {
        
    }

}

cardapio.metodos = {

    //obtém a lista de itens do cardápio
    obterItensCardapio: () => {

        var filtro = MENU['burgers'];
        console.log(filtro)

    }

}

cardapio.templates = {

}