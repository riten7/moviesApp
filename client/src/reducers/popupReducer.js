import { POPUP_SHOWN } from '../actions/actionTypes';
const popupReducer = (state = false, action) => {
  switch (action.type) {
    case POPUP_SHOWN:
      return action.payload.isShown

    default:
      return state;
  }
}

export default popupReducer;