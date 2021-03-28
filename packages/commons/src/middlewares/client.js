import CaseConverter from 'utils/caseConverter';

export default ({ dispatch, getState }) => next => async (action) => {
  // Thunk
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  // Promise
  if (!action.promise) {
    return next(action);
  }

  const { promise: promisePayload, type, ...rest } = action;


  // Dispatch original action
  next({ type, ...rest });

  const promise = (typeof promisePayload === 'function') ? promisePayload(dispatch, getState) : promisePayload;

  try {
    const result = await promise;
    // Dispatch _SUCCESS action
    next({
      type: `${type}_SUCCESS`,
      payload: result,
      options: CaseConverter.snakeCaseToCamelCase(rest.payload),
    });

    return {
      success: true,
      result,
    };
  } catch (error) {
    console.log('Request failed: ', error);

    // Dispatch _FAILURE action
    next({
      type: `${type}_FAILURE`,
      payload: error,
      options: CaseConverter.snakeCaseToCamelCase(rest.payload),
    });

    return {
      success: false,
      error,
    };
  }
};
