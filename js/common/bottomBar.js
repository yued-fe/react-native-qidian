'use strict';

import React, {Component} from 'react';
import {StyleSheet, Platform, View, Text, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import HomePage from '../page/home';
import SortPage from '../page/sort';
import FindPage from '../page/find';
import BookShelfPage from '../page/bookShelf';
import MyPage from '../page/my';
import px2dp from '../utils/pxtodpUtil';
import theme from './theme';

class BottomBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home'
        };
    }

    componentWillMount(){
        if(Platform.OS === 'ios') {
            Icon.getImageSource('ios-home-outline', 100, theme.bottomBarItemColor).then((source) => this.setState({homeNormal: source}));
            Icon.getImageSource('ios-home-outline', 100, theme.bottomBarItemSelectedColor).then((source) => this.setState({homeSelected: source}));
            Icon.getImageSource('ios-compass-outline', 100, theme.bottomBarItemColor).then((source) => this.setState({sortNormal: source}));
            Icon.getImageSource('ios-compass-outline', 100, theme.bottomBarItemSelectedColor).then((source) => this.setState({sortSelected: source}));
            Icon.getImageSource('ios-list-box-outline', 100, theme.bottomBarItemColor).then((source) => this.setState({findNormal: source}));
            Icon.getImageSource('ios-list-box-outline', 100, theme.bottomBarItemSelectedColor).then((source) => this.setState({findSelected: source}));
            Icon.getImageSource('ios-cube-outline', 100, theme.bottomBarItemColor).then((source) => this.setState({bookShelfNormal: source}));
            Icon.getImageSource('ios-cube-outline', 100, theme.bottomBarItemSelectedColor).then((source) => this.setState({bookShelfSelected: source}));
            Icon.getImageSource('ios-basketball-outline', 100, theme.bottomBarItemColor).then((source) => this.setState({myNormal: source}));
            Icon.getImageSource('ios-basketball-outline', 100, theme.bottomBarItemSelectedColor).then((source) => this.setState({mySelected: source}));
        }
    }

    render(){
        return(
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={[styles.tabBarStyle, {backgroundColor: theme.bottomBarItemBgColor}]}
                sceneStyle={{ paddingBottom: styles.tabBarStyle.height }}
                >
                {this._renderItem(HomePage, 'home', '起点', this.state.homeNormal, this.state.homeSelected)}
                {this._renderItem(SortPage, 'sort', '分类', this.state.sortNormal, this.state.sortSelected)}
                {this._renderItem(FindPage, 'find', '发现', this.state.findNormal, this.state.findSelected)}
                {this._renderItem(BookShelfPage, 'bookshelf', '书架', this.state.bookShelfNormal, this.state.bookShelfSelected)}
                {this._renderItem(MyPage, 'my', '我的', this.state.myNormal, this.state.mySelected)}
            </TabNavigator>
        );
    }

    _renderItem(Component, tab, tabName, normalIcon, selectedIcon){
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === tab}
                title={tabName}
                selectedTitleStyle={{color:theme.bottomBarItemSelectedColor}}
                renderIcon={() => <Image style={styles.tabBarItemIcon} source={normalIcon} />}
                renderSelectedIcon={() => <Image style={[styles.tabBarItemIcon]} source={selectedIcon} />}
                onPress={() => this.setState({ selectedTab: tab })}>
                {<Component navigator={this.props.navigator}/>}
            </TabNavigator.Item>
        );
    }

}

const styles = {
    tabBarItemIcon: {
        width: px2dp(20),
        height: px2dp(20)
    },
    tabBarStyle: {
        opacity: 0.8,
        height: px2dp(45),
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? px2dp(6) : px2dp(3)
    }
}

export default BottomBar;