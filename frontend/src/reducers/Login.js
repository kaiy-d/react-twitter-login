const token = sessionStorage.getItem('token');
const isAuthenticated = token;
const user = sessionStorage.getItem('user');
const initialState = {
    token: token,
    user: user,
    isAuthenticated: isAuthenticated ? true : false,
    error: null
};


const registration = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            sessionStorage.setItem('token',null);
            sessionStorage.setItem('email',null);
            return Object.assign({}, state, {token: null, isAuthenticated: false, user: null, error: null});
        case 'LOGIN_ERROR':
            return Object.assign({}, state, {token: null, isAuthenticated: false, user: null, error: action.payload});
        case 'LOGIN_SUCCESS':
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('email', action.payload.user.email);
            sessionStorage.setItem('user', JSON.stringify(action.payload.user));
            return Object.assign({}, state, {token: action.payload.token, isAuthenticated: true, user: action.payload.user, error: null });
        default:
            return state;
    }
};

export default registration;