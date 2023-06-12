import { getAdminsLoading, getAdminsSuccess, getAdminsError } from './actions';

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
