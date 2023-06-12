import {
  getSubscriptionsPending,
  getSubscriptionsSuccess,
  getSubscriptionsError,
  postSubscriptionsPending,
  postSubscriptionsSuccess,
  postSubscriptionsError,
  putSubscriptionsPending,
  putSubscriptionsSuccess,
  putSubscriptionsError,
  deleteSubscriptionsPending,
  deleteSubscriptionsSuccess,
  deleteSubscriptionsError
} from './actions';

export const getSubscriptions = () => {
  return async (dispatch) => {
    try {
      dispatch(getSubscriptionsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`, {
        method: 'GET'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(getSubscriptionsSuccess(data.data));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(getSubscriptionsError(error));
    }
  };
};

export const createSubscription = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(postSubscriptionsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(postSubscriptionsSuccess(data.data));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(postSubscriptionsError(error));
      return error;
    }
  };
};

export const updateSubscription = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(putSubscriptionsPending());
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
      const data = await response.json();
      if (response.ok) {
        dispatch(putSubscriptionsSuccess(data.data, payload.id));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(putSubscriptionsError(error));
      return error;
    }
  };
};

export const deleteSubscription = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteSubscriptionsPending());
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(deleteSubscriptionsSuccess(id));
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(deleteSubscriptionsError(error));
      return error;
    }
  };
};
