import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: true,
    products: [],
    newselectedProducts:[],
    productList:[],
    error: "",
};

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios
    .get("https://dynamicpricing.expertvillagemedia.com/public/api/getproduct")
    .then((response)=> response.data)
})

export const dashboardSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.productList = action.payload.data.products;
            state.error = null;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error.message; // Set error message
        });
    },
    reducers:{
        checkProduct:(state , action)=> {     
            state.newselectedProducts =  action.payload    
                       
        }, 
        uncheckProduct:(state , action)=> {     
            state.newselectedProducts = state.newselectedProducts.filter(product => product !== Number(action.payload));        
                                 
        },
        postData:(state, action)=> {
            console.log(action);            
            state.products = state.products.concat(state.newselectedProducts);
            state.newselectedProducts = [];
        }

    }
    
});


export const {checkProduct , uncheckProduct , postData} = dashboardSlice.actions

export default dashboardSlice.reducer;
