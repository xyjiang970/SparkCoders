import React, {useState} from 'react'; 
import { useNavigate } from 'react-router-dom';

const CreateBlogPost = ({blogPosts, setBlogPosts}) => {
    const [blogPostName, setBlogPostName] = useState("");
    const [blogPostBody, setBlogPostBody] = useState("");

    // navigates back to homepage automatically after clicking create
    const navigate = useNavigate();

    const createBlogPost = () => {
        const blogPost = {
            id: blogPosts.length + 1,
            name: blogPostName,
            body: blogPostBody
        };

        // spreading out existing blog posts
        // throw in new blog post at the end.
        setBlogPosts([...blogPosts, blogPost])

        // navigates to any url I want
        navigate("/");

    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 16
        }}>
            <input 
            value={blogPostName}
            onChange={(event) => setBlogPostName(event.target.value)}
            placeholder='Name of the Blog Post'
            style={{ marginBottom:8 }}/>
            
            <textarea 
            value={blogPostBody}
            onChange={(event) => setBlogPostBody(event.target.value)}
            rows={20}
            placeholder='Your Actual Blog Post' 
            style={{ marginBottom:8 }}
            />
            <button onClick={createBlogPost}>Create</button>
        </div>
    )
};

export default CreateBlogPost;