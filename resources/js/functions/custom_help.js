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
});