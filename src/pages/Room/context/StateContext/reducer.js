
import actions from "./actions"


export const initialState = {
    playedBy: '',
    video: {
        title: 'Tonikaku Kawaii Opening Song Full『Koi no Uta』by Yunomi',
        // videoUrl: 'https://www.youtube.com/watch?v=3hW1rMNC89o&list=RDGMEMCMFH2exzjBeE_zAHHJOdxg&index=9',
        videoUrl: 'https://www.youtube.com/watch?v=A6l8THwbcfY',
        channelIcon: 'https://yt3.ggpht.com/ytc/AKedOLRKGf5gbPLWjdZL4Khgi4Yu6n7AFkNrkfueGx4f5g=s48-c-k-c0x00ffffff-no-rj',
        channelName: 'GAccel Kun',
        views: '15M',
        uploaded: '1 year ago',
        videoType: 'youtube',

    },
    videoControls: {
        playing: false,
        from: '',
        syncTime: 0
    },
}

export const reducer = (state, action) => {
    switch (action.type) {
        case actions.PLAY_VIDEO:
            return {
                ...state,
                playedBy: action.data.from,
                video: {
                    // ...state.video,
                    title: action.data.title,
                    videoUrl: action.data.url,
                    channelIcon: action.data.channelIcon,
                    channelName: action.data.channelName,
                    uploaded: action.data.uploaded,
                    views: action.data.views,
                    videoType: action.data.videoType
                }  
            }
        case actions.PLAYING:
            console.log(action.data)
            return {
                ...state,
                videoControls: {
                    ...state.videoControls,
                    playing: action.data.playing,
                    syncTime: action.data.syncTime
                }
            }
        default:
          return state;
      }
}