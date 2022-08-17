/*
 *
 * Form reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  userData: []
};

export const { Types: formTypes, Creators: formCreators } = createActions({
  addUserData: ['userData'],
  removeUser: ['userKey'],
  editUser: ['editUserData', 'index'],
  getUserData: null
});

export const formReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case formTypes.ADD_USER_DATA:
        draft.userData.push(action.userData);
        break;
      case formTypes.REMOVE_USER:
        draft.userData.splice(action.userKey, 1);
        break;
      case formTypes.EDIT_USER:
        draft.userData[action.index] = action.editUserData;
        break;
      default:
    }
  });

export default formReducer;
