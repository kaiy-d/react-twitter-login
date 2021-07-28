import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faAt, faMapMarkerAlt, faLocationArrow, faLink, faUserFriends } from '@fortawesome/free-solid-svg-icons';


class FollowerCard extends Component {
    render() {
        return (
            <div
                onClick={() => window.location = `https://www.twitter.com/${this.props.item.handler}`}
                classname={'app'}>
                <div className={'card'}>
                    <div className={"ContainerRight"}>
                        <div className={'name-style'}>{this.props.item.name}</div>
                        <div className={'bio'}>{this.props.item.bio}</div>
                        <div className={'user-profile-info '}>
                            <div className={'user-handler'}> <FontAwesomeIcon icon={faAt} /> &nbsp; {this.props.item.handler} </div>
                            {
                                this.props.item.location  
                                ? <div className={'location'}> <FontAwesomeIcon icon={faMapMarkerAlt} /> &nbsp; {this.props.item.location}</div>
                                : <div className={'location'}> <FontAwesomeIcon icon={faMapMarkerAlt} /> &nbsp; {"User doesn't share their location"}</div>
                            }
                            <div className={'link'}> <FontAwesomeIcon icon={faLink} /> &nbsp; <a href={this.props.item.tess} target="_blank">{this.props.item.tess}</a> </div>
                        <div className={'friends-followers'}>  <FontAwesomeIcon icon={faUserFriends} color="black" />  &nbsp; {"Friends: " + this.props.item.friends + "" }{"Followers: " + this.props.item.follow} </div>

                        </div>

                    </div>
                    <div className={'ContainerLeft'} >
                        <img src={this.props.item.photo.replace('_normal', '')} alt={this.props.item.name} />
                    </div>
                </div>
            </div>
        );
    }
}

export default FollowerCard;