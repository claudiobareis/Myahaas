$(document).ready(function() {   
    //sumir com a tag na lista de produtos
    if($(".product-in-card .imagetag img[alt*='compre um tamanho']").length == 0){
        $('.product-in-card .image .imagetag').show();
    }else{
        $('.product-in-card .image .imagetag').hide();
    }   
    //sumir com a tag na página do produto   
    setTimeout(function(){
        if($(".produto .imagetag img[alt*='compre um tamanho']").length == 0){
            $('.produto .image .imagetag').show();
        }else{
            $('.produto .image .imagetag').hide(); 
        }
    },500);

    function someTag(){
        setTimeout(function(){
            if($(".produto .imagetag img[alt*='compre um tamanho']").length == 0){
                $('.produto .image .imagetag').show();
            }else{
                $('.produto .image .imagetag').hide(); 
            }
        },500); 
    }

    $(".closeFiltros").click(function() {       
        someTag();
    });
    $(".containerFilter .capitalize").click(function() {       
        someTag();        
    });

    $( ".wsmenu ul" ).prepend( "<li class='js-menu'><span class='wsmenu-click'></span><a href='/grupo/best-sellers' class='item best' title='Best Sellers'>Best Sellers </a></li>" );
    $( ".wsmenu ul" ).prepend( "<li class='js-menu'><span class='wsmenu-click'></span><a href='/grupo/lancamentos' class='item lancamentos' title='Lançamentos'>Lançamentos </a></li>" );        
    $( ".wsmenu ul" ).append( "<li class='js-menu' class='item' title='Sale'><a href='/grupo/sale' class='item sale' title='Black Friday'>Black Friday </a></li>" );
    $( ".wsmenu ul" ).append( "<li class='js-menu'><span class='wsmenu-click'></span><a href='https://blog.myahaas.com.br/' target='_blank' class='item blog' title='Blog da Mya'>Blog </a></li>" );
    $( ".wsmenu ul" ).append( "<li class='js-menu' class='item' title='Roupas'><a href='/grupo/roupas' class='item' title='Roupas'>Roupas </a></li>" );

    $(".simulador-frete table.tabela-cep").hide();
    $(".simulador-frete #simular-frete-submit").click(function() {     
        if($(".simulador-frete #simular-frete-cep").val() != ''){  
            $(".simulador-frete table.tabela-cep").show();
        }
    });
    $('#RelatedProducts .product-in-card a.ui.attached').removeClass('slide');
    /* 
    função para mostrar aviso
    setTimeout(function(){
        $('.infoProduto .blocoInfo .blocoValores .btnComprar .btn-comprar').popup({
            position : 'top center',
            target   : '.infoProduto .blocoInfo .blocoValores .btnComprar .btn-comprar',
            title    : 'Atenção',
            content  : 'Antes de comprar, verifique se você selecionou o tamanho e a cor.',
            visible     : 'visible',
            delay: {
                show: 50,
                hide: 0
            }
        });
    }, 1000);
    */
    $('.info .avise-card').parent().addClass('avise-me-txt');
    
    //Mensagem Tabela de Frete
    $("#loadFrete .grouped .field label:contains('Receba hoje')").click(function() {         
        if($('.msg-recebahoje').length == 0){        
            $("#loadFrete .grouped .field label:contains('Receba hoje')").append("<div class='ui yellow message msg-recebahoje'>Pedidos feitos até as 12hs serão entregues hoje até as 21hs</div>");        
        }
    });

});