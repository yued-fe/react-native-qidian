'use strict';
import React, { Component} from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Platform,
    InteractionManager
} from 'react-native';
import NavigationBar from 'react-native-navigationbar';
import theme from '../common/theme';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {

        });
    }

    render() {
        return(
            <View style={styles.container}>
                <NavigationBar
                    title="首页"
                    backColor={"#777"}
                    titleColor={theme.barTitleColor}
                    backIconHidden={true}
                    barTintColor={theme.barTintColor}
                    barStyle={{borderBottomWidth:0}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.containerBackgroundColor
    }
});

export default HomePage
