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

    $( ".wsmenu ul" ).append( "<li class='js-menu'><span class='wsmenu-click'></span><a href='/grupo/best-sellers' class='item' title='Best Sellers'>Best Sellers </a></li>" );
    $( ".wsmenu ul" ).append( "<li class='js-menu'><span class='wsmenu-click'></span><a href='/grupo/sale' class='item' title='Lançamentos'>Sale </a></li>" );
    $( ".wsmenu ul" ).prepend( "<li class='js-menu'><span class='wsmenu-click'></span><a href='/grupo/lancamentos' class='item' title='Lançamentos'>Lançamentos </a></li>" );

    $(".simulador-frete table.tabela-cep").hide();
    $(".simulador-frete #simular-frete-submit").click(function() {     
        if($(".simulador-frete #simular-frete-cep").val() != ''){  
            $(".simulador-frete table.tabela-cep").show();
        }
    });
});