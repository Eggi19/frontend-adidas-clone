import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import UrlAPI from "../API";

const initialState = {
    cart: null,
    qty: null
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        onGetCart: (initialState, action) => {
            initialState.cart = action.payload.cart
            initialState.qty = action.payload.qty
        }
    }
})

export const getCartAsync = () => async (dispatch) => {
    try {
        let qty = 0
        const id = localStorage.getItem('id')
        const response = await axios.get(`https://mesquite-shell-titanosaurus.glitch.me/carts?_expand=user&_expand=type&_expand=product&userId=${id}`)

        response.data.map(value => {
            qty += value.quantity
        })
        dispatch(onGetCart({ qty, cart: response.data }))
    } catch (error) {

    }
}

export const updateStock = () => async (dispatch) => {
    try {
        const id = localStorage.getItem('id')
        const findTotalCart = await axios.get(`https://mesquite-shell-titanosaurus.glitch.me/carts?_expand=user&_expand=type&_expand=product&userId=${id}`)

        findTotalCart.data.forEach(async (value, index) => {
            setTimeout(async () => {
                await axios.patch(`${ UrlAPI }/types/${ value.typeId }`, {stock: value.type.stock - value.quantity});

                await axios.delete(`${ UrlAPI }/carts/${ value.id }`);

                dispatch(getCartAsync());
            }, 500);
        }); 
    } catch (error) {
        console.log(error);
    }
}

export const { onGetCart } = cartSlice.actions

export default cartSlice.reducer