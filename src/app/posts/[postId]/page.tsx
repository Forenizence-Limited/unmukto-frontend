// src/app/posts/[postId]/page.tsx
'use client';
import { Card } from '@/components/Card';
import { Loader } from '@/components/Loader';
import { useGetPostQuery } from '@/libs/redux-store/apiSlice/postApi';
import { convertMsToDate } from '@/utils/utils';
import { Building2, Calendar, MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';

// Client Component

export default function PostPage({ params }: { params: { postId: string; }; }) {
  const { postId } = params;

  // Fetch the post data using RTK Query
  const { data: post, error, isLoading } = useGetPostQuery(postId);

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading post.</p>;
  if (!post) return <p>No post found.</p>;

  return (


    <div className="container mx-auto pt-5 flex flex-col items-center">
      <div className="w-[80%] rounded-md border border-gray-300 bg-white text-gray-700">
        <div className="card-body flex flex-col items-center">

          <img className='rounded-md w-full' src="https://random.imagecdn.app/500/150" alt="Shoes" />

          <div className='w-[80%] flex flex-col'>

            <h1 className="card-title mt-5">{post.title}</h1>

            <div className='flex justify-between mt-5'>
              <div className='flex gap-3 items-center'><Calendar size={23} />{convertMsToDate(post.addedDate)}</div>
              <div className="divider divider-horizontal"></div>
              <div className='flex gap-3 items-center'><Navigation size={23} />{post.category.categoryTitle}</div>
              <div className="divider divider-horizontal"></div>
              <div className='flex gap-3 items-center'><Building2 size={23} />{post.accused}</div>
              <div className="divider divider-horizontal"></div>
              <div className='flex gap-3 items-center'><MapPin size={23} />{`${post.address.districts}, ${post.address.divisions}`}</div>
            </div>

            <div className='divider'></div>

            <p>{post.content}</p>
            <div className='divider'></div>
            <h3 className="card-title">Supporting Document(s)</h3>

            <div className="grid grid-cols-3 gap-3 mt-5">
              {/* Image 1 */}
              <img src="https://random.imagecdn.app/500/150" alt="Image 1" className="w-full h-[150px] object-cover rounded-sm" />
              {/* Image 2 */}
              <img src="https://random.imagecdn.app/500/150" alt="Image 2" className="w-full h-[150px] object-cover rounded-sm" />
              {/* Image 3 */}
              <img src="https://random.imagecdn.app/500/150" alt="Image 3" className="w-full h-[150px] object-cover rounded-sm" />
            </div>


          </div>

        </div>
      </div>

      <div>

        <h1 className='card-title mt-10'>More related articles</h1>

        <div className='flex gap-2 mt-5'>
          <Card post={post} />
          <Card post={post} />
          <Card post={post} />
        </div>
      </div>

    </div>
  );
}
