import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { ClaimsType } from 'types/claims-type';
import { saveClaimsAction } from 'app/features/auth/authSlice';
import { ROUTES } from 'app/constants';

const ProtectedRoute = props => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  /* this is cleaning up the localStorage and redirecting user to login */
  if (!token) {
    localStorage.removeItem('token');
    return <Redirect to={{ pathname: ROUTES.LOGIN }} />;
  }

  const decoded: ClaimsType = jwt_decode(token);
  const expiresAt = decoded.exp * 1000;
  const dateNow = Date.now();
  const isValid = dateNow <= expiresAt;

  dispatch(saveClaimsAction(decoded));

  return isValid ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: ROUTES.LOGIN }} />
  );
};
export default ProtectedRoute;
