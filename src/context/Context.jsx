import { createContext, useReducer, useEffect } from "react";

const parsing = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
};

const initialState = {
  details: parsing(localStorage.getItem('detailsData')) || [],
  editDetailCard: null
};

export const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        ...state,
        details: [...state.details, action.payload]
      };
    case 'ADD_LINK':
      return {
        ...state,
        details: state.details.map((detail) => (
          detail.id === action.payload.todoId ?
            {
              ...detail,
              links: [...detail.links, action.payload]
            } : detail
        ))
      }

    case 'DELETE_DATA':
      return {
        ...state,
        details: state.details.filter((detail) => detail.id !== action.payload)
      };

    case 'DELETE_LINK':
      return {
        ...state,
        details : state.details.map((detail) => (
          detail.id === action.payload.todoId ?
          {
            ...detail,
            links : detail.links.filter((link) => link.id != action.payload.id)
          }: detail
        ))
      }
    case 'SET_EDIT_ITEM':
      return {
        ...state,
        editDetailCard: action.payload
      }
    case 'UPDATE_IMPORTANCE':
      return {
        ...state,
        details: state.details.map((detail) => (
          detail.id === action.payload.id ?
            {
              ...detail,
              importance: action.payload.importance
            }
            : detail
        ))
      }
    case 'UPDATE_DETAIL':
      return {
        ...state,
        details: state.details.map((detail) => (
          detail.id === action.payload.id
            ? action.payload : detail
        )),
        editDetailCard: null
      }
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        details: state.details.map((detail) => (
          detail.id === action.payload ?
            detail.complete === false ? {
              ...detail,
              failed: false,
              pending: false,
              complete: true
            } : {
              ...detail,
              failed: false,
              pending: true,
              complete: false
            }
            : detail
        ))
      }
    case 'MARK_FAILED':
      return {
        ...state,
        details: state.details.map((detail) => (
          detail.id === action.payload ?
            {
              ...detail,
              failed: true,
              pending: false,
              complete: false
            }
            : detail
        ))
      }
    case 'CLEAR_ALL':
      return {
        ...state,
        details: []
      }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    localStorage.setItem('detailsData', JSON.stringify(state.details));
  }, [state.details]);

  return (
    <AuthContext.Provider
      value={[state.details, dispatch, state.editDetailCard]}
    >
      {children}
    </AuthContext.Provider>
  );
};
