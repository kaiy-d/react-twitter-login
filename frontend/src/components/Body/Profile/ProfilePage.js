import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { ListGroup } from 'react-bootstrap';
import FollowerCard from './FollowerCard';
import { ENTER_KEY } from '../../../constants/keyCodes';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            searchKey: '',
            searchKeys: []
        };
    }

    componentDidMount() {
        this.fetchFollowers();
        this.fetchFriends();
    }

    fetchFollowers = () => {
        const user = sessionStorage.getItem('user');
        this.props.getFollowers(user);
    }
    fetchFriends = () => {
        const user = sessionStorage.getItem('user');
        this.props.getFriends(user);
    }
    searchHandleChange = ({ target }) => {
        this.setState({ searchKey: target.value })
    }
    searchHandleKeyUp = ({ keyCode }) => {
        if (keyCode === ENTER_KEY) {
            this.addSearchKey();
        }
    }

    addSearchKey() {
        const { searchKey } = this.state;

        if (!searchKey) {
            return;
        }

        this.setState(
            prevState => {
                return {
                    ...prevState,
                    searchKeys: prevState.searchKeys.concat(searchKey),
                    searchKey: ""
                }
            });
    }

    searchKeyHandleClick = (searchKey) => {
        this.setState(
            prevState => {
                return {
                    ...prevState,
                    searchKeys: prevState.searchKeys.filter(item=>item !==searchKey),
                    searchKey: ""
                }
            });
    }

    //TODO:Refactor.
    getFilteredFollowers = () => {
        const { searchKeys } = this.state;
        let followers =this.props.followers;
        for (let key of searchKeys) {
            followers=followers.filter((item) => {
                if (
                    (item.name && item.name.toLowerCase().includes(key.toLowerCase()))
                    ||
                    (item.bio && item.bio.toLowerCase().includes(key.toLowerCase()))
                    ||
                    (item.location && item.location.toLowerCase().includes(key.toLowerCase()))
                ) return true;
                else return false;
            })
        }
        return followers;
    }

    render() {
        let textToDispay;
        let followers = this.props.followers;

        const { searchKeys } = this.state;

        const filteredFollowers = this.getFilteredFollowers();

    
        if (!followers.length) {
            textToDispay = (
                <div className="load">
                    <div class="loader">Loading...</div>
                </div>
            );
        } else {
            textToDispay = (
                <div>
                    <center>

                    <div className="tags">
                        <ul>
                            {searchKeys.map((item, i) => (
                                <li key={item + i} className="tag" onClick={() => this.searchKeyHandleClick(item)}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="Search"> 
                        <input
                            type={"search"}
                            placeholder="Search"
                            class="searchterm"
                            value={this.state.searchKey}
                            onChange={this.searchHandleChange}
                            onKeyUp={this.searchHandleKeyUp}
                        />
                        </div>
                    </div>
                    </center>

                    <ListGroup className={'test'} >
                        {
                            filteredFollowers
                                .map((item, index) => {
                                    return <FollowerCard key={index} item={item}></FollowerCard>
                                })
                        }
                    </ListGroup>

                </div>
            );
        }
        return !this.props.isAuthenticated ?
            <Redirect to={{ pathname: '/login' }} /> : (
                <div>
                    {textToDispay}
                </div>
            );
    }
};

const mapStateToProps = (state) => {
    return {
        token: state.login.token,
        user: state.login.user,
        isAuthenticated: state.login.isAuthenticated,
        followers: state.profile.followers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFollowers: (data) => dispatch({ type: 'GET_USER_FOLLOWERS', data }),
        getFriends: (data) => dispatch({type: 'GET_USER_FRIENDS', data})
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);