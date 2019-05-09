import React, { Component } from 'react';

import './style.css';
import PostsList from './Post/PostsList';
import Avatar from '../Header/ProfileSettings/avatar.jpg';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, addPost } from '../../actions/postActions';

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      welcomeId: 0,
      errors: {},
      welcomeVarious: [
          {
              id: 0,
              lang: 'Swedish',
              content: 'Välkommen'
          },
          {
              id: 1,
              lang: 'Danish',
              content: 'Velkommen'
          },
          {
              id: 2,
              lang: 'English',
              content: 'Welcome' 
          },
          {
              id: 3,
              lang: 'Estonian',
              content: 'Teretulemast'
          },
          {
              id: 4,
              lang: 'Finnish',
              content: 'Tervetuloa'
          },
          {
              id: 5,
              lang: 'French',
              content: 'Soyez la bienvenue'
          },
          {
              id: 6,
              lang: 'German',
              content: 'Herzlich Willkommen'
          },
          {
              id: 7,
              lang: 'Hawaiian',
              content: 'Aloha E Komo Mai'
          },
          {
              id: 8,
              lang: 'Norwegian',
              content: 'Velkommen'
          },
          {
              id: 9,
              lang: 'Persian',
              content: 'Khosh amadid'
          },
          {
              id: 10,
              lang: 'Spanish',
              content: 'Bienvenida'
          },
          {
              id: 11,
              lang: 'Slovenian',
              content: 'Dobrodosli'
          },
          {
              id: 12,
              lang: 'Russian',
              content: 'Dobro pozhalovat'
          },
          {
              id: 13,
              lang: 'Portuguese',
              content: 'Bemvindos'
          }
          ,
          {
              id: 14,
              lang: 'Polish',
              content: 'Serdecznie witamy'
          },
          {
              id: 15,
              lang: 'Tibetan',
              content: 'Tashi Delek'
          },
          {
              id: 16,
              lang: 'Ukranian',
              content: 'Laskavo prosimo'
          },
          {
              id: 17,
              lang: 'Vietnamese',
              content: 'Kinh Chao Quy Khach'
          },
          {
              id: 18,
              lang: 'Chinese',
              content: 'Huanying guanglin'
          },
          {
              id: 19,
              lang: 'Maltese',
              content: 'Merhba'
          },
          {
              id: 20,
              lang: 'Japanese',
              content: 'Irasshaimase'
          },
          {
              id: 21,
              lang: 'Welsh',
              content: 'Croeso cynne'
          },
          {
              id: 22,
              lang: 'Indonesian',
              content: 'Selamat datang'
          },
          {
              id: 23,
              lang: 'Latin',
              content: 'Gratissimum'
          },
          {
              id: 24,
              lang: 'Island',
              content: 'Velkominn'
          },
          {
              id: 25,
              lang: 'Romanian',
              content: 'Bine ati venit'
          },
          {
              id: 26,
              lang: 'Hungarian',
              content: 'Üdvözöljük'
          },
          {
              id: 27,
              lang: 'Czech',
              content: 'Vítejte'
          }
      ]
    }
  }

  onChange = (event) => {
    this.setState({text: event.target.value})
  }

  componentDidMount() {
    this.timeout = setInterval(() => {
    let currentWelcomeId = Math.floor(Math.random() * 28)
    this.setState({ welcomeId: currentWelcomeId + 1 });
    }, 5000);
    this.props.getPosts();
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onKeyDown = (event) => {
    if(event.keyCode === 13) {
      event.preventDefault();
      this.onSubmit(event);
    }
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    let userData = {
      text: this.state.text,
      author: this.props.auth.user.name
    }
    this.props.addPost(userData);
    this.setState({ text: '' });
  }

  render() {
    const { posts } = this.props.post;
    const { errors } = this.state

    let postContent;
    postContent = <PostsList posts={posts} />;

    let welcomeChanges = this.state.welcomeVarious[this.state.welcomeId % this.state.welcomeVarious.length]

    return (
      <div>
        <div className="banner">
          <h2>{welcomeChanges.content} {this.state.username}</h2>
          <h3>{welcomeChanges.lang}</h3>
        </div>
        <div className="user-post">
          <span className="error-span">{errors.text}</span>
            <form onSubmit={this.onSubmit}>
              <div className="textarea-wrapper">
                <img src={Avatar} alt="user avatar"/>
                <textarea onChange={this.onChange} onKeyDown={this.onKeyDown} value={this.state.text} type="text" name="Post" placeholder="What’s up, Patryk?" autoComplete="off"/>
              </div>
              <div className="button-wrapper">
                <input onSubmit={this.onSubmit} className="btn-inp" type="submit" value="Publish" />
              </div>
            </form>
        </div>
        <div className="feed">
          <div className="friends-posts">
            {postContent}
          </div>
        </div>
      </div>
    )
  }
}

Feed.propTypes = {
  addPost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object
};

const mapStatetoProps = state => ({
  auth: state.auth,
  post: state.post,
  errors: state.error
});

export default connect(
  mapStatetoProps,
  { getPosts, addPost })(Feed)