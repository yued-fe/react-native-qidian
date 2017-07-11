'use strict';

import {AsyncStorage} from 'react-native';

const YW_QD_INDEX_DATA = 'YW_QD_INDEX_DATA';

export default class IndexLocalData{

    save(json){
        let data = {
            content: json
        };
        try {
            AsyncStorage.setItem(YW_QD_INDEX_DATA, JSON.stringify(data));
        } catch (error) {

        }
    }

    fetchLocalData(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(YW_QD_INDEX_DATA, (error, result)=>{
                if(!error){
                    const data = JSON.parse(result);
                    if(data) {
                        resolve(data.content);
                    }else{
                        reject(null);
                    }
                }else{
                    reject(null);
                }
            });
        });
    }
}