// Import necessary modules
import { createSlice } from "@reduxjs/toolkit";

// Create a slice for the cart
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    subTotal: 0,
    total: 0,
  },
  reducers: {
   
    addItemToCart: (state, action) => {
      state.items.push(action.payload);
    },
    // Reducer for removing an item from the cart
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== itemIdToRemove); 
      console.log("Removing item from cart:", state.items); 
    },
    // Reducer for changing the quantity of an item in the cart
    quantityChange: (state, action) => {
      const { id, value } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = value;
      }
    },
    // Reducer for updating the subtotal of the cart
    updateSubTotal: (state, action) => {
      state.subTotal = action.payload;
    },
    // Reducer for updating the total of the cart
    updateTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

// Export action creators and reducer
export const {
  addItemToCart,
  removeItemFromCart,
  quantityChange,
  updateSubTotal,
  updateTotal
} = cartSlice.actions;

export default cartSlice.reducer;
