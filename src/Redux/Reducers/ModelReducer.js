const stateDefault = {
    isOpen: false,
    content: '',
    title: ''
}

export const ModelReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "OPEN_MODEL":{
        state.isOpen = true;
        state.content = action.content;
        state.title = action.title
        return {...state};
    }

    case "CLOSE_MODEL": {
        // console.log("close")
        state.isOpen= false;
        return {...state}
    }
        
  
    default:
        return {...state}
  }
}