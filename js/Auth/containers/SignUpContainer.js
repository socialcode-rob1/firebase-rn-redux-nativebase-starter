import { connect } from 'react-redux';
import SignUp from './../components/SignUp';
import { signUpUser, clearState } from './../AuthActions';

const mapStateToProps = ({ auth }) => {
  const { error, loading, user } = auth;

  return { authError: error, loading, user };
};

export default connect(mapStateToProps, { signUpUser, clearState })(SignUp);
