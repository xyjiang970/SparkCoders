import React from "react";

// holding two values within the same variable
// blogPosts: []
// setBlogPosts: a function
const BlogPostContext = React.createContext({
    blogPosts: [],
    setBlogPosts: () => {}
});


export default BlogPostContext;