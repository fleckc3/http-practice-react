import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }
    componentDidMount() {
        axios.get('http://jsonplaceholder.typicode.com/posts')
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
            });
    }

    // passed the post id and sets the selectedPostId state to that ID
    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }
    render () {
        // state.posts that is set with axios response.data is mapped/looped into this posts variable
        // and outputs the individual post components through the post vairable passed to map()
        const posts =  this.state.posts.map(post => {
            return <Post 
                key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)} />;
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;