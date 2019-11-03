import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';

import ProductItem from '../../../components/shop/ProductItem/ProductItem';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProduct);
    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id} 
            renderItem={ ({item}) => 
                <ProductItem 
                    image={item.imageUrl} 
                    title={item.title} 
                    price={item.price} 
                    onViewDetail={() => {} } 
                    onAddToCart={() => {}} /> 
            } />
    );
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

export default ProductsOverviewScreen