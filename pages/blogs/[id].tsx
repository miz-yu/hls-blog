import React from "react";

const BlogId = ({blog}: any) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        {blog.tags.map((tag: any) => (
          <React.Fragment key={tag.id}>
            <span>{tag.name}</span>
          </React.Fragment>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{__html: `${blog.body}`}}></div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY || ''},
  };

  const res = await fetch('https://mizmiz-hls-blog.microcms.io/api/v1/blogs', key);
  const repos = await res.json();

  const paths = repos.contents.map((repo: any) => `/blogs/${repo.id}`); 
    return {paths, fallback: false};
  };

export const getStaticProps = async (context: { params: { id: any; }; }) => {
  const id = context.params.id;

  const key = {
    headers: {'X-API-KEY': process.env.API_KEY || ''},
  };

  const res = await fetch(
    `https://mizmiz-hls-blog.microcms.io/api/v1/blogs/${id}`,
    key,
  );
  const blog = await res.json();

  return {
    props : {
      blog: blog,
    }
  };
};

export default BlogId;