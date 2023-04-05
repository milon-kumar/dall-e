import React, { useState, useEffect } from 'react';

import { Card, Loader, FormFiled } from "../components"

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => (<Card key={post._id} {...post} />));
  }

  return [
    <h2 className='mt-5 font-bold text-[#6449ff]'>
      {title}
    </h2>
  ]
}


const Home = () => {

  const [loading, setLoading] = useState(false)
  const [allPost, setAllPost] = useState(null)
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/v1/post', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const result = await response.json();
          setAllPost(result.data.reverse());

          console.log(allPost);
        }

      } catch (error) {
        alert(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();

  }, []);

  const handelSearchChange = (e) => {
    clearTimeout(searchTimeout);
    
    setSearchText(e.target.value);
    
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPost.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResult(searchResult);
      }, 500)
    );
  }

  return (
    <section
      className='max-w-7xl mx-auto'
    >
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>The Comuunity Showcase</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Browse through a collection of imaginative and visually stunning images grenerated by DALL-E AI
        </p>
      </div>
      <div className='mt-16'>
        <FormFiled
          labelName="Search Posts"
          type="text"
          name="text"
          placeholder="Search Post"
          value={searchText}
          handelChange={handelSearchChange}
        />
      </div>

      <div className='mt-10'>
        {
          loading ? (
            <div className='flex justify-center'>
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                  Showing result for <span className='text-[#222328]'>{searchText}</span>
                </h2>
              )}
              <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gird-cols-1 gap-3'>
                {
                  searchText ? (
                    <RenderCards
                      data={searchResult}
                      title={'No search result found'}
                    />
                  ) : (
                    <RenderCards
                      data={allPost}
                      title="No post found"
                    />
                  )
                }
              </div>
            </>
          )}
      </div>

    </section>
  )
}

export default Home
