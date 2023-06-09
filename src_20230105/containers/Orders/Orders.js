import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state={
        orders:[],
        loading:true
    }
    componentDidMount() {
        axios.get('https://react-my-burger-54868-default-rtdb.firebaseio.com/orders.json')
        .then(res=>{
            const fatchedOrders=[];
            for(let key in res.data) {
                fatchedOrders.push({
                    ...res.data[key],
                    id:key
                });
            }
            this.setState({loading:false, orders:fatchedOrders});
        }).catch(error=>{
            this.setState({loading:false});
        });
    }
    render() {
        return(
            <div>
                {this.state.orders.map(order=>(
                    <Order 
                        key={order.id}
                        ingredient={order.ingredient}
                        price={order.price}
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);