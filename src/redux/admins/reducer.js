import { FETCH_ADMINS, ADD_ADMIN, REMOVE_ADMIN, EDIT_ADMIN } from './constants';

const initialState = {
  admins: []
};

export const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMINS:
      return {
        ...state,
        admins: action.payload
      };
    case ADD_ADMIN:
      return {
        ...state,
        admins: [...state.admins, action.payload]
      };
    case REMOVE_ADMIN:
      return {
        ...state,
        admins: state.admins.filter((admin) => admin.id !== action.payload)
      };
    case EDIT_ADMIN:
      return {
        ...state,
        admins: state.admins.map((admin) =>
          admin.id === action.payload.id ? action.payload : admin
        )
      };
    default:
      return state;
  }
};
