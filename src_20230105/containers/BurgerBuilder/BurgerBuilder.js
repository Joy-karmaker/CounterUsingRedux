import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'; 
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 10,
    bacon: 50,
    cheese: 20,
    meat: 70
};

class BurgerBuilder extends Component {
    state = {
        ingredient: null,
        total_price: 120,
        purchasable: false,
        isPurchasing: false,
        loading:false,
        error:false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-54868-default-rtdb.firebaseio.com/ingredients.json').then(response=>{
            this.setState({ingredient:response.data});
        }).catch(error=>{
            this.setState({error:true});
        });
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = (type)=> {
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount+1;
        const updatedIngridients = {
            ...this.state.ingredient
        };
        updatedIngridients[type]=updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.total_price;
        const newPrice = oldPrice+priceAddition;
        this.setState({total_price: newPrice,ingredient: updatedIngridients});
        this.updatePurchaseState(updatedIngridients);
    }

    removeIngredientHandler = (type)=> {
        const oldCount = this.state.ingredient[type];
        if(oldCount<=0) {
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngridients = {
            ...this.state.ingredient
        };
        updatedIngridients[type]=updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.total_price;
        const newPrice = oldPrice-priceDeduction;
        this.setState({total_price: newPrice,ingredient: updatedIngridients});
        this.updatePurchaseState(updatedIngridients);
    }

    purchaseHandler =()=> {
        this.setState({isPurchasing: true});
    }

    purchaseCancelHandler =()=> {
        this.setState({isPurchasing: false});
    }

    purchaseContinueHandler =()=> {
        const queryParams=[];
        for(let i in this.state.ingredient) {
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredient[i]));
        }
        queryParams.push("price="+this.state.total_price);
        const queryString=queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredient
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        let orderSummary=null;
        
        if(this.state.loading) {
            orderSummary=<Spinner/>;
        }

        let burger=this.state.error ? <p>This ingredients can not be loaded!!</p>:<Spinner/>;
        

        if(this.state.ingredient) {
            burger=(
                <Auxiliary>
                    <Burger ingredient={this.state.ingredient}/>
                    <Buildcontrols 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disable={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.total_price}
                    />
                </Auxiliary>
            );

            orderSummary = <OrderSummary 
            ingredient={this.state.ingredient}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.state.total_price}/>;
        }
        
        return (
            <Auxiliary>
                <Modal show={this.state.isPurchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
