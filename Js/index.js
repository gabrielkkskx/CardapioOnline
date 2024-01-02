var cardapio = {}

$(document).ready(function () {

    cardapio.eventos.init();

})

cardapio.eventos = {

    init: () => {
        cardapio.metodos.obterItensCardapio();
    }

}

cardapio.metodos = {

    //obtem a lista de itens do cardápio
    obterItensCardapio: () => {

        var filtro = MENU['burguers'];
        console.log(filtro);

        $.each(filtro, (i, e) => {

            let temp = cardapio.templates.item

            $("#itens-cardapio").append(temp)
            
        })
        
    }

}

cardapio.templates = {

    item: `
            <div class="col-3 mb-5">
            <div class="card card-item">
                <div class="img-produto">
                    <img src="img/cardapio/burguers/shake-shack-shackburger-16-pack.316f8b09144db65931ea29e34869287a.jpg" />
                </div>
                
                <p class="titulo-produto text-center mt-4">
                    <b>Nome</b>
                </p>
                <p class="preço text-center">
                    <b>R$ 30,00</b>
                </p>
                <!-- layout de add ao carrinho -->
                <div class="add-carrinho">
                    <span class="btn-menos"><i class="fas fa-minus"></i></span>
                    <span class="add-numero-itens">0</span>
                    <span class="btn-mais"><i class="fas fa-plus"></i></span>
                    <span class="btn btn-add"><i class="fa fa-shopping-bag"></i></span>
                </div>
                <!-- -->
            </div>
        </div>
    `

}