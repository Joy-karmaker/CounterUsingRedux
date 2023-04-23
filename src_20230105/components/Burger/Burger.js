import React from "react";
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) =>{
    let transfromedIngredient = Object.keys(props.ingredient).map(igkey=>{
        return [...Array(props.ingredient[igkey])].map((_,i)=>{
            return <BurgerIngredient key={igkey+i} type={igkey}/>;
        });
    })
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[]);


    if(transfromedIngredient.length===0) {
        transfromedIngredient = "Please Add Ingredient";
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transfromedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;