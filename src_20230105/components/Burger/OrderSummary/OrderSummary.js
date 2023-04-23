import React, {Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log("Order Summery Will update!!");
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredient).map(igkey=>{
            return <li key={igkey}>
                        <span style={{textTransform:'capitalize'}}>{igkey}</span>: {this.props.ingredient[igkey]}
                   </li>
        });

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxiliary>
        )
    }
}

export default OrderSummary;