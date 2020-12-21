import Link from 'next/link'
import React from 'react';

const Home = ({blogs}: any) => {
  return (
    <div>
      <h2>最新の記事</h2>
      <div>
        {blogs.map((blog: any) => (
          <React.Fragment key={blog.id}>
            <Link href="/blogs/[id]" as={`blogs/${blog.id}`}>
              <a>
                <h2>{blog.title}</h2>
              </a>
            </Link>
            {blog.tags.map((tag: any) => (
              <React.Fragment key={tag.id}>
                <span>{tag.name}</span>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY || ''},
  };

  const res = await fetch(
    `https://mizmiz-hls-blog.microcms.io/api/v1/blogs/`,
    key,
  );
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    }
  }
};

export default Home
