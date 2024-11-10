"use client";
import { useRouter } from 'next/navigation';

import { useGetPostsQuery } from '@/libs/redux-store/apiSlice/postApi';

import { Post } from '@/utils/types/types';

import { Card } from '@/components/Card';
import { Loader } from '@/components/Loader';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Home() {
  const [curPageNumber, setCurPageNumber] = useState(0);
  const { isLoading: isLoadingPosts, isError: isErrorPosts, data: postsContent, error: errorPosts } = useGetPostsQuery(curPageNumber);
  const router = useRouter();

  if (isLoadingPosts) {

    return <Loader />;
  }

  if (isErrorPosts) {
    if (errorPosts != null && 'status' in errorPosts && errorPosts.status === 401) {
      router.push('/login');
    }

    return (
      <div>unknown error</div>
    );
  }

  const { pageNumber, pageSize, totalElements, totalPages, lastPage } = postsContent;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      {postsContent.content.length === 0 &&
        <div className='flex flex-wrap gap-5 justify-center pt-10'>
          <h2 className='card-title'>Sorry nothing found :(</h2>
        </div>
      }

      {postsContent.content.length > 0 &&
        <>
          <div className='flex flex-wrap gap-5 justify-center pt-5'>
            {postsContent.content.map((post: Post) => (
              <div key={post.postId}>
                <Card post={post} />
              </div>
            ))}
          </div>

          {/* pagination */}
          <div className='flex justify-center pt-6'>
            <div className="join grid-cols-1">
              <button className="join-item btn btn-sm btn-outline" onClick={() => setCurPageNumber((curPageNumber) => curPageNumber - 1)} disabled={pageNumber === 0}>
                <ArrowLeft /> Previous
              </button>
              {pages.map((page) => (
                <button key={page} onClick={() => setCurPageNumber(page - 1)} className={`join-item btn btn-sm btn-outline ${page === pageNumber + 1 ? 'btn-active' : ''}`}>{page}</button>
              ))}
              <button className={`join-item btn btn-sm btn-outline`} onClick={() => setCurPageNumber((curPageNumber) => curPageNumber + 1)} disabled={lastPage}>
                Next <ArrowRight />
              </button>
            </div>
          </div>
        </>
      }
    </>
  );
}