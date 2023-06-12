import { getMembersSuccess, getMembersPending, getMembersError } from './actions';

export const getMembers = async () => {
  return async (dispatch) => {
    try {
      dispatch(getMembersPending());

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'GET'
      });
      if (response.ok) {
        dispatch(getMembersPending());
        const { data } = await response.json();
        dispatch(getMembersSuccess(data));
      }
      if (!response.ok) {
        dispatch(getMembersPending());
        const { error } = await response.json();
        throw new Error(error);
      }
    } catch (error) {
      dispatch(getMembersPending());
      dispatch(getMembersError(error));
    }
  };
};
