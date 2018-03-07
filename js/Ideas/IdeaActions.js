import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import { Actions } from 'react-native-router-flux';

/**
|--------------------------------------------------
| Types
|--------------------------------------------------
*/
export const IDEA_LIST_GET_REQUEST = 'IDEA_LIST_GET_REQUEST';
export const IDEA_LIST_GET_SUCCESS = 'IDEA_LIST_GET_SUCCESS';
export const IDEA_LIST_GET_FAILURE = 'IDEA_LIST_GET_FAILURE';

export const IDEA_CREATE_REQUEST = 'IDEA_CREATE_REQUEST';
export const IDEA_CREATE_SUCCESS = 'IDEA_CREATE_SUCCESS';
export const IDEA_CREATE_FAILURE = 'IDEA_CREATE_FAILURE';

export const IDEA_DELETE_REQUEST = 'IDEA_DELETE_REQUEST';
export const IDEA_DELETE_SUCCESS = 'IDEA_DELETE_SUCCESS';
export const IDEA_DELETE_FAILURE = 'IDEA_DELETE_FAILURE';

export const IDEA_UPDATE_REQUEST = 'IDEA_UPDATE_REQUEST';
export const IDEA_UPDATE_SUCCESS = 'IDEA_UPDATE_SUCCESS';
export const IDEA_UPDATE_FAILURE = 'IDEA_UPDATE_FAILURE';

export const IDEA_DEFINE_REQUEST = 'IDEA_DEFINE_REQUEST';
export const IDEA_DEFINE_SUCCESS = 'IDEA_DEFINE_SUCCESS';
export const IDEA_DEFINE_FAILURE = 'IDEA_DEFINE_FAILURE';

/**
|--------------------------------------------------
| Actions
|--------------------------------------------------
*/
export const createIdea = ({ type, summary }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: IDEA_CREATE_REQUEST });

    firebase.firestore().collection('users').doc(currentUser.uid).collection('ideas')
      .add({ type, summary })
      .then(() => {
        dispatch({ type: IDEA_CREATE_SUCCESS });

        Actions.idea({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: IDEA_CREATE_FAILURE, payload: 'Idea creation failed' });
      });
  };
};

export const updateIdea = ({ type, summary, id }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: IDEA_UPDATE_REQUEST });

    firebase.firestore().collection('users').doc(currentUser.uid).collection('ideas')
      .doc(id)
      .update({ type, summary })
      .then(() => {
        dispatch({ type: IDEA_UPDATE_SUCCESS });

        Actions.idea({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: IDEA_UPDATE_FAILURE, payload: 'Idea edition failed' });
      });
  };
};

export const deleteIdea = ({ id }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: IDEA_DELETE_REQUEST });

    firebase.firestore().collection('users').doc(currentUser.uid).collection('ideas')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: IDEA_DELETE_SUCCESS });

        Actions.idea({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: IDEA_DELETE_FAILURE, payload: 'Idea deletion failed' });
      });
  };
};

export const getIdeaList = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: IDEA_LIST_GET_REQUEST });

    firebase.firestore().collection('users').doc(currentUser.uid).collection('ideas')
      .get()
      .then((querySnapshot) => {
        // const list = _.map(querySnapshot.docs, (data(), id) => ({ ...data(), id }));
        const list = [];
        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          const { id } = doc.id;
          list.push({ id, ...data });
        });

        dispatch({ type: IDEA_LIST_GET_SUCCESS, payload: list });
      })
      .catch(() => {
        dispatch({ type: IDEA_LIST_GET_FAILURE, payload: 'Idea get list failed' });
      });
  };
};
