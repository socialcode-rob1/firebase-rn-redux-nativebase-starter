import {
  IDEA_CREATE_REQUEST,
  IDEA_CREATE_SUCCESS,
  IDEA_CREATE_FAILURE,
  IDEA_UPDATE_REQUEST,
  IDEA_UPDATE_SUCCESS,
  IDEA_UPDATE_FAILURE,
  IDEA_DELETE_REQUEST,
  IDEA_DELETE_SUCCESS,
  IDEA_DELETE_FAILURE,
  IDEA_LIST_GET_REQUEST,
  IDEA_LIST_GET_SUCCESS,
  IDEA_LIST_GET_FAILURE,
} from './IdeaActions';

const INITIAL_STATE = {
  list: [],
  error: '',
  loading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IDEA_CREATE_REQUEST:
      return { ...state, loading: true };
    case IDEA_CREATE_SUCCESS:
      return { ...state, error: '', loading: false };
    case IDEA_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case IDEA_UPDATE_REQUEST:
      return { ...state, loading: true };
    case IDEA_UPDATE_SUCCESS:
      return { ...state, error: '', loading: false };
    case IDEA_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case IDEA_DELETE_REQUEST:
      return { ...state, loading: true };
    case IDEA_DELETE_SUCCESS:
      return { ...state, error: '', loading: false };
    case IDEA_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case IDEA_LIST_GET_REQUEST:
      return { ...state, loading: true };
    case IDEA_LIST_GET_SUCCESS:
      return { ...state, ...INITIAL_STATE, list: action.payload };
    case IDEA_LIST_GET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
