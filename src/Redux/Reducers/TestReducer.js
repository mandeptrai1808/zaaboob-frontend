const stateDefault = {
    title: "Aduvip"
}

export const TestReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "CHANGE_TITLE":{
        state.title = action.content;
        return {...state}
    }
  
    default:
        return {...state}
  }
}