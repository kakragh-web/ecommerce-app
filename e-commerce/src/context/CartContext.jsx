import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  console.log('CartReducer: Action type:', action.type, 'Payload:', action.payload);
  console.log('CartReducer: Current state:', state);
  
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        const newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
        console.log('CartReducer: Updated existing item, new state:', newState);
        return newState;
      }
      const newStateWithNewItem = {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
      console.log('CartReducer: Added new item, new state:', newStateWithNewItem);
      return newStateWithNewItem;
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    case 'LOAD_CART':
      const loadedState = { ...state, items: action.payload };
      console.log('CartReducer: Loaded cart, new state:', loadedState);
      return loadedState;
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      console.log('CartContext: Loading cart from localStorage');
      const savedCart = localStorage.getItem('cart');
      console.log('CartContext: Saved cart from localStorage:', savedCart);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('CartContext: Parsed cart:', parsedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      console.log('CartContext: Saving to localStorage:', state.items);
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }, [state.items, isInitialized]);

  const addToCart = (product) => {
    console.log('CartContext: Adding product:', product);
    dispatch({ type: 'ADD_TO_CART', payload: product });
    console.log('CartContext: Dispatched ADD_TO_CART');
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};