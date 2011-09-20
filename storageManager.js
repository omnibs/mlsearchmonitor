/**
 * Created by JetBrains WebStorm.
 * User: Jubs
 * Date: 21/08/11
 * Time: 02:43
 */

/*COMO GUARDAR ESTA MERDA NO LOCAL STORAGE?????
 * http://stackoverflow.com/questions/3357553/how-to-store-an-array-in-localstorage
 * aqui tem a resposta*/

function MLStorage(context) {
    this.context = context;
    this._keyPreffix = "mercadolivre_search_robot";
    this._productListKey = this._keyPreffix + "_" + this.context + "_productList";
    this._productsKey = this._keyPreffix + "_" + this.context + "_products";
    this.productList = new Array();
    this.products = {};
    this.getProducts = function() {
        return this.products;
    };
    this.getProduct = function(url) {
        return this.products[url];
    };
    this.addProduct = function(product) {
        if ($.inArray(product.url,this.productList) == -1) {
            this.productList.push(product.url);
        }
        this.products[product.url] = product;
    };
    this.persist = function(){
        localStorage[this._productListKey] = JSON.stringify(this.productList);
        localStorage[this._productsKey] = JSON.stringify(this.products);
    };
    this.reload = function(){
        var stored = localStorage[this._productListKey];
        if (stored) {
                stored = JSON.parse(stored);
                if (stored instanceof Array)
                    this.productList = stored;
                else
                    console.log("erro: algo estranho no lugar de " + this._productListKey);
        }

        stored = localStorage[this._productsKey];
        if (stored) {
                stored = JSON.parse(stored);
                if (stored)
                    this.products = stored;
                else
                    console.log("erro: algo estranho no lugar de " + this._productsKey);
        }
    };
    this.clear = function() {
        localStorage.removeItem(this._productListKey);
        localStorage.removeItem(this._productsKey);
    }
}
function MLProduct() {
    this.context = null; //this is the URL of the search where this product was obtained
    this.url = null;
    this.description = null;
    this.price = null;
    this.html = null;
    this.dateAdded = null;
    this.dateUpdated = null;
}