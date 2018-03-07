import { connect } from 'react-redux';
import IdeaList from './../components/IdeaList';
import { getIdeaList } from './../IdeaActions';

const mapStateToProps = ({ idea }) => {
  const { loading, error, list } = idea;

  return { loading, ideaError: error, list };
};

export default connect(mapStateToProps, { getIdeaList })(IdeaList);
