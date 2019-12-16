import { SET_ZONE } from "../actions";

export default function App(state = {}, action) {
  switch (action.type) {
    case SET_ZONE:
      return Object.assign({}, state, action.zone);
    default:
      return state;
  }
}
