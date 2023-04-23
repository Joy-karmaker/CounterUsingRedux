import * as actionTypes from './actions/actionTypes';
const initialState = {
    counter:0,
    results:[]
}
const reducer=(state=initialState, action)=>{
    switch(action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter:state.counter+1
            }
            break;

        case actionTypes.DECREMENT:
            return {
                ...state,
                counter:state.counter-1
            }
            break;

        case actionTypes.ADD:
            return {
                ...state,
                counter:state.counter+action.val
            }
            break;

        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter:state.counter-action.val
            }
            break;
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results:state.results.concat({id: new Date(),value:state.counter})
            }
            break;
        case actionTypes.DELETE_RESULT:
            const updatedArray=state.results.filter(result=>result.id!==action.elementId);
            return {
                ...state,
                results:updatedArray
            }
            break;
    }
    
    return state;
};

export default reducer;