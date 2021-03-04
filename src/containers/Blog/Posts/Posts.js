import React, { Component } from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost.js';

class Posts extends Component {

    state = {
        posts: [],
    }

    // passed the post id and sets the selectedPostId state to that ID
    // postSelectedHandler = (id) => {
    //     this.setState({selectedPostId: id});
    // }

    // this is another way to navigate to a post page with passed id programatically
    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id});
        //this is same as above
        //this.props.history.push('/posts/' + id);
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                // transforms response data with author max and shortens it to 4 posts to be shown
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'max'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });
    }

    render() {

        let posts = <p style={{ textAlign: 'center' }}>Something went wrong...</p>
        if(!this.state.error){
            // state.posts that is set with axios response.data is mapped/looped into this posts variable
            // and outputs the individual post components through the post vairable passed to map()
            posts =  this.state.posts.map(post => {
                return (
                    // creates clickable link that passes the id for the absolute path to the post
                    //<Link key={post.id}  to={'/posts/' + post.id}>
                        <Post 
                            key={post.id}
                            title={post.title} 
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} />
                   // </Link>);
                );
            });
        }

        return (
            <div>
	            <section className="Posts">
                    {posts}
                </section>
                {/* nested route with react router */}
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
            
        );
    }
}

export default Posts;