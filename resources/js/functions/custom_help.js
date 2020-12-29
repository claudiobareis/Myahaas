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

    jQuery( ".wsmenu ul" ).append( "<li class='js-menu'><span class='wsmenu-click'></span><a href='/grupo/lancamentos' class='item' title='Lançamentos'>Lançamentos </a></li>" );
    jQuery( ".wsmenu ul" ).append( "<li class='js-menu'><span class='wsmenu-click'></span><a href='/grupo/sale' class='item' title='Lançamentos'>Sale </a></li>" );
});