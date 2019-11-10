import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import styles from './styles';

import ProductItem from '../../../components/shop/ProductItem/ProductItem';
import HeaderButton from '../../../components/UI/HeaderButton/HeaderButton';
import * as cartActions from '../../../store/actions/cart';
import Colors from '../../../constants/Colors';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProduct);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        });
    }

    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id} 
            renderItem={ ({item}) => 
                <ProductItem 
                    image={item.imageUrl} 
                    title={item.title} 
                    price={item.price} 
                    onSelect={() => {
                        selectItemHandler(item.id, item.title)
                    }} >
                        <Button 
                            title="View Details" 
                            onPress={() => {
                                selectItemHandler(item.id, item.title)
                            }} 
                            color={Colors.primary} />
                        <Button 
                            title="To Cart" 
                            onPress={() => {
                                dispatch(cartActions.addToCart(item))
                            }} 
                            color={Colors.primary} />
                    </ProductItem> 
            } />
    );
}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: 
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item  
                    title='Menu' 
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}/>
            </HeaderButtons>,
        headerRight: 
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item  
                    title='Cart' 
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}/>
            </HeaderButtons>
    }
}

export default ProductsOverviewScreen