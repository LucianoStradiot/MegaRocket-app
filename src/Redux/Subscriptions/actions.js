import {
  GET_SUBSCRIPTIONS_PENDING,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
  ADD_SUBSCRIPTIONS_PENDING,
  ADD_SUBSCRIPTIONS_SUCCESS,
  ADD_SUBSCRIPTIONS_ERROR,
  PUT_SUBSCRIPTIONS_PENDING,
  PUT_SUBSCRIPTIONS_SUCCESS,
  PUT_SUBSCRIPTIONS_ERROR,
  DEL_SUBSCRIPTIONS_PENDING,
  DEL_SUBSCRIPTIONS_SUCCESS,
  DEL_SUBSCRIPTIONS_ERROR
} from './constants';

export const getSubscriptionsPending = () => ({
  type: GET_SUBSCRIPTIONS_PENDING
});

export const getSubscriptionsSuccess = (subscriptions) => ({
  type: GET_SUBSCRIPTIONS_SUCCESS,
  payload: subscriptions
});

export const getSubscriptionsError = (error) => ({
  type: GET_SUBSCRIPTIONS_ERROR,
  payload: error
});

export const postSubscriptionsPending = () => {
  return {
    type: ADD_SUBSCRIPTIONS_PENDING
  };
};

export const postSubscriptionsSuccess = (newSubscription) => {
  return {
    type: ADD_SUBSCRIPTIONS_SUCCESS,
    payload: newSubscription
  };
};

export const postSubscriptionsError = (error) => {
  return {
    type: ADD_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};

export const putSubscriptionsPending = () => {
  return {
    type: PUT_SUBSCRIPTIONS_PENDING
  };
};

export const putSubscriptionsSuccess = (updateSubscription, id) => {
  return {
    type: PUT_SUBSCRIPTIONS_SUCCESS,
    payload: updateSubscription,
    id
  };
};

export const putSubscriptionsError = (error) => {
  return {
    type: PUT_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};

export const deleteSubscriptionsPending = () => {
  return {
    type: DEL_SUBSCRIPTIONS_PENDING
  };
};

export const deleteSubscriptionsSuccess = (id) => {
  return {
    type: DEL_SUBSCRIPTIONS_SUCCESS,
    payload: id
  };
};

export const deleteSubscriptionsError = (error) => {
  return {
    type: DEL_SUBSCRIPTIONS_ERROR,
    payload: error
  };
};
