import {
  GET_SUBSCRIPTIONS_PENDING,
  SET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR
} from './constants';

export const getSubscriptionsPending = () => ({
  type: GET_SUBSCRIPTIONS_PENDING
});

export const setSubscriptionsSuccess = (subscriptions) => ({
  type: SET_SUBSCRIPTIONS_SUCCESS,
  payload: subscriptions
});

export const getSubscriptionsError = (error) => ({
  type: GET_SUBSCRIPTIONS_ERROR,
  payload: error
});
