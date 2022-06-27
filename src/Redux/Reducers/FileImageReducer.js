const stateDefault = {
    listFile: []
}

export const FileImageReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case "ADD_IMAGE":{
            state.listFile.push(action.content);
            return {...state}
        }
        
        case "DELETE_IMAGE":{
            state.listFile.splice(action.id, 1);
            return {...state}
        }

        case "RESET_FILES":{
            state.listFile = [];
            return {...state}
        }
        default:
            return {...state}
    }
}