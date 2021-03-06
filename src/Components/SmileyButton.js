import React from 'react';
import {TouchableOpacity, Image, View, Text, Dimensions} from 'react-native';
const { width, height, fontScale, scale } = Dimensions.get('window');

const SmileyButton = ({onPress, smilyeImage, text}) =>{
    const {buttonStyle, smilyeStyle, textStyle} = styles;
    return (
        <View style={{ width: width * 1/3 }}>  
          <TouchableOpacity style={buttonStyle}  onPress={onPress}>
                <Image resizeMode="contain" style={smilyeStyle}
                    source={smilyeImage}
                />
          </TouchableOpacity>
          <Text style={textStyle}>{text}</Text>
        </View>
     
    );
};

const styles = {
  buttonStyle:{
    alignSelf: 'center'
  },
  smilyeStyle:{
    width: width * 1/3.5,
    height: width * 1/3.5
  },
  textStyle:{
      width: '100%',
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: fontScale * 20,
      marginBottom: height * 1/20,
      marginTop: height * 1/30,
      color: '#000066',
      fontFamily: 'Lato-Regular',
      // fontFamily: 'Arial'
      fontFamily:"Lato-Regular"
  }
}

export {SmileyButton};