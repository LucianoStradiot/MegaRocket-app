import { getSubscriptionsPending, setSubscriptionsSuccess, getSubscriptionsError } from './actions';

export const getSubscriptions = async (dispatch) => {
  dispatch(getSubscriptionsPending());
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`, {
      method: 'GET'
    });
    const data = await response.json();
    dispatch(setSubscriptionsSuccess(data.data));
  } catch (error) {
    dispatch(getSubscriptionsError(error));
  }
};

export const createSubscription = async (dispatch, payload) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    //ask about this
    return response;
  } catch (error) {
    return error;
  }
};

export const updateSubscription = async (dispatch, payload) => {
  console.log(payload);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/subscriptions/${payload.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload.body)
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
