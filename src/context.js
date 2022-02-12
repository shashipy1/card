import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'


// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN   
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext();


const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}


const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  //  clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  //Remove items
  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  // Increasses items
  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id })
  }

  // Decrease ites
  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id })
  }

  // FETCHIG DATA AND LOADING SETTING
  const fetchData = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }

  // all woking increasing ans decreasing by ussing one function
  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
    // dispatch({type: 'Random'})     given error
  }, [state.cart])


  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
