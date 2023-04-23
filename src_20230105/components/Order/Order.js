import React from 'react';
import classes from './Order.css';

const order=(props)=>{
    const ingredients=[];

    for(let ingredientName in props.ingredient) {
        ingredients.push({name:ingredientName, amount:props.ingredient[ingredientName]});
    }

    const ingredientOutput=ingredients.map(ig=>{
        return <span style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            padding: '5px',
            border:'1px solid #ccc'
        }}key={ig.name}>{ig.name} {ig.amount}</span>;
    })

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>BDT {Number.parseFloat(props.price).toFixed(2)} TK</strong></p>
        </div>
    );
};

export default order;