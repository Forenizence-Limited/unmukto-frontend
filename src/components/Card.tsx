import { Post } from '@/utils/types/types';
import { convertMsToDate } from '@/utils/utils';
import { Building2, Calendar, MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';

export const Card = ({ post }: { post: Post; }) => {

  const maxLength = 150;

  const truncatedContent = post.content.length > maxLength ? post.content.slice(0, maxLength) + '...' : post.content;


  return (
    <Link key={post.postId} href={`/posts/${post.postId}`}>
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}post/image/upload/${post.postId}`}
            
            onError={(e) => (e.currentTarget.src = '/images/Cover.png')} 
            alt="Image"
            style={{
              height: '192px',          // Set the desired height
              width: '100%',            // Ensure the width is responsive
              objectFit: 'cover',       // Cover the entire frame without distortion
            }}
            />
          {/* Badge positioned at the top-right corner of the image */}
          <div className="absolute top-5 left-5">
            <span className="badge border border-gray-300 bg-white text-gray-700 p-3">{post.category.categoryTitle}</span>
          </div>
        </figure>
        <div className="card-body flex-grow">
          <h2 className="card-title">{post.title}</h2>
          <p>{truncatedContent}</p>


          <div className='flex mt-5 gap-5'>
            <div className='flex gap-1 items-center text-sm'><Calendar size={18} /> {convertMsToDate(post.addedDate)}</div>
            <div className='flex gap-1 items-center'><MapPin size={18} />{`${post.districts}, ${post.divisions}`}</div>
          </div>

          {/* <p>Accused: {post.accused}</p>
        <p>Address: {post.address.divisions}, {post.address.districts}</p>
        <p>Likes: {post.likeCount} | Views: {post.viewCount}</p>
        <p>{post.published ? "Published" : "Not Published"}</p>
        <Link href={`/posts/${post.postId}`}>Go to the post</Link> */}
        </div>
      </div>
    </Link>
  );
};