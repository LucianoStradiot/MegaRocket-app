import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError,
  getSuperAdminsIdPending,
  getSuperAdminsIdSuccess,
  getSuperAdminsIdError,
  createSuperAdminPending,
  createSuperAdminSuccess,
  createSuperAdminError,
  editSuperAdminPending,
  editSuperAdminError,
  editSuperAdminSuccess
} from './actions';

export const getSuperAdmins = () => {
  return async (dispatch) => {
    dispatch(getSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin`);
      const data = await response.json();
      if (response.ok) {
        dispatch(getSuperAdminsSuccess(data.data));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(getSuperAdminsError(error));
    }
  };
};

export const getSuperAdminById = (id) => {
  return async (dispatch) => {
    dispatch(getSuperAdminsIdPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin/${id}`, {
        method: 'GET'
      });
      const { data } = await response.json();
      dispatch(getSuperAdminsIdSuccess(data));
      return data;
    } catch (error) {
      dispatch(getSuperAdminsIdError(error));
    }
  };
};

export const createSuperAdmin = (superAdmin) => {
  return async (dispatch) => {
    dispatch(createSuperAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (!data.error || data.error === false) {
        dispatch(createSuperAdminSuccess(data.data));
        return data;
      } else {
        dispatch(createSuperAdminError(data.message.toString()));
        return data;
      }
    } catch (error) {
      dispatch(createSuperAdminError(error.toString()));
    }
  };
};

export const editSuperAdmin = (id, superAdmin) => {
  return async (dispatch) => {
    dispatch(editSuperAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (!data.error) {
        dispatch(editSuperAdminSuccess(data.data));
        return data;
      } else {
        dispatch(editSuperAdminError(data.message.toString()));
        return data;
      }
    } catch (error) {
      dispatch(editSuperAdminError(error));
    }
  };
};

export const deleteSuperAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteSuperAdminsSuccess(id));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(deleteSuperAdminsError(error));
    }
  };
};
