import {_alert, _confirm} from './message';


export function getCartItens() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/Checkout/GetCartItensJsonResult`,
            method: "GET",
            success: function (response) {
                if (response.success) {
                    resolve(response.result);
                } else {
                    reject(response.result);
                }
            },
            error: function (response) {
                reject(response.datresulta);
            }
        });
    });
}