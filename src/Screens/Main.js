import React, { Component } from 'react';
import { View, StatusBar, Text, Dimensions } from 'react-native';
import { SmileyButton } from '../Components';
import { connect } from 'react-redux';
// import {
//     smileyReaction
// } from '../actions';
// import { KeepAwake } from 'expo';
const { width, height, fontScale, scale } = Dimensions.get('window');

class Main extends Component {
    componentDidMount() {
        console.log("props: ", this.props)
    }
    render() {
        const { containerStyle, smilyeContainerStyle } = styles;
        const smilyeImages = {
            // veryHappy: require('../assets/veryHappy.gif'),
            happy: require('../../assets/happy.png'),
            sad: require('../../assets/__sad.png'),
            moderate: require('../../assets/moderate.png'),
        }
        return (
            <View style={containerStyle}>
                <StatusBar hidden />
                {/* <KeepAwake /> */}
                <View style={{ flex: 0.2, paddingTop: height * 1 / 30 }}>
                    <Text style={{ fontSize: fontScale * 30, color: '#000066', alignSelf: 'center' }}>Pleasure Or Displeasure</Text>
                </View>
                <View style={smilyeContainerStyle}>
                    {/* <SmileyButton
                        onPress={() =>
                            alert('button pressed')
                            //     this.props.smileyReaction({
                            //     showReason: false,
                            //     nav: this.props.navigation,
                            //     smiley: 'happy',
                            //     image: smilyeImages.veryHappy,
                            //     text: 'Thankyou for your response, we always wants our customer to be happy and more satisfied',
                            //     audioText: 'Thankyou for your response, we always wants our customers to be happy and more satisfied'
                            // })
                        }
                        smilyeImage={smilyeImages.veryHappy}
                        text='Happy'
                    /> */}
                    <SmileyButton
                        // onPress={() =>
                            //     this.props.smileyReaction({
                            //     showReason: false,
                            //     nav: this.props.navigation,
                            //     smiley: 'satisfied',
                            //     image: smilyeImages.happy,
                            //     text: 'Thankyou for your response, next time you will be more satisfied then now.',
                            //     audioText: 'Thankyou for your response, next time you will be more satisfied then now.'
                            // })
                        // }
                        smilyeImage={smilyeImages.happy}
                        text='Satisfied'
                    />

                    <SmileyButton
                        // onPress={() =>
                            //     this.props.smileyReaction({
                            //     showReason: true,
                            //     nav: this.props.navigation,
                            //     smiley: 'moderate',
                            //     image: smilyeImages.moderate,
                            //     text: '',
                            //     audioText: 'OOps We are really sorry for our bad service, can you please send us the reason for your dissatisfaction?'
                            // })
                        // }
                        smilyeImage={smilyeImages.moderate}
                        text='Moderate'
                    />

                    <SmileyButton
                        // onPress={() =>
                            //     this.props.smileyReaction({
                            //     showReason: true,
                            //     nav: this.props.navigation,
                            //     smiley: 'dissatisfied',
                            //     image: smilyeImages.sad,
                            //     text: '',
                            //     audioText: 'Can You Please submit the reason for your dissatisfaction?'
                            // })
                        // }
                        smilyeImage={smilyeImages.sad}
                        text='Sad'
                    />
                </View>
                <View style={{ flex: 0.2 }}>
                    <Text style={{ fontSize: fontScale * 20, color: '#0066ff', alignSelf: 'center', paddingTop: height * 1 / 20 }}>Please Rate Our Service!!!</Text>
                </View>
            </View>
        )

    }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#e6ffff'
    },
    smilyeContainerStyle: {
        flex: 0.6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        aliginSelf: 'center',
        paddingRight: width * 1 / 30,
        paddingLeft: width * 1 / 30
    },
}

const mapStateToProps = (state) => {
    const { image, text, iconButton, loading } = state.smiley;
    return { image, text, iconButton, loading };
}

const mapDispatchToProps = (dispatch) => {
    // return{
    //     smileyReaction : () => dispatch(),
    // }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Main);
export default Main;