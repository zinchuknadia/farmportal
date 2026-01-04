import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const UserPreferencesContext = createContext();

const initialState = {
  liked: [],
  saved: [],
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LIKED":
      return { ...state, liked: action.payload };

    case "SET_SAVED":
      return { ...state, saved: action.payload };

    case "RESET":
      return { ...initialState, loading: false };

    case "DONE_LOADING":
      return { ...state, loading: false };

    default:
      return state;
  }
}

export function UserPreferencesProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!user) {
      dispatch({ type: "RESET" });
      return;
    }

    const loadPreferences = async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (!snap.exists()) return;

        const data = snap.data();

        dispatch({
          type: "SET_LIKED",
          payload: data.liked || [],
        });

        dispatch({
          type: "SET_SAVED",
          payload: data.saved || [],
        });
      } catch (err) {
        console.error("Failed to load preferences:", err);
      } finally {
        dispatch({ type: "DONE_LOADING" });
      }
    };

    loadPreferences();
  }, [user]);

  return (
    <UserPreferencesContext.Provider
      value={{ ...state, dispatch }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}

export const useUserPreferences = () =>
  useContext(UserPreferencesContext);
