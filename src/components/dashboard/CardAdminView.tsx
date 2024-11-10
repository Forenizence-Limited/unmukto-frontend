import { useUnpublishPostMutation } from '@/libs/redux-store/apiSlice/postApi';
import { Post } from '@/utils/types/types';
import { convertMsToDate } from '@/utils/utils';
import { Building2, Calendar, MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';

export const CardAdminView = ({ post }: { post: Post; }) => {
  const maxLength = 200;
  const [unpublishPost, { isLoading }] = useUnpublishPostMutation();

  const truncatedContent = post.content.length > maxLength ? post.content.slice(0, maxLength) + '...' : post.content;

  const handleUnpublish = async () => {
    const confirmUnpublish = window.confirm('Are you sure you want to unpublish this post?');

    // If user confirms, trigger the RTK Query mutation
    if (confirmUnpublish) {
      try {
        await unpublishPost(post.postId).unwrap();
        alert('Post has been unpublished successfully');
      } catch (error) {
        console.error('Failed to unpublish the post: ', error);
        alert('Error while unpublishing the post');
      }
    }
  }

  return (

    <div className="rounded-md card card-compact bg-base-100 shadow-xl ">

      <div className="card-body">

        <Link key={post.postId} href={`/dashboard/posts/${post.postId}`} className='w-full'>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">

              <figure>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}post/image/upload/${post.postId}`}

                  onError={(e) => (e.currentTarget.src = '/images/Cover.png')}
                  alt="Image"
                  style={{
                    height: '120px',          // Set the desired height
                    width: '100%',            // Ensure the width is responsive
                    objectFit: 'cover',       // Cover the entire frame without distortion
                  }}
                />
                {/* Badge positioned at the top-right corner of the image */}
              </figure>
            </div>
            <div className="col-span-2">
              <div>

                <h2 className="card-title">{post.title}</h2>
                <p>{truncatedContent}</p>


                <div className='flex mt-5'>
                  <div className='flex gap-1 items-center'><Calendar size={14} />{convertMsToDate(post.addedDate)}</div>
                  <div className="divider divider-horizontal"></div>
                  <div className='flex gap-1 items-center'><Navigation size={14} />{post.category.categoryTitle}</div>
                  <div className="divider divider-horizontal"></div>
                  <div className='flex gap-1 items-center'><Building2 size={14} />{post.accused}</div>
                  <div className="divider divider-horizontal"></div>
                  <div className='flex gap-1 items-center'><MapPin size={14} />{`${post.districts}, ${post.divisions}`}</div>
                </div>
              </div>
            </div>
          </div>
        </Link >

        <div className='divider'></div>

        <div className='flex flex-row-reverse gap-3'>
          <button className='btn btn-active btn-neutral' onClick={handleUnpublish} disabled={isLoading}>Unpublish</button>
        </div>

      </div>



    </div>
  );
};