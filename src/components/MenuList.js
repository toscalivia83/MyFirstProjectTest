import React from 'react';
import { View } from 'react-native';
import MenuItem from './MenuItem';

const MenuList = () => {
    const menus = [];

    return (
        <View>
            {menus.map(menu => <MenuItem />)}
        </View>
    )
}