import actions from "./actions"

export const initialState = {
    peer: null,
    conn: null,
    msg: {},
    receive: {
        from: '',
        msg: ''
    }
}


export const reducer = (state, action) => {
    switch (action.type) {
        case actions.SET_PEER:
            return {
                ...state,
                peer: action.peer
            }
        case actions.SET_CONNECTION: 
            return {
                ...state,
                conn: action.conn
            }
        case actions.STORE_CONNECTION: 
            return {
                ...state,
                conn: action.connection
            }
        case actions.SEND_MSG:
            return {
                ...state,
                msg: action.msg
            };
        case actions.RECEIVE_MSG:
            return {
                ...state,
                receive: action.msg
            }
        default:
          return state;
      }
}