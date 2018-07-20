import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons';

const ReasonButton = ({onPress, iconImage, text}) =>{
    const {buttonStyle, smilyeStyle, textStyle} = styles;
    return (
        <View style={{margin:5, width:130, height:130, borderRadius: 35, backgroundColor: '#e0e0d2', justifyContent: 'center'}}>  
          <TouchableOpacity style={buttonStyle}  onPress={onPress}>
                <Image resizeMode="contain" style={smilyeStyle}
                    source={iconImage}
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
    width: 55,
    height: 55,
    marginBottom:10
  },
  textStyle:{
      alignSelf: 'center',
    
    //   marginBottom: 20,
    //   color: '#000066',
      fontWeight: 'bold',
      // fontFamily: 'Arial'
  }
}

export {ReasonButton};