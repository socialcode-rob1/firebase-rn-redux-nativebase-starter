import { connect } from 'react-redux';
import IdeaEdit from './../components/IdeaEdit';
import { updateIdea, deleteIdea } from './../IdeaActions';

const mapStateToProps = (state, props) => {
  const { loading, error } = state.idea;
  const { type, summary, id } = props.item;

  return { loading, ideaError: error, initialValues: { type, summary, id } };
};

export default connect(mapStateToProps, { updateIdea, deleteIdea })(IdeaEdit);
