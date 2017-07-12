# react-native-qidian

## 运行

1、 git clone https://github.com/yued-fe/react-native-qidian.git

2、 cd react-native-qidian && npm install

3、 react-native run-ios


## 第三方库

1、 [react-native-swiper](https://github.com/leecade/react-native-swiper)

2、 [react-native-storage](https://github.com/sunnylqm/react-native-storage)

3、 [react-native-tab-navigator](https://github.com/happypancake/react-native-tab-navigator)

4、 [react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view)

5、 [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)


## JS目录

```
├── actions                     //redux相关（预留）
│   ├── actionTypes.js
│   └── requestIndexData.js
├── animation                   //存放动画 
│   └── myNavigatorScene.js
├── api                         //统一管理restful api(预留)
│   └── api.js
├── app.js                      //入口文件
├── common                      //一些通用的组件，和components的区别是，components需要是一个丢在任何项目都能run的组件，common偏业务
│   ├── bottomBar.js            //底部菜单
│   └── theme.js                //主题管理
├── components                  //通用组件，尽量和业务无关
│   ├── backPageComponent.js    //安卓回退组件（预留）
│   ├── button.js               //按钮组件
│   ├── loadFailTemplate.js     //加载失败模板
│   └── loadingTemplate.js      //加载中模板
├── native_modules              //与native通信模块
│   ├── pushNative.js           //跳转到native
│   └── splashScreen.js         //启动图
├── page                        //业务页面
│   ├── bookShelf.js
│   ├── find.js
│   ├── home.js
│   ├── my.js
│   └── sort.js 
├── persistence                 //本地缓存管理（预留）
│   └── indexLocalData.js
├── reducers                    //redux相关（预留）
│   ├── index.js
│   └── indexDataState.js
├── res                         //资源文件
│   ├── font                    //字体文件，添加字体需要在端做相应添加
│   │   ├── config.json
│   │   └── fontello.ttf
│   └── img                     //图片
├── store                       //redux相关（预留）
│   └── index.js
└── utils                       //工具类
    ├── fetchUtil.js
    ├── formatUtil.js
    ├── pxtodpUtil.js
    └── toastUtil.js
```

## 约定

1、 使用[pxtodpUtil](https://github.com/yued-fe/react-native-qidian/blob/master/js/utils/pxtodpUtil.js)还原设计稿(目前定义为375px宽的设计稿)

2、 使用[theme](https://github.com/yued-fe/react-native-qidian/blob/master/js/common/theme.js)管理公共样式（包括页面背景色、头部、底部、点击高亮等）

3、 使用'1/PixelRatio.get()'的方式给borderWidth赋值

4、 使用Platform适配android和ios的差异

5、 本地存储的key值和id值不要用_


## 例子

### 数据请求

数据请求需要写在InteractionManager.runAfterInteractions回调里，拿到数据后变更状态显示，注意一下几个生命周期的状态变化：

```
constructor(props){
    super(props);
    this.state = {
        didMount: false,
        hasError: false
    };
}
componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
        this.fetchData();
    });
}
fetchData() {
    fetch('https://m.readnovel.com/majax/channel/new')
        .then(response => response.json())
        .then((result) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(resData),
                didMount: true
            });
        })
        .catch((error)=>{
            this.setState({
                didMount: false,
                hasError: true
            });
        });
}
render() {
    return ({
    	this.state.didMount ?
            <ListView
                style={styles.content}
                dataSource={this.state.dataSource}
                renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData,sectionId,rowId)}
                automaticallyAdjustContentInsets={false}
            />
            :
            this.state.hasError ?
                <LoadFailTemplate/>
                :
                <LoadingTemplate/>
	})
}
```

### 本地存储

我在[app.js](https://github.com/yued-fe/react-native-qidian/blob/master/js/app.js)中已经注册了一个全局的storage，业务页面直接使用即可，看下面的代码：

```
this.KEY = 'YWQDNEW';//定义key，不要用_

/*
* 为了二次加载时不用再出loading，在componentWillMount（render前）时判断有本地数据，就给数据赋值，直接渲染数据，就可实现秒出
*/
componentWillMount(){
    //获取数据使用storage.load
    storage.load({
        key: this.KEY,
        syncInBackground: false
    }).then(result => {
        let resData = [{categoryName:"大神新书",subList:[],more:""},{categoryName:"最新上架",subList:[],more:""},{categoryName:"畅销新书",subList:[],more:""}];
        resData[0].subList = result.data.ds;
        resData[0].more = result.data.dsMore;
        resData[1].subList = result.data.new;
        resData[1].more = result.data.newMore;
        resData[2].subList = result.data.hot;
        resData[2].more = result.data.hotMore;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(resData),
            didMount: true,
            hasLocalData: true
        });
    }).catch(err => {
    })
}

componentDidMount(){
    InteractionManager.runAfterInteractions(() => {
        if(!this.state.hasLocalData){
            this.fetchData();
        }
    });
}

fetchData() {
    fetch('https://m.readnovel.com/majax/channel/new')
        .then(response => response.json())
        .then((result) => {
        	//请求成功则保存数据，使用storage.save
            storage.save({
                key: this.KEY,
                data: result,
                expires: 1000 * 3600
            });
        })
        .catch((error)=>{
        });
}
```
涉及到一个页面多条数据，则还要设计一个id的参数

```
storage.save({
    key: this.KEY,
    id: bookId,
    data: result,
    expires: 1000 * 3600
});
```
更多使用可见[react-native-storage](https://github.com/sunnylqm/react-native-storage)

## 组件库文档

[文档](https://github.com/yued-fe/react-native-qidian/tree/master/readme/)
