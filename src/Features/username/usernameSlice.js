import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from 'react-hot-toast';
import { getCartAsync } from "./transactionSlice";

const initialState = {
    id: null,
    user: ''
}

export const usernameSlice = createSlice({
    name: 'username',
    initialState,
    reducers: {
        onSaveData: (initialState, action) => {
            initialState.id = action.payload.id
            initialState.user = action.payload.username
        }
    }
})

export const loginAsync = (_login, _password, _google) => async (dispatch) => {
    try {
        if (_google && _password === 'loginWithGoogle') {
            var response = await axios.get(`https://mesquite-shell-titanosaurus.glitch.me/users?email=${_login}`)
        } else if (!_google) {
            if (_login.includes('@')) {
                var response = await axios.get(`https://mesquite-shell-titanosaurus.glitch.me/users?email=${_login}&password=${_password}`)
            } else {
                var response = await axios.get(`https://mesquite-shell-titanosaurus.glitch.me/users?username=${_login}&password=${_password}`)
            }
        }

        if (response.data.length === 0) throw { message: "Account not Found" }

        toast.success('Login Success!')

        localStorage.setItem('id', response.data[0].id)

        setTimeout(() => {
            dispatch(onSaveData({ username: response.data[0].username }))
            dispatch(getCartAsync())
        }, 1000);
    } catch (error) {
        toast.error(error.message)
    }
}

export const keepLoginAsync = () => async (dispatch) => {
    try {
        let id = localStorage.getItem('id')
        if (id) {
            let response = await axios.get(`https://mesquite-shell-titanosaurus.glitch.me/users/${id}`)
            dispatch(onSaveData(response.data))
        }
    } catch (error) {

    }
}

export const Logout = () => (dispatch) => {
    try {
        localStorage.removeItem('id')
        dispatch(onSaveData({ id: null, username: '' }))
        dispatch(getCartAsync())
    } catch (error) {

    }
}
export const { onSaveData } = usernameSlice.actions

export default usernameSlice.reducer