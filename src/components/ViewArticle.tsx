import { Post } from '@/utils/types/types';
import { convertMsToDate } from '@/utils/utils';
import { Building2, Calendar, MapPin, Navigation } from 'lucide-react';

export default function ViewArticle({ post }: { post: Post; }) {
  return (
    <div className="w-[80%] rounded-md border border-gray-300 bg-white text-gray-700">
      <div className="card-body flex flex-col items-center">

        <img
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}post/image/upload/${post.postId}`}
          onError={(e) => (e.currentTarget.src = '/images/Cover.png')}
          alt="Image" />



        <div className='w-[80%] flex flex-col'>

          <h1 className="card-title mt-5">{post.title}</h1>

          <div className='flex flex-col gap-1 md:flex-row justify-between mt-5'>
            <div className='flex gap-3 items-center'><Calendar size={23} />{convertMsToDate(post.addedDate)}</div>
            <div className="divider divider-horizontal"></div>
            <div className='flex gap-3 items-center'><Navigation size={23} />{post.category.categoryTitle}</div>
            <div className="divider divider-horizontal"></div>
            <div className='flex gap-3 items-center'><Building2 size={23} />{post.accused}</div>
            <div className="divider divider-horizontal"></div>
            <div className='flex gap-3 items-center'><MapPin size={23} />{`${post.districts}, ${post.divisions}`}</div>
          </div>

          <div className='divider'></div>

          <p>{post.content}</p>
          <div className='divider'></div>
          <h3 className="card-title">Supporting Document(s)</h3>

          <div className="grid grid-cols-3 gap-3 mt-5">

            {post.filesName.length === 0 && <p>no supporting documents found</p>}

            {post.filesName.map((filename, index) => {
              return (
                <img
                  key={index} // Add a unique key for each image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}post/image/upload-files/${post.postId}/${filename}`}
                  alt={`Image ${index + 1}`} // Ensure each alt attribute is unique
                  className="w-full h-[150px] object-cover rounded-sm"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
