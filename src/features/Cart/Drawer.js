


export const drawerReducer = (state ={drawer: false}, action ) => {
    switch(action.type){
        case 'DRAWER':
            return {
                ...state,
                drawer: !state.drawer
            }
        default:
            return state;
    }
}