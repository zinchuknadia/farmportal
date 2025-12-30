import React, { createContext, useContext, useReducer } from "react";

const UserPreferencesContext = createContext();

const initialState = {
  liked: [],
  saved: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_LIKE":
      if (state.liked.some(p => p.id === action.payload.id)) return state;
      return {
        ...state,
        liked: [...state.liked, action.payload],
      };

    case "REMOVE_LIKE":
      return {
        ...state,
        liked: state.liked.filter(p => p.id !== action.payload),
      };

    case "ADD_SAVE":
      if (state.saved.some(p => p.id === action.payload.id)) return state;
      return {
        ...state,
        saved: [...state.saved, action.payload],
      };

    case "REMOVE_SAVE":
      return {
        ...state,
        saved: state.saved.filter(p => p.id !== action.payload),
      };

    default:
      return state;
  }
}

export function UserPreferencesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserPreferencesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}

export const useUserPreferences = () => useContext(UserPreferencesContext);
