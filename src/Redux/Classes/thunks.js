import {
  getClassesSuccess,
  getClassesError,
  getClassesLoading,
  deleteClassLoading,
  deleteClassSuccess,
  deleteClassError
} from './actions';

export const getClasses = () => {
  return async (dispatch) => {
    try {
      dispatch(getClassesLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      } else {
        dispatch(getClassesSuccess(data.data));
      }
    } catch (error) {
      dispatch(getClassesError(error));
    }
  };
};

export const deleteClass = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteClassLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      } else {
        dispatch(deleteClassSuccess(data.data));
        console.log(data.message);
        return data;
      }
    } catch (error) {
      dispatch(deleteClassError(error));
      return error;
    }
  };
};
