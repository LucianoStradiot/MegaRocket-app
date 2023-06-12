import * as actionsMembers from './constants';

export const getMembersPending = () => {
  return {
    type: actionsMembers.GET_MEMBERS_PENDING
  };
};
export const getMembersSuccess = (listMembers) => {
  return {
    type: actionsMembers.GET_MEMBERS_SUCCESS,
    payload: {
      listMembers
    }
  };
};
export const getMembersError = (error) => {
  return {
    type: actionsMembers.GET_MEMBERS_ERROR,
    payload: {
      error
    }
  };
};
// export const createMembers = () => {
//   return {
//     type: actionsMembers.ADD_MEMBERS
//   };
// };
// export const updateMembers = () => {
//   return {
//     type: actionsMembers.EDIT_MEMBERS
//   };
// };
// export const deleteMembers = () => {
//   return {
//     type: actionsMembers.DELETE_MEMBERS
//   };
// };
