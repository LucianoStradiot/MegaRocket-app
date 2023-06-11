import { getSubscriptionsPending, getSubscriptionsSuccess, getSubscriptionsError } from './actions';

export const getSubscriptions = async (dispatch) => {
  dispatch(getSubscriptionsPending);

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`, {
      method: 'GET'
    });
    const data = await response.json();
    dispatch(getSubscriptionsSuccess(data.data));
  } catch (error) {
    dispatch(getSubscriptionsError(error));
  }
};
