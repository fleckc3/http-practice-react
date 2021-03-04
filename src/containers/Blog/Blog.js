import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
// import FullPost from './FullPost/FullPost'

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* - use Link or NavLink to create links within react project
                                - to prop sets the path destintation
                                - react uses Link to create <a></a> but doesnt reload page wen clicked
                                - NavLink gives you some more styling options and lets you designate when its active  */}
                            <li><NavLink
                                    to="/posts/" 
                                    exact 
                                    activeClassName="my-active"
                                    activeStyle={{ 
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }}>Posts</NavLink></li>

                            {/* to prop can also pass javascript obect
                            - pathname -> can be the route path -> generates an absolute path which appends to the route domain -- for relative path ==> this.props.match.url + '/new-post'
                            - hash -> jump to specific part of page
                            - search - add query params */}
                            <li><NavLink to={{ 
                                    pathname: '/new-post', 
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* conditionally renders something based on path route
                    - exact is a boolean to prop to match the exact path specified otherwise react will look foe does the path start with whats in the path prop
                    - render prop then gives the jsx to render */}
                {/* <Route path="/" exact render={() => <h1>Home</h1>}/> */}

                {/* <Switch></Switch> checks for first path that matches given route and then stops analysing the path routes
                - loads only one of them that matches first
                - the order in important */}
                <Switch>
                    {/* component prop passes a component */}
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/posts" component={Posts} />
                    {/* redirect to another url */}
                    <Redirect from="/" to="/posts" />
                    {/* :id points to dynamic id of post
                    <Route path="/:id" exact component={FullPost} /> */}
                </Switch>
                
            </div>
        );
    }
}

export default Blog;