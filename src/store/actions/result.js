import * as actionTypes from './actionTypes';

export const saveResult=(res)=>{
    return {
        type: actionTypes.STORE_RESULT,
        result:res
    };
}

export const store_result=(value)=>{
    return (dispatch,getState) => {
        setTimeout(()=>{
            // const oldCounter=getState().ctr.counter;
            // console.log(oldCounter);
            return dispatch(saveResult(value))
        },1000)
    };
};

export const delete_result=(value)=>{
    return {
        type: actionTypes.DELETE_RESULT,
        elementId:value
    };
};