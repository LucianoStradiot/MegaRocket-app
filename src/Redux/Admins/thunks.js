import {
  getAdminsLoading,
  getAdminsSuccess,
  getAdminsError,
  delAdminsSuccess,
  delAdminsLoading,
  delAdminsError
} from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    try {
      dispatch(getAdminsLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const data = await response.json();
      if (response.ok) {
        dispatch(getAdminsSuccess(data.data));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(getAdminsError(error));
    }
  };
};

export const deleteAdmin = (id) => {
  return async (dispatch) => {
    try {
      dispatch(delAdminsLoading());
      const responseAdmin = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'DELETE'
      });
      const data = await responseAdmin.json();
      if (responseAdmin.ok) {
        dispatch(delAdminsSuccess(data.data));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(delAdminsError(error));
      return error;
    }
  };
};
