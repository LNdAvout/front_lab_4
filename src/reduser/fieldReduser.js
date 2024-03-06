const initialState = {
    radius: 3,
    points: []
};

const fieldReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RADIUS':
            if (action.payload !== state.radius) {
                return {
                    ...state,
                    radius: action.payload
                };
            } else {
                return state;
            }
        case 'SET_ALL':
            return {
                ...state,
                points: action.payload
            };
        default:
            return state;
    }
};

export default fieldReducer;