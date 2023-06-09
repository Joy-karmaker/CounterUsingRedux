import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state={
        ingredient: null,
        totalPrice:0
    }

    componentWillMount() {
        const query=new URLSearchParams(this.props.location.search);
        const ingredient={};
        let price=0;
        for(let param of query.entries()) {
            if(param[0]==="price") {
                price=param[1];
            }else {
                ingredient[param[0]]=+param[1];
            }
        }
        this.setState({ingredient:ingredient, totalPrice:price});
    }

    checkoutCancledHandler=()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredient={this.state.ingredient}
                    checkoutCancled={this.checkoutCancledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path+"/contact-data"} render={(props)=>(<ContactData ingredient={this.state.ingredient} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;