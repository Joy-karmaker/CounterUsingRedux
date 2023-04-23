import React, { Component } from 'react';
import {connect} from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions/index';
//import {increment,decrement,add,subtract,store_result,delete_result} from '../../store/actions/actions';

class Counter extends Component {
    state = {
        counter: 50
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
            default:
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter}/>
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}/>
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}/>
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}/>
                <hr/>
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(storedResult=>(
                       <li key={storedResult.id} onClick={()=>this.props.onDeleteResult(storedResult.id)}>{storedResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        ctr:state.ctr.counter,
        storedResults:state.res.results
    };
};

const mapDispatchToProps=(dispatch)=>{
    return {
        onIncrementCounter:()=>dispatch(actionTypes.increment()),
        onDecrementCounter:()=>dispatch(actionTypes.decrement()),
        onAddCounter:()=>dispatch(actionTypes.add(10)),
        onSubtractCounter:()=>dispatch(actionTypes.subtract(15)),
        onStoreResult:(result)=>dispatch(actionTypes.store_result(result)),
        onDeleteResult:(id)=>dispatch(actionTypes.delete_result(id)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);