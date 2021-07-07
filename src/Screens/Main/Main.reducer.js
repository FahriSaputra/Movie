const initialState = {
  movie: [],
  loading: false,
  message: '',
  isChange: false,
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESSFUL': {
      return {
        ...state,
        movie: action.payload,
      };
    }
    case 'FETCH_START':
      return {
        ...state,
        message: '',
        loading: true,
      };
    case 'FETCH_END':
      return {
        ...state,
        message: '',
        loading: false,
      };
    case 'FETCH_FAILED':
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    case 'IS_CHANGE':
      return {
        ...state,
        isChange: true,
      };
    case 'DONE_CHANGE':
      return {
        ...state,
        isChange: false,
      };
    default:
      return {...state};
  }
};
