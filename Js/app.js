$(document).ready(function () {
    cardapio.eventos.init();
})

var cardapio = {};
var carrinho = [];

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

    },

    //add item ao carrinho
    adicionarCarrinho: (id) => {

        let quantiaAtual = parseInt($("#quantia-" + id).text());

        if(quantiaAtual > 0) {

            //obter a categoria ativa
            var categoria = $(".container-menu a.active").attr('id').split('menu-')[1];

            //obtem a lista de itens
            let filtro = MENU[categoria];

            //obtem o item
            let item = $.grep(filtro, (e, i) => { return e.id == id});

            if (item.length > 0) {

                //validar se já tem o item no carrinho
                let existe = $.grep(carrinho, (elem, index) => { return elem.id ==id});

                //caso já exista o item no carrinho
                if (existe.length > 0) {
                    let objIndex = carrinho.findIndex((obj => obj.id == id));
                    carrinho[objIndex].quantia = carrinho[objIndex].quantia + quantiaAtual;
                }
                //caso ainda não exista, add ele
                else {
                    item[0].quantia = quantiaAtual;
                    carrinho.push(item[0])
                }

                //após add no carrinho, reseta a quantia pra 0
                $("#quantia-" + id).text(0);

                cardapio.metodos.atualizarBadgeTotal();

            }

        }

    },

    //atualiza a quantia de itens no badge do meu carrinho
    atualizarBadgeTotal: () => {

        var total = 0;

        $.each(carrinho, (i, e) => {
            total += e.quantia
        })

        if (total > 0) {
            //se tiver item no botão remove o hidden e ele aparece
            $(".botao-carrinho").removeClass('hidden');
            $(".container-total-carrinho").removeClass('hidden');
        }
        else{
            //se o total for 0, o item continua sem aparecer
            $(".botao-carrinho").addClass('hidden');
            $(".container-total-carrinho").addClass('hidden');
        }

        $(".badge-total-carrinho").html(total);

    },

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
                    <span class="btn btn-add" onclick="cardapio.metodos.adicionarCarrinho('\${id}')"><i class="fa fa-shopping-bag"></i></span>
                </div>
            </div>
        </div>
    `
}