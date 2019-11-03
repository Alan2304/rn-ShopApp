import React from 'react';
import { FlatList, Text, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import styles from './styles';

import ProductItem from '../../../components/shop/ProductItem/ProductItem';
import HeaderButton from '../../../components/UI/HeaderButton/HeaderButton';
import * as cartActions from '../../../store/actions/cart';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProduct);
    const dispatch = useDispatch();

    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id} 
            renderItem={ ({item}) => 
                <ProductItem 
                    image={item.imageUrl} 
                    title={item.title} 
                    price={item.price} 
                    onViewDetail={() => {
                        props.navigation.navigate('ProductDetail', {
                            productId: item.id,
                            productTitle: item.title
                        });
                    }} 
                    onAddToCart={() => {
                        dispatch(cartActions.addToCart(item))
                    }} /> 
            } />
    );
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products',
    headerRight: 
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item  title='Cart' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {}}/>
        </HeaderButtons>
}

export default ProductsOverviewScreen