import { openModalQuickView } from "../../functions/modal";
import { LoadCarrinho } from "../../functions/mini_cart_generic";
import { LoadCarrinhoEventList } from "../../functions/mini_cart_generic";
import { _alert, _confirm } from "../../functions/message";
import { CancelarCalculoFreteCart } from "../checkout/mini_cart";
import { moneyPtBR } from "../../functions/money";
import { isLoading } from "../api_config";
import { updateProductConjunctTable } from "./detail";
import { getAllMask } from "../../ui/modules/mask";
import { HaveInWishList } from "../customer/wishlist";
import { CompraRecorrenteCart, CompraRecorrenteStorage } from '../../functions/recurringPurchase';

const color_comprar_button_class = "action",
    color_aviseme_button_class = "grey";


function isExhausted(productId) {
    return !($("#Product_" + productId).data("exhausted").toLowerCase() === "false");
}
function loading(element) {
    $(element).toggleClass('loading');
}
$(document).on('click', '.btn-adiciona-conjunto', function () {

    let $checkbox = $(this).next(".conjunct_product");

    if ($(this).attr("disabled")) {
        return false;
    }

    if ($checkbox.prop("checked")) {
        $(this)
            .prop("checked", false)
            .removeClass(color_comprar_button_class)
            .addClass(color_aviseme_button_class)
            .find(".icon")
            .removeClass("checkmark box")
            .addClass("square outline")
            .next("span")
            .text("Selecionar");
    }
    else {
        $(this)
            .prop("checked", true)
            .removeClass(color_aviseme_button_class)
            .addClass(color_comprar_button_class)
            .find(".icon")
            .addClass("square outline")
            .addClass("checkmark box")
            .next("span")
            .text("Selecionado");
    }

});

$(document).on('change', 'input.conjunct_product', function () {
    updateProductConjunctTable();
});

$(document).on("click", ".btn-comprar-card", function () {
    if (!$(this).hasClass("btn-comprar-card-b2b")) {
        $(this).addClass("loading");
        CancelarCalculoFreteCart(1);
        insertItemInCart($(this).data("idproduct"), this, true, false);
    }
});

$(document).on("click", ".btn-assinatura-card", function () {
    $(this).addClass("loading");
    CancelarCalculoFreteCart(1);
    insertItemInCart($(this).data("idproduct"), this, true, true);
});

$(document).on("click", ".add-event-list", function () {
    $(this).addClass("loading");
    //isLoading("#miniCarrinho");
    if (!$(this).hasClass("avise-card")) {
        $.when(insertItemInList($(this).data("idproduct"), this)).then(
            function () {
                //isLoading("#miniCarrinho");
            });
    } else {
        $(this).removeClass("loading");
    }
});

function insertItemInList(productId, element) {
    let keep = true,
        variationSelected = "",
        $parent = ($(element).closest(".ui.card.produto").length == 0 ? $(element).closest(".item.produtoList") : $(element).closest(".ui.card.produto"));

    $parent.find(".sku-options [id=referencefromproduct_" + productId + "]").each(function () {
        let idVariation = $(this).dropdown("get value");
        if (idVariation === "") {
            keep = false;
            return false;
        }
        else {
            variationSelected += variationSelected !== "" ? "," + idVariation : idVariation;
            keep = true;
        }
    });

    if (keep) {
        callAjaxInsertItemInList(productId, variationSelected, 1, element);
    }
    else {
        $(element).removeClass("loading");
        _alert("", "Variação não selecionada", "warning")
    }
}

$(document).on("click", "#btn_compre_conjunto_selecionado", function (e) {
    let $product_selected = $(".conjunct_product:checked");
    if ($product_selected.length > 0) {
        $(this).addClass("loading");
        CancelarCalculoFreteCart(1);
        $product_selected.each(function () {
            insertItemInCart($(this).val(), $(this), false, false);
        })
        LoadCarrinho(true)
    } else if ($(".conjunct_product").length == 0) {
        _alert('', 'Conjunto indisponível!', 'error');
    }
    else {
        _alert('', 'Selecione ao menos um produto, antes de adicionar ao carrinho.', 'error');
    }
});

