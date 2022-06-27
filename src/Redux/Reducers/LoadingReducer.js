const stateDefault = {
    isLoading: false,
    isLoadingSearch: false,
}

export const LoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "IS_LOADING":{
        state.isLoading = true;
        return {...state}
    }
        
    case "IS_LOADED":{
        state.isLoading = false;
        return {...state}
    }

    case "IS_LOADING_SEARCH":{
        state.isLoadingSearch = true;
        return {...state}
    }

    case "IS_LOADED_SEARCH":{
        state.isLoadingSearch = false
        return {...state}
    }
    default:
        return {...state}
  }
}