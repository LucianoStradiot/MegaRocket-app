import {
  getMembersSuccess,
  getMembersPending,
  getMembersError,
  createMembersPending,
  createMembersSuccess,
  createMembersError,
  updateMembersPending,
  updateMembersSuccess,
  updateMembersError,
  deleteMembersPending,
  deleteMembersSuccess,
  deleteMembersError
} from './actions';

export const getMembers = () => {
  return async (dispatch) => {
    try {
      dispatch(getMembersPending());

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'GET'
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(getMembersSuccess(data.data));
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      dispatch(getMembersError(error));
    }
  };
};
export const createMember = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(createMembersPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(createMembersSuccess(data.data));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(createMembersError(error));
      return error;
    }
  };
};

export const updateMember = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(updateMembersPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload.body)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updateMembersSuccess(data.data, payload.id));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(updateMembersError(error));
      return error;
    }
  };
};

export const deleteMember = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(deleteMembersPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${payload}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteMembersSuccess(data.data));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(deleteMembersError(error));
      return error;
    }
  };
};
