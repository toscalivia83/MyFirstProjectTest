import React from 'react';
import {
  Image,
  View,
  Text,
} from 'react-native';
 
const CustomCard = ({ title, url }) => {
    return (
      <View>
      <Text >{title}</Text>
      <Image source={url} style = {{width: 300, height : 250}}/>
      </View>
    );
}
 
export default CustomCard;