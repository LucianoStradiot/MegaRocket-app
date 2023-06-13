import {
  getAdminsLoading,
  getAdminsSuccess,
  getAdminsError,
  delAdminsSuccess,
  delAdminsLoading,
  delAdminsError,
  postAdminsError,
  postAdminsLoading,
  postAdminsSuccess,
  putAdminsLoading,
  putAdminsSuccess,
  putAdminsError
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
        dispatch(delAdminsSuccess(data.data, data.id));
      } else {
        dispatch(delAdminsError(data.message));
      }
      return data;
    } catch (error) {
      return error;
    }
  };
};

export const createAdmin = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(postAdminsLoading());
      const createdAdmin = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await createdAdmin.json();
      if (createdAdmin.ok) {
        dispatch(postAdminsSuccess(data.data, data.id));
      } else {
        dispatch(postAdminsError(data.message));
      }
      return data;
    } catch (error) {
      return error;
    }
  };
};

export const putAdmins = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(putAdminsLoading());
      const updatedAdminRes = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admins/${payload.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload.body)
        }
      );

      const data = await updatedAdminRes.json();
      if (updatedAdminRes.ok) {
        dispatch(putAdminsSuccess(data.data, data.id));
      } else {
        dispatch(putAdminsError(data.message));
      }
      return data;
    } catch (error) {
      return error;
    }
  };
};
