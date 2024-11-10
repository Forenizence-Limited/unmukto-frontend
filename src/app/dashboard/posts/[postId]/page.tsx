"use client";
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/Loader';
import { useAuth } from '@/utils/hooks/useAuth';
import ViewArticle from '@/components/ViewArticle';
import { useGetPostQuery } from '@/libs/redux-store/apiSlice/postApi';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPost({ params }: { params: { postId: string; }; }) {
  const { postId } = params;
  const router = useRouter();

  const { data: post, isError, error, isLoading } = useGetPostQuery(postId);

  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    router.push("/login");
    return <Loader />;
  }

  if (isAuthenticated && user?.roles[0].name != "ROLE_ADMIN") {
    router.push("/");
    return <Loader />;
  }

  if (isLoading) return <Loader />;
  if (isError) {
    if (error != null && 'status' in error && error.status === 401) {
      router.push('/login');
    }
  }
  if (!post) return <p>No post found.</p>;

  return (
    <>
      <Link href="/dashboard">
        <div className="container mx-auto mt-5 flex flex-col items-center">
          <div className="w-[80%] rounded-md border border-gray-300 bg-white text-gray-700">
            <div className="card-body">
              <div className='flex gap-3'>
                <ArrowLeft /><h2 className="card-title">Back to dashboard</h2>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="container mx-auto pt-5 flex flex-col items-center">
        <ViewArticle post={post} />
      </div>

      <div className="container mx-auto pt-5 flex flex-col items-center">

        <div className="w-[80%] rounded-md bg-gray-50 text-gray-700 mt-5">
          <div className='flex flex-row-reverse gap-3 m-5'>
            
          <button className='btn btn-active btn-neutral'>Approve</button>
            <button className='btn btn-outline'>Reject</button>
          </div>
        </div>
      </div>
    </>
  );
}
