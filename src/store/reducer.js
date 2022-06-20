const INITIAL_STATE = {
  loading: false,
  user: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        loading: true
      }
    case "START_REDUX":
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          fullName: action.fullName
        }
      }
    default:
      return state
  }
}
