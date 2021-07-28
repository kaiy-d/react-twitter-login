import axios from 'axios';

export const getUserFollowers = (data) => {
    const user = JSON.parse(data);
    return axios({
        method: 'get',
        params: {
            id: user.twitterProvider.id,
            token: user.twitterProvider.token,
            tokenSecret: user.twitterProvider.tokenSecret
        },
        responseType: 'json',
        url: '/api/followers',
        config: {
            headers: {
                'Accept': 'application/json'
            }
        }
    }).then(json => json.data);

};
export const getUserFriends = (data) => {
    const user = JSON.parse(data);
    return axios({
        method: 'get',
        params: {
            id: user.twitterProvider.id,
            token: user.twitterProvider.token,
            tokenSecret: user.twitterProvider.tokenSecret
        },
        responseType: 'json',
        url: '/api/friends',
        config: {
            headers: {
                'Accept': 'application/json'
            }
        }
    }).then(json => json.data);

};