const stateDefault = {
    isPage: 0
}

export const MenuReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "CHANGE_PAGE":{
        state.isPage = action.page
        return {...state}
    }
        
  
    default:
        return {...state}
}
}