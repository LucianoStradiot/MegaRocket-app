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
  deleteMembersError,
  loginMembersPending,
  loginMembersSuccess,
  loginMembersError
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
      } else {
        dispatch(createMembersError(data.message));
      }
      return data;
    } catch (error) {
      return error;
    }
  };
};
export const loginMemberUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(loginMembersPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/userLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(loginMembersSuccess(data.data));
      } else {
        dispatch(loginMembersError(data.message));
      }
      return data;
    } catch (error) {
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
      } else {
        dispatch(updateMembersError(data.message));
      }
      return data;
    } catch (error) {
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
      } else {
        dispatch(deleteMembersError(data.message));
      }
      return data;
    } catch (error) {
      return error;
    }
  };
};
