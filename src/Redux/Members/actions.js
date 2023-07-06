import * as actionsMembers from './constants';

export const getMembersPending = () => {
  return {
    type: actionsMembers.GET_MEMBERS_PENDING
  };
};
export const getMembersSuccess = (listMembers) => {
  return {
    type: actionsMembers.GET_MEMBERS_SUCCESS,
    payload: listMembers
  };
};
export const getMembersError = (error) => {
  return {
    type: actionsMembers.GET_MEMBERS_ERROR,
    payload: error
  };
};
export const createMembersPending = () => {
  return {
    type: actionsMembers.POST_MEMBERS_PENDING
  };
};
export const createMembersSuccess = (member) => {
  return {
    type: actionsMembers.POST_MEMBERS_SUCCESS,
    payload: member
  };
};
export const createMembersError = (error) => {
  return {
    type: actionsMembers.POST_MEMBERS_ERROR,
    payload: error
  };
};

export const updateMembersPending = () => {
  return {
    type: actionsMembers.PUT_MEMBERS_PENDING
  };
};
export const updateMembersSuccess = (editMember, id) => {
  return {
    type: actionsMembers.PUT_MEMBERS_SUCCESS,
    payload: editMember,
    id
  };
};
export const updateMembersError = (error) => {
  return {
    type: actionsMembers.PUT_MEMBERS_ERROR,
    payload: error
  };
};
export const deleteMembersPending = () => {
  return {
    type: actionsMembers.DELETE_MEMBERS_PENDING
  };
};
export const deleteMembersSuccess = (deleteMember) => {
  return {
    type: actionsMembers.DELETE_MEMBERS_SUCCESS,
    payload: deleteMember
  };
};
export const deleteMembersError = (error) => {
  return {
    type: actionsMembers.DELETE_MEMBERS_ERROR,
    payload: error
  };
};
