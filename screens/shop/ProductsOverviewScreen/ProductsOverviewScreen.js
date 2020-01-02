import React, { useEffect, useState, useCallback } from 'react';
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
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProduct);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (error) {
            console.log('hello');
            setError(error.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);   
        
        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts])

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });

    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title
        });
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button title="Try Again" onPress={loadProducts} color={Colors.primary} />
            </View>
        )
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
            onRefresh={loadProducts}
            refreshing={isRefreshing}
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