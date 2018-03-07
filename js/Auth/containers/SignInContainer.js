import { connect } from 'react-redux';

import SignIn from './../components/SignIn';
import { signInUser, clearState } from './../AuthActions';

const mapStateToProps = ({ auth }) => {
  const { error, loading, user } = auth;

  return { authError: error, loading, user };
};

export default connect(mapStateToProps, { signInUser, clearState })(SignIn);
