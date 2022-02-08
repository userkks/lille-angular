export const Url = {
    saveProductUrl : 'product/saveProduct/',
    fetchKeywordSuggestion: 'keyword/',
    fetchProductDetails: 'product/get-product/',
    placeOrder: 'order/place-order'
};

export const localStorageVariable = {
    cartItemList: 'cartItems',
    buyNowItemList: 'buyNow',
    wishListItems: 'wishList',
    orderSuccessFlag: 'orderSuccess'
};

export const removableStorageKeyList = [
    localStorageVariable.buyNowItemList,
    localStorageVariable.orderSuccessFlag
];