import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/product';
import Product from '../../models/product';

const initialState = {
    availableProduct: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: 
            return {
                availableProduct: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            }
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.product.id, 
                'u1', 
                action.productData.title, 
                action.productData.imageUrl, 
                action.productData.description, 
                action.productData.price
            );
            return {
                ...state,
                availableProduct: state.availableProduct.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(
                prod => prod.id === action.pid
            );
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;
            const availableProductIndex = state.availableProduct.findIndex(
                prod => prod.id === action.pid
            );
            const updatedAvailableProducts = [...state.availableProduct];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return {
                ...state,
                availableProduct: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.id !== action.pid
                ),
                availableProduct: state.availableProduct.filter(
                    product => product.id !== action.pid
                )
            }
    
        default:
            return state;
    }
}