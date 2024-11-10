// src/app/posts/[postId]/page.tsx
'use client';
import { Card } from '@/components/Card';
import { Loader } from '@/components/Loader';
import ViewArticle from '@/components/ViewArticle';
import { useGetPostQuery } from '@/libs/redux-store/apiSlice/postApi';
import { useRouter } from 'next/navigation';

export default function PostPage({ params }: { params: { postId: string; }; }) {
  const { postId } = params;
  const router = useRouter();

  const { data: post, isError, error, isLoading } = useGetPostQuery(postId);

  if (isLoading) return <Loader />;
  if (isError) {
    if (error != null && 'status' in error && error.status === 401) {
      router.push('/login');
    }
  }
  if (!post) return <p>No post found.</p>;

  return (
    <div className="container mx-auto pt-5 flex flex-col items-center">
      <ViewArticle post={post} />

      <div>
        <h1 className='card-title mt-10'>More related articles</h1>

        <div className='flex flex-wrap gap-5 justify-center pt-5'>
          <Card post={post} />
          <Card post={post} />
          <Card post={post} />
        </div>
      </div>
    </div>
  );
}
