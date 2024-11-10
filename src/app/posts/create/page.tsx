"use client";
import { useGetCategoriesQuery } from '@/libs/redux-store/apiSlice/categoryApi';
import { useAddPostMutation, useUploadCoverPhotoMutation, useUploadSupportingDocumentsMutation } from '@/libs/redux-store/apiSlice/postApi';
import { useAuth } from '@/utils/hooks/useAuth';
import { Category, Post } from '@/utils/types/types';
import { convertMsToDate } from '@/utils/utils';
import { ArrowLeft, Building2, Calendar, MapPin, Navigation } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

const CreatePostForm: React.FC = () => {
  // react-hook-form initialization
  const { register, handleSubmit, reset, formState: { errors }, watch, trigger } = useForm<Post>();
  const { isLoading: isLoadingCategories, isError: isErrorCategories, data: categories, error } = useGetCategoriesQuery(undefined);

  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isPreview, setIsPreview] = useState(false);


  const [uploadCoverPhoto, { isLoading: isLoadingUploadCoverPhoto, isError: isErrorUploadCoverPhoto, isSuccess: isSuccessConverPhotoUpload }] = useUploadCoverPhotoMutation();
  const [uploadSupportingDocuments, { isLoading: isLoadingUploadSupportingDocuments, isError: isErrorUploadSupportingDocuments, isSuccess: isSuccessSelectedFilesUpload }] = useUploadSupportingDocumentsMutation();


  const [addPost, { isLoading, isError, isSuccess }] = useAddPostMutation();
  const [statusMessage, setStatusMessage] = useState("");
  const [submittedPostId, setSubmittedPostId] = useState<number | null>(null);

  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirect if not logged in
    }
  }, [isAuthenticated, router]);

  const watchedValues = watch();

  useEffect(() => {
    if (submittedPostId) {

      if (coverPhotoFile) {
        const uploadCoverPhotoFile = async () => {
          // Prepare FormData
          const formData = new FormData();
          formData.append('image', coverPhotoFile);
          formData.append('postId', submittedPostId.toString());

          // Upload the file
          await uploadCoverPhoto(formData)
            .unwrap()
            .then((payload) => {
            })
            .catch((error: unknown) => {
              setStatusMessage("photo uploading failed");
            });
        };
        uploadCoverPhotoFile();
      }
      if (selectedFiles) {

        const uploadSupportingDocumentsFile = async () => {
          // Prepare FormData
          const formData = new FormData();
          Array.from(selectedFiles).forEach((file) => {
            formData.append(`files`, file); // 'files' is the key for multiple files
          });
          formData.append('postId', submittedPostId.toString());

          // Upload the file
          await uploadSupportingDocuments(formData)
            .unwrap()
            .then((payload) => {
            })
            .catch((error: unknown) => {
              setStatusMessage("photo uploading failed");
            });
        };
        uploadSupportingDocumentsFile();
      }
    }
  }, [submittedPostId]);

  // Submit handler
  const onSubmit: SubmitHandler<Post> = async (data) => {
    console.log(data);
    await addPost(data)
      .unwrap()
      .then((payload) => {
        setStatusMessage("success");
        setSubmittedPostId((payload as Post).postId);
      })
      .catch((error: unknown) => {
        setStatusMessage("fail");
      });
  };

  useEffect(() => {
    if (isSuccess && isSuccessConverPhotoUpload && isSuccessSelectedFilesUpload) {
      reset();
      setIsPreview(false);
    }
  }, [isSuccess, isSuccessConverPhotoUpload, isSuccessSelectedFilesUpload]);

  const handlePreviewClick = async () => {
    const isValid = await trigger();
    if (isValid) {
      setIsPreview(true);
    }
  };

  console.log(categories);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto pt-5 flex flex-col items-center">

      {!isPreview &&
        <div className="w-[60%] rounded-md border border-gray-300 bg-white text-gray-700">
          <div className="card-body">
            <h2 className="card-title">Blow the whistle</h2>
            <p>You don’t need to provide your personal information so your identity is always hidden and safe. This website doesn’t use cookie or tracking pixel or collect your location, IP address, or device information.</p>
          </div>
        </div>
      }

      {isPreview &&
        <div onClick={() => setIsPreview(false)} className="w-[60%] rounded-md border border-gray-300 bg-white text-gray-700">
          <div className="card-body">
            <div className='flex gap-3'>
              <ArrowLeft /><h2 className="card-title">Edit your article</h2>
            </div>
          </div>
        </div>
      }

      {isPreview &&
        <div className="w-[60%] rounded-md border border-gray-300 bg-white text-gray-700 mt-5">
          <div className="card-body flex flex-col items-center">

            <img className='rounded-md w-full' src={previewUrl || ''} alt="Image" />

            <div className='w-[80%] flex flex-col'>

              <h1 className="card-title mt-5">{watchedValues.title}</h1>

              <div className='flex justify-between mt-5'>
                <div className='flex gap-3 items-center'><Calendar size={23} />{convertMsToDate(Date.now())}</div>
                <div className="divider divider-horizontal"></div>
                <div className='flex gap-3 items-center'><Navigation size={23} />{categories[watchedValues.category.categoryId - 1].categoryTitle} {watchedValues.category.categoryId}</div>
                <div className="divider divider-horizontal"></div>
                <div className='flex gap-3 items-center'><Building2 size={23} />{watchedValues.accused}</div>
                <div className="divider divider-horizontal"></div>
                {/* TODO */}
                <div className='flex gap-3 items-center'><MapPin size={23} />{`${watchedValues.districts}, ${watchedValues.divisions}`}</div>
              </div>

              <div className='divider'></div>

              <p>{watchedValues.content}</p>
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
      }


      <div className={`w-full flex flex-col items-center ${isPreview ? 'hidden' : ''}`}>
        <div className="w-[60%] rounded-md border border-gray-300 bg-white text-gray-700 mt-5">
          <div className="card-body">

            <h2 className="card-title pb-2">Article Information</h2>

            {/* Title Input */}
            <div>
              <label className="label">Article Title</label>
              <input
                {...register('title', { required: true })}
                type="text"
                placeholder="Type article title"
                className="input input-bordered w-full"
              />
              {errors.title && <span className="text-red-500">Title is required</span>}
            </div>


            {/* Title Input */}
            <div>
              <label className="label">Category</label>
              <select
                {...register("category.categoryId", { required: "Please select a category" })}
                className="select select-bordered w-full">
                <option disabled selected>Select Category</option>
                {categories && categories.map((category: Category) => {
                  return (
                    <option key={category.categoryId} value={category.categoryId}>{category.categoryTitle}</option>
                  );
                })}
              </select>
              {errors.title && <span className="text-red-500">Title is required</span>}
            </div>




            {/* Organization Input */}
            <div>
              <label className="label">Organization</label>
              <input
                {...register('accused', { required: true })}
                type="text"
                placeholder="Type organization name"
                className="input input-bordered w-full"
              />
              {errors.accused && <span className="text-red-500">Organization is required</span>}
            </div>

            {/* Content Input */}
            <div>
              <label className="label">Description</label>
              <textarea
                {...register('content', { required: true })}
                placeholder="Type description"
                className="textarea textarea-bordered w-full"
                rows={5}
              />
              {errors.content && <span className="text-red-500">Content is required</span>}
            </div>

            

            <div>
              <label className="label">Division</label>
              <input
                {...register('divisions')}
                type="text"
                placeholder="Type Division"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">District</label>
              <input
                {...register('districts')}
                type="text"
                placeholder="Type District"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Upazila</label>
              <input
                {...register('upazilas')}
                type="text"
                placeholder="Type Upazila"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">Union</label>
              <input
                {...register('unions')}
                type="text"
                placeholder="Type Union"
                className="input input-bordered w-full"
              />
            </div>

            {/* Cover Photo Input */}
            <div>
              <label className="label">Upload Cover Photo</label>
              <input type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                onChange={(event) => {
                  if (event.target.files && event.target.files.length > 0) {
                    setCoverPhotoFile(event.target.files[0]);

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreviewUrl(reader.result as string); // Set the preview URL for the image
                    };
                    reader.readAsDataURL(event.target.files[0]); // Read the file as a data URL
                  }
                }}
              />
              {/* {errors.content && <span className="text-red-500">Content is required</span>} */}
            </div>


            <h2 className="card-title pt-5">Supporting Documents</h2>
            <p className='text-sm text-gray-500 mt-2'>Upload at least one supporting document*</p>

            <div className="form-control">
              <label className="label">Upload files</label>
              <input
                type="file"
                multiple
                onChange={(event) => {
                  if (event.target.files && event.target.files.length > 0) {
                    setSelectedFiles(Array.from(event.target.files));
                  }
                }}
                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              />
            </div>

          </div>




        </div>

        {
          isSuccess && isSuccessConverPhotoUpload && isSuccessSelectedFilesUpload &&
          <div role="alert" className="w-[60%] mt-5 alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Your article has been published!</span>
          </div>
        }

      </div>


      <div className="w-[60%] rounded-md bg-gray-50 text-gray-700 mt-5">

        {!isPreview ?
          <div className='flex flex-row-reverse'>
            <button onClick={handlePreviewClick} className="btn btn-neutral text-white m-5">
              Preview article
            </button>
          </div>
          :
          <div className='flex justify-between'>
            <div className="form-control flex justify-center">
              <label className="cursor-pointer label flex justify-center items-center gap-3 w-[85%]">
                <input type="checkbox" required className="checkbox checkbox-outline ml-3" />
                <span className="label-text font-normal">I am aware, this article will appear on the website after being approved by an anonymous admin. I understand the approval process is necessary to prevent the website from flooding with irrelevant articles.</span>
              </label>
            </div>
            <button type="submit" className="btn btn-neutral text-white m-5" disabled={isLoading || isLoadingUploadCoverPhoto || isLoadingUploadCoverPhoto}>
              Publish article
            </button>
          </div>
        }
      </div>

    </form >
  );
};

export default CreatePostForm;
