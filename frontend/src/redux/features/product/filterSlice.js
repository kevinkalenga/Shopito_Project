import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action){
      const {products, search} = action.payload 
      const tempProducts = products.filter((product) => product.name?.toLowerCase().includes(search.toLowerCase()) 
                         || product.category?.toLowerCase().includes(search.toLowerCase())) 
          
                         state.filteredProducts = tempProducts
    },
    SORT_PRODUCTS(state, action){
          const { products, sort } = action.payload;
          let tempProducts = [...products];

          if (sort === "latest") {
            tempProducts = [...products];
          }

          if (sort === "lowest-price") {
            tempProducts.sort((a, b) => a.price - b.price);
          }

          if (sort === "highest-price") {
            tempProducts.sort((a, b) => b.price - a.price);
          }

          if (sort === "a-z") {
            tempProducts.sort((a, b) => a.name.localeCompare(b.name));
          }

          if (sort === "z-a") {
            tempProducts.sort((a, b) => b.name.localeCompare(a.name));
          }
          state.filteredProducts = tempProducts
    }

  }
});

export const {FILTER_BY_SEARCH, SORT_PRODUCTS} = filterSlice.actions 

export const selecteFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer