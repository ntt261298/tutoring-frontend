import { ErrorCode } from 'constants/common';
import { showModal } from 'actions/modal';
import { logout } from 'actions/user';

export default ({ dispatch }) => next => async (action) => {
  if (action?.payload?.data?.errorCode === ErrorCode.UNAUTHORIZED) {
    dispatch(logout());
    dispatch(showModal(null));
  }

  return next(action);
};
