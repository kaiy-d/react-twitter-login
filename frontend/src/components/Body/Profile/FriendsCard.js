import React, {Component} from 'react';


class FriendsCard extends Component {
    render() {
        return (
        <div 
            onClick={ () => window.location = `https://www.twitter.com/${ this.props.item.handler }` }>
                <div className={'card'}>
                <div className={"ContainerRight"}>
                    <div className={'name-style'}>{this.props.item.name}</div>
                    <div className={'handler-sytle'}>{this.props.item.handler}</div>
                    <div className={'bio'}>{this.props.item.bio}</div>
                    <div className={'location'}>{this.props.item.location}</div>
                    <div className={'Link'}>{this.props.item.tess}</div>
                    <div className={'url'}>{this.props.item.url}</div>
                </div>
                <div className={'ContainerLeft'} >
                    <img src={this.props.item.photo} alt={this.props.item.name} />
                </div>
            </div>
        </div>
        );
    }
}

export default FriendsCard;