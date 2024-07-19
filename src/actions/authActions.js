export const SET_LOADING = 'SET_LOADING';
export const SET_NAVIGATION = 'SET_NAVIGATION';

export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading,
});

export const setNavigation = (path) => ({
    type: SET_NAVIGATION,
    payload: path,
});
