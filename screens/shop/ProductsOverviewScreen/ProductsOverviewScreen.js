import React, { useEffect, useState } from 'react';
import { FlatList, Button, Platform, ActivityIndicator, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import styles from './styles';

import ProductItem from '../../../components/shop/ProductItem/ProductItem';
import HeaderButton from '../../../components/UI/HeaderButton/HeaderButton';
import * as cartActions from '../../../store/actions/cart';
import * as productsActions from '../../../store/actions/product';
import Colors from '../../../constants/Colors';

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const products = useSelector(state => state.products.availableProduct);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            await dispatch(productsActions.fetchProducts()).then().catch();
            setIsLoading(false);
        };
        loadProducts();
    }, [dispatch]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        });
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No Products found. Maybe start ading some!</Text>
            </View>
        );
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