$(document).on("click", "#btn_compre_oneclick_conjunto_selecionado", function (e) {
    let $product_selected = $(".conjunct_product:checked");
    if ($product_selected.length > 0) {
        $(this).addClass("loading");
        CancelarCalculoFreteCart(1);
        $product_selected.each(function () {
            insertItemInCart($(this).val(), $(this), false, false);
        });

        $.ajax({
            method: "GET",
            url: "/Checkout/CheckoutNext",
            data: {},
            success: function (data) {
                if (data.success === true) {
                    window.location.href = "/" + data.redirect.toLowerCase();
                }
                else {
                    _alert("Mensagem", data.message, "error");
                }
            },
            onFailure: function (data) {
                //console.log("Erro ao excluir frete");
            }
        });
        // LoadCarrinho(true)
    } else if ($(".conjunct_product").length == 0) {
        _alert('', 'Conjunto indisponível!', 'error');
    }
    else {
        _alert('', 'Selecione ao menos um produto, antes de adicionar ao carrinho.', 'error');
    }
});

$(document).on("click", ".button.avise-card", function () {
    var that = $(this);
    loading(that);
    $.ajax({
        method: "POST",
        url: "/Product/AlertMe",
        dataType: "html",
        data: {
            produtoID: typeof ($("#produto-id").val()) !== "undefined" ? $("#produto-id").val() : $(this).data("idproduct"),
            sku: typeof ($("#produto-sku").val()) !== "undefined" ? $("#produto-sku").val() : $(this).data("produto-sku"),
            titulo: $("#produto-nome").text() !== "" ? $("#produto-nome").text() : $(this).data("name"),
            imagem: $('#mainImageCard_' + $(this).data("idproduct")).attr('src'),
            codigo: typeof ($("#produto-codigo").val()) !== "undefined" ? $("#produto-codigo").val() : $(this).data("produto-codigo")
        },
        success: function (response) {
            $(".modal-block").append(response);
            $("#form-alert").modal("show")
            getAllMask();
            loading(that);
        },
        onFailure: function (response) {
            //console.log(response);
            loading(that);
        }
    });
});

$(document).on("change", ".dropdownreference", function () {
    callAjaxGetSku(this);
    let idVariationSelected = $('input[name^=reference_]', $(this)).val(),
        idProduct = $(this).data('idproduct');
    $(".sku-options [id=referencefromproduct_" + idProduct + "]").not(this).each(function () {
        $(this).find('.item').removeClass('hideme');
        $(this).find('.item').each(function () {
            if ($(this).data('sku').indexOf(idVariationSelected) < 0) {
                $(this).addClass('hideme');
            }
        });
    });
});

$(document).ready(function () {
    $(".quick-view-opener").api({
        action: 'quickview product',
        dataType: 'html',
        beforeSend: function (settings) {
            settings.urlData = {
                code: $(this).attr("data-modal-open")
            };
            return settings;
        },
        onSuccess: function (response) {
            $(".modal-block").append(response);
            openModalQuickView($(this).attr("data-modal-open"));
        },
        onError: function (errorMessage) {
            //console.log(errorMessage);
        }
    });

    if ($(".conjunct_product:checked").length > 0) {

        $('.card.produto.conjunto').each(function (index, element) {
            let variations = $(this).data('variation');

            $(element).find('.ui.dropdown').each(function () {
                let $that = $(this);
                for (let variation in variations) {
                    $that.dropdown('set selected', variations[variation].IdVariation);
                }
            });
            callAjaxGetSku(element);

            updateStockConjunct(element);
        });
        updateProductConjunctTable();
    } else {
        $(".buy-conjunct").removeClass(`ui animated ${color_comprar_button_class} button fluid`)
        $(".buy-conjunct").addClass(`ui labeled icon button fluid ${color_aviseme_button_class} disabled`)
        $("#buttonText").text("Indisponível")
        $("#iconCart").remove()
    }
});

export function insertItemInCart(productId, element, showSideBar, signature = false) {
    let $parent = $(element).closest("div[id^='Product_']"),
        variationSelected = getVariationIds($parent, productId);

    if (variationSelected.status) {
        callAjaxInsertItemInCart(productId, variationSelected.ids, 1, element, showSideBar, signature);
    }
    else {
        _alert("", "Variação não selecionada!", "warning");
        $(element).removeClass('loading');
    }
}

function callAjaxGetSku(element) {

    let productId = $(element).data("idproduct"),
        $parent = $(element).closest("div[id^='Product_']"),
        variationSelected = getVariationIds($parent, productId);

    if (variationSelected.status) {
        /*
        console.warn("Buscando SKU de Produto por variação");
        console.log(`ID produto: ${productId}
            Variações: ${variationSelected.ids}`);
        */
        $.ajax({
            url: "/product/GetSkuByIdProductJson",
            data: { id: productId, variations: variationSelected.ids },
            method: "GET",
            success: function (response) {
                let sku = JSON.parse(response.data);

                var response = HaveInWishList(productId, sku.IdSku, $parent);

                var ponteiroPricesCurrent = $parent.find("#basePrice_" + productId + "> i").length;

                if (sku.Price > 0 && sku.PricePromotion > 0) {
                    if (ponteiroPricesCurrent > 0) {
                        $parent.find("#basePrice_" + productId + "> i").text(moneyPtBR(sku.Price));
                    } else {
                        $parent.find(".preco").before('<span id="basePrice_' + productId + '" class="precoBase">de <i>' + moneyPtBR(sku.Price) + '</i> por</span>');
                    }
                    $parent.find(".preco").text(moneyPtBR(sku.PricePromotion));
                }
                else {
                    if (ponteiroPricesCurrent > 0) {
                        $parent.find("#basePrice_" + productId).remove();
                    }
                    $parent.find(".preco").text(moneyPtBR(sku.Price));
                }

                if (sku.InstallmentMax) {
                    $parent.find(".installmentMaxNumber").text(sku.InstallmentMax.MaxNumber);
                    $parent.find(".installmentMaxValue").text(moneyPtBR(sku.InstallmentMax.Value));
                }

                if (sku.Stock <= 0 || isExhausted(productId)) {
                    $parent.find("#btn-comprar-card-" + productId)
                        .removeClass(`${color_comprar_button_class} btn-comprar-card`)
                        .addClass(`${color_aviseme_button_class} avise-card avise-me-modal`)
                        .html('<i class="icon announcement"></i> Avise-me');

                    $parent.find("#btn-assinatura-card-" + productId).addClass(`hideme`);

                    $parent.find("#add-event-list-" + productId)
                        .removeClass(`${color_comprar_button_class} btn-comprar-card`)
                        .addClass(`${color_aviseme_button_class} avise-card avise-me-modal`)
                        .html('<i class="icon announcement"></i> Avise-me');


                    $parent.find("#produto-esgotado_" + productId).removeClass("hideme");
                    $parent.data("stock", sku.Stock);
                }
                else {
                    $parent.find("#btn-comprar-card-" + productId)
                        .removeClass(`${color_aviseme_button_class} avise-card avise-me-modal`)
                        .addClass(`${color_comprar_button_class} btn-comprar-card`)
                        .html('<i class="icon add to cart"></i> Comprar');

                    $parent.find("#btn-assinatura-card-" + productId).removeClass(`hideme`);

                    $parent.find("#add-event-list-" + productId)
                        .removeClass(`${color_aviseme_button_class} avise-card avise-me-modal`)
                        .addClass(`ui labeled icon button ${color_comprar_button_class} fluid add-event-list`)
                        .html('<i class="icon add to cart"></i> Adicionar à Lista');

                    $parent.find("#produto-esgotado_" + productId).addClass("hideme");
                    $parent.data("stock", sku.Stock);
                }

                if ($parent.hasClass("conjunto")) {
                    updateStockConjunct($parent);
                    updateProductConjunctTable();
                }

                $("#produto-sku").val(variationSelected.ids);
            },
            error: function (response) {
                console.error("Response Error: " + response);
            }
        });
    }
}

export function callAjaxInsertItemInCart(idProduct, variations, quantity, element, showSidebar, signature = false) {
    $.ajax({
        url: "/Checkout/InsertUniqueItemCart",
        method: "POST",
        data: { idProduct, variations, quantity, signature},
        success: function (response) {
            if (response.success) {
                $(document).find(".loading").removeClass("loading");
                LoadCarrinho(showSidebar);

                // Ativa ou desativa o modal de termos de aceite do Compra Recorrente
                if ($(CompraRecorrenteCart.modalConfig.id).length > 0)
                    $(CompraRecorrenteCart.modalConfig.id).attr("data-active", signature);

                // Limpa a Storage caso um produto sem recorrencia seja adicionado
                if (!signature)
                    CompraRecorrenteStorage.cleanStorage();

            }
            else {
                $(document).find(".loading").removeClass("loading");
                _alert("Mensagem", response.msg, "warning")
            }
        },
        error: function (response) {
            //console.log(response);
        }
    });
}

function callAjaxInsertItemInList(idProduct, variations, quantity, element) {
    $.ajax({
        url: "/EventList/InsertProductInEventList",
        method: "POST",
        data: { idProduct: idProduct, variations: variations, quantity: quantity },
        success: function (response) {
            if (response.success) {
                LoadCarrinhoEventList(true);
                $(element).removeClass("loading");
            }
            else {
                _alert("Mensagem", response.msg, "warning");
                $(element).removeClass("loading");
            }
        },
        error: function (response) {
            //console.log(response);
            $(element).removeClass("loading");
        }
    });
}

function updateStockConjunct(element) {
    let stock = $(element).data('stock');
    let productId = $(element).data('idproduct');
    let $button = $(element).find('.btn-adiciona-conjunto')

    if (stock <= 0 || isExhausted(productId)) {
        $button
            .attr('disabled', true)
            .prop("checked", false)
            .removeClass(color_comprar_button_class)
            .addClass(color_aviseme_button_class)
            .find(".icon")
            .removeAttr("class")
            .attr("class", "icon warning circle")
            .next("span")
            .text("Esgotado");

        $button
            .next('input.conjunct_product')
            .prop('checked', false);

        return false;
    }
    else {
        $button
            .attr('disabled', false)
            .prop("checked", true)
            .removeClass(color_aviseme_button_class)
            .addClass(color_comprar_button_class)
            .find(".icon")
            .removeAttr("class")
            .attr("class", "icon checkmark box")
            .next("span")
            .text("Selecionado");

        $button
            .next('input.conjunct_product')
            .prop('checked', true);
        return true;
    }
}

export function getVariationIds(parentElement, productId) {
    let variationSelected = "",
        _return = {},
        $skuOptions = $(parentElement).find(".sku-options [id=referencefromproduct_" + productId + "]");
    if ($skuOptions.length) {
        $skuOptions.each(function () {
            let idVariation = $(this).dropdown("get value");
            if (idVariation === "") {
                _return = {
                    status: false
                };
            }
            else {
                variationSelected += variationSelected !== "" ? "," + idVariation : idVariation;
                _return = {
                    status: true,
                    ids: variationSelected
                };
            }
        });
    }
    else {
        _return = {
            status: true,
            ids: ""
        };
    }
    return _return;
}

