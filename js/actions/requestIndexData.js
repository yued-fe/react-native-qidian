'use strict';

import * as types from './actionTypes';
import requestUrl from '../api/api';
import IndexLocalData from '../persistence/indexLocalData';

function requestData() {
    return {
        type: types.FETCH_INDEX_DATE_REQUEST,
    };
}

function fetchSuccess(json){
    return {
        type: types.FETCH_INDEX_DATA_SUCCESS,
        dataSource: json
    }
}

function fetchFailure() {
    return {
        type: types.FETCH_INDEX_DATA_FAILURE
    };
}


export function fetchData() {
    const url = requestUrl.getBookStoreInfo;
    return (dispatch) => {
        dispatch(requestData());//相当于showloading 
        let indexLocalDataAction = new IndexLocalData(); 
        indexLocalDataAction.fetchLocalData().then((localData) => {
            dispatch(fetchSuccess(localData));
        }, (localData)=>{
            fetch(url,{
                method: "GET",
            }).then(response => response.json()).then(json => {
                    indexLocalDataAction.save(json.data);
                    dispatch(fetchSuccess(json.data));
                }).catch((error)=>{
                    dispatch(fetchFailure());
                });
            });
    }
}