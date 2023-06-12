import { getClassesSuccess, getClassesError, getClassesLoading } from './actions';

export const getClasses = () => {
  return async (dispatch) => {
    try {
      dispatch(getClassesLoading());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
      const data = await response.json();
      if (response.ok) {
        dispatch(getClassesSuccess(data.data));
      } else {
        throw new Error(data.data);
      }
    } catch (error) {
      dispatch(getClassesError(error));
    }
  };
};
