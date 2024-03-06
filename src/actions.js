export const setNewRadius = (newRadius) => {
    return {
        type: 'SET_RADIUS',
        payload: newRadius,
    };
};
export const setPoints = (points) => {
    return {
        type: 'SET_ALL',
        payload: points
    };
};