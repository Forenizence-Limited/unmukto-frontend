"use client";
import { Card } from '@/components/Card';
import { Loader } from '@/components/Loader';
import { useGetPostsByCategoryQuery } from '@/libs/redux-store/apiSlice/postApi';
import { Post } from '@/utils/types/types';

export default function CategoryPost({ params }: { params: { categoryId: string; }; }) {
  const { categoryId } = params;
  const { isLoading, isError, data: posts, error } = useGetPostsByCategoryQuery(categoryId);

  console.log(posts, "posts is here");

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div>error</div>
    );
  }

  return (
    <>
      {posts.length === 0 && <div>no post here</div>}
      <div className='flex flex-wrap gap-5 justify-center pt-5'>
        {posts.map((post: Post) => (
          <div key={post.postId}>
            <Card post={post} />
          </div>
        ))}
      </div>
    </>
  );
}
