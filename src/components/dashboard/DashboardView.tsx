import { Post } from '@/utils/types/types';
import { convertMsToDate } from '@/utils/utils';
import { ArrowLeft, ArrowRight, Building2, Calendar, MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';
import { CardAdminView } from './CardAdminView';
import { useGetPostsQuery } from '@/libs/redux-store/apiSlice/postApi';
import { Loader } from '../Loader';
import { useState } from 'react';

export const DashboardView = () => {
  const [curPageNumber, setCurPageNumber] = useState(0);
  const { isLoading: isLoadingPosts, isError: isErrorPosts, data: postsContent, error: errorPosts } = useGetPostsQuery(curPageNumber);

  if (isLoadingPosts) {
    return <Loader />;
  }

  const { pageNumber, pageSize, totalElements, totalPages, lastPage } = postsContent;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="container mx-auto mt-5 flex flex-col items-center">

      <div className="w-[60%] rounded-md border border-gray-300 bg-white text-gray-700">
        <div className="card-body">
          <div className='flex gap-3'>
            <h2 className="card-title">Article(s) pending for approval</h2>
          </div>
        </div>
      </div>

      <div className='w-[60%] mt-5'>
        {postsContent.content.map((post: Post) => (
          <div key={post.postId} className='flex flex-col gap-2 w-full mt-5'>
            <CardAdminView post={post} />
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
    </div>
  );
};