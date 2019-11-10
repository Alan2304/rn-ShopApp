import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import ProductItem from '../../../components/shop/ProductItem/ProductItem';
import HeaderButton from '../../../components/UI/HeaderButton/HeaderButton';
import Colors from '../../../constants/Colors';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    
    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <ProductItem 
                    image={item.imageUrl}
                    title={item.title}
                    price={item.price}
                    onSelect={() => {}}>
                        <Button 
                            title="Edit" 
                            onPress={() => {
                                
                            }} 
                            color={Colors.primary} />
                        <Button 
                            title="Delete" 
                            onPress={() => {

                            }} 
                            color={Colors.primary} />
                </ProductItem>
            )} />
    )
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item  
                    title='Menu' 
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}/>
            </HeaderButtons>
        )
    }
}

export default UserProductsScreen;