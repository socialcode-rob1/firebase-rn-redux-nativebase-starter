import { connect } from 'react-redux';

import IdeaCreate from './../components/IdeaCreate';
import { createIdea } from './../IdeaActions';

const mapStateToProps = ({ idea }) => {
  const { loading, error } = idea;

  return { loading, ideaError: error };
};

export default connect(mapStateToProps, { createIdea })(IdeaCreate);
