$(document).ready(function () {
    cardapio.eventos.init();
})

var cardapio = {};

cardapio.eventos = {

    init: () => {
        cardapio.metodos.obterItensCardapio();
    }

}

cardapio.metodos = {

    //obtém a lista de itens do cardápio
    obterItensCardapio: (categoria = 'burgers', vermais = false) => {

        var filtro = MENU[categoria];
        console.log(filtro);

        if (!vermais) {
            $("#itensCardapio").html('');
            $("#btnVerMais").removeClass('hidden');
        }


        $.each(filtro, (i, e) => {

            let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${price}/g, e.price.toFixed(2).replace('.', ','))
            .replace(/\${id}/g, e.id)

            //botao ver mais foi clicado (12 itens)
            if (vermais && i >= 8 && i <12) {
                $("#itensCardapio").append(temp)
            }

            //paginação inicial (8 itens)
            if (!vermais && i < 8) {
                $("#itensCardapio").append(temp)
            }


        })

        //remove o active
        $(".container-menu a").removeClass('active');

        // seta o menu p ativo
        $("#menu-" + categoria).addClass('active')

    },

    //clique no botão de ver mais
    verMais: () => {

        var ativo = $(".container-menu a.active").attr('id').split('menu-')[1];
        cardapio.metodos.obterItensCardapio(ativo, true);

        $("#btnVerMais").addClass('hidden');

    },

    //diminui a quantidade de produtos
    diminuirQuantidade: (id) => {

        let quantiaAtual = parseInt($("#quantia-" + id).text());

        if(quantiaAtual > 0) {
            $("#quantia-" + id).text(quantiaAtual - 1)
        }

    },

    //aumenta a quantia de produtos
    aumentarQuantidade: (id) => {

        let quantiaAtual = parseInt($("#quantia-" + id).text());
        $("#quantia-" + id).text(quantiaAtual + 1)

    }

}

cardapio.templates = {

    item: `
            <div class="col-3 mb-5">
            <div class="card card-item" id="\${id}">
                <div class="img-produto">
                    <img src="\${img}" />
                </div>
                
                <p class="titulo-produto text-center mt-4">
                    <b>\${name}</b>
                </p>
                <p class="preço text-center">
                    <b>R$ \${price}</b>
                </p>
                <div class="add-carrinho">
                    <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidade('\${id}')"><i class="fas fa-minus"></i></span>
                    <span class="add-numero-itens" id="quantia-\${id}">0</span>
                    <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidade('\${id}')"><i class="fas fa-plus"></i></span>
                    <span class="btn btn-add"><i class="fa fa-shopping-bag"></i></span>
                </div>
            </div>
        </div>
    `
}