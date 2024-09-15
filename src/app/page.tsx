"use client";
import { Card } from '@/components/Card';
import { Loader } from '@/components/Loader';
import { useGetCategoriesQuery } from '@/libs/redux-store/apiSlice/categoryApi';
import { useGetPostsQuery } from '@/libs/redux-store/apiSlice/postApi';
import { Category, Post } from '@/utils/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isLoading, isError, data: categories, error } = useGetCategoriesQuery();
  const { isLoading: isLoadingPosts, isError: isErrorPosts, data: postsContent, error: errorPosts } = useGetPostsQuery();
  const router = useRouter();


  if (isLoading || isLoadingPosts) {
    return <Loader />;
  }

  if (isError || isErrorPosts) {
    console.log(error);
    console.log(errorPosts);
    if (error != null && 'status' in error && error.status === 401) {
      router.push('/login');
    }
    if (errorPosts != null && 'status' in errorPosts && errorPosts.status === 401) {
      router.push('/login');
    }
    return (
      <div>error</div>
    );
  }

  return (
    <>
      <div className='flex flex-wrap gap-5 justify-center pt-5'>
        {postsContent.content.map((post: Post) => (
          <div key={post.postId}>
            <Card post={post} />
          </div>
        ))}
      </div>
    </>
  );
}
