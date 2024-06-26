import axios from "axios";
import { ADD_FAV, REMOVE_FAV, FILTER_FAV, ORDER_FAV } from "./actions-type";

const initialState = {
  myFavorites: [],
  allCharacters: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAV:
      return { ...state, myFavorites: action.payload, allCharacters: action.payload };
      // return {
      //   ...state,
      //   myFavorites: [...state.myFavorites, action.payload],
      //   allCharacters: [...state.allCharacters, action.payload],
      // };

    case REMOVE_FAV:
      return { ...state, myFavorites: action.payload };
      // const filteredFavs = state.myFavorites.filter((fav) => {
      //   fav.id !== Number(action.payload);
      // });
      // return {
      //   ...state,
      //   myFavorites: filteredFavs,
      // };

    case FILTER_FAV:

      const filterFavs = action.payload === "All" ?
      state.allCharacters
      : state.allCharacters.filter(
        char => char.gender === action.payload
      );
      return {
        ...state,
        myFavorites: filterFavs,
      };


    case ORDER_FAV:
      const orderFavs = state.myFavorites.sort((a, b) => {
        return action.payload === "A" ? a.id - b.id : b.id - a.id;
      });
      return {
        ...state,
        myFavorites: orderFavs,
      };
      
    default:
      return { ...state };
  }
}

export default rootReducer;
