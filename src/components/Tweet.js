import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate, formatTweet } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { handleToggleTweet } from '../actions/tweets'
import { Link } from 'react-router-dom'

class Tweet extends Component {

    handleLike = (e) => {
        e.preventDefault()

        const { dispatch, tweet, authedUser } = this.props

        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }))

    }

    render() {
        const { tweet } = this.props

        if (tweet === null) {
            return <p>This Tweet does not exist!</p>
        }

        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
        } = tweet

        return (
            <Link to={`/tweet/${id}`} className='tweet'>
                <img
                    src={avatar}
                    className='avatar'
                    alt={`Avatar of {name}`}
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <Link to={`/tweet/${parent.id}`}>
                                <button className='replying-to'>
                                    Replying to @{parent.author}
                                </button>
                            </Link>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon' />
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                            {hasLiked === true
                                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                                : <TiHeartOutline className='tweet-icon' />}
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser,
        tweet: tweet
            ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
            : null
    }
}

export default connect(mapStateToProps)(Tweet)