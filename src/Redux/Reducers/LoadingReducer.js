const stateDefault = {
    isLoading: false,
    isLoadingSearch: false,
    postLoading: false,
    commentLoading: false,
    requestLoading: false,
    avatarUploading: false,
    loginLoading: false
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

    case "IS_LOADING_POST":{
        state.postLoading = true;
        return {...state}
    }

    case "IS_LOADED_POST":{
        state.postLoading = false;
        return {...state}
    }

    case "IS_LOADING_COMMENT":{
        state.commentLoading = true;
        return {...state}
    }
    case "IS_LOADED_COMMENT":{
        state.commentLoading = false
        return {...state}
    }
    case "IS_LOADING_REQUEST":{
        state.requestLoading = true;
        return {...state}
    }
    case "IS_LOADED_REQUEST":{
        state.requestLoading = false
        return {...state}
    }
    case "IS_LOADING_AVATAR":{
        state.avatarUploading = true;
        return {...state}
    }
    case "IS_LOADED_AVATAR":{
        state.avatarUploading = false
        return {...state}
    }
    case "IS_LOADING_LOGIN":{
        state.loginLoading = true;
        return {...state}
    }
    case "IS_LOADED_LOGIN":{
        state.loginLoading = false
        return {...state}
    }

    default:
        return {...state}
  }
}