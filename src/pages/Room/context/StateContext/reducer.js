
import actions from "./actions"


export const initialState = {
    playedBy: '',
    // videoUrl: 'https://www.youtube.com/watch?v=3hW1rMNC89o&list=RDGMEMCMFH2exzjBeE_zAHHJOdxg&index=9',
    videoUrl: 'https://www.youtube.com/watch?v=EM4Tr4GMEa0',
    playing: false
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.PLAY_VIDEO:
            return {
                ...state,
                playedBy: action.data.from,
                videoUrl: action.data.url
            }
        case actions.PLAYING:
            console.log(action.data)
            return {
                ...state,
                playing: action.data.playing
            }
        default:
          return state;
      }
}