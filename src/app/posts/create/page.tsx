"use client";
import { useGetCategoriesQuery } from '@/libs/redux-store/apiSlice/categoryApi';
import { useAddPostMutation, useUploadCoverPhotoMutation, useUploadSupportingDocumentsMutation } from '@/libs/redux-store/apiSlice/postApi';
import { Category, Post } from '@/utils/types/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

const CreatePostForm: React.FC = () => {
  // react-hook-form initialization
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Post>();
  const { isLoading: isLoadingCategories, isError: isErrorCategories, data: categories, error } = useGetCategoriesQuery("1");

  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);


  const [uploadCoverPhoto, { isLoading: isLoadingUploadCoverPhoto, isError: isErrorUploadCoverPhoto, isSuccess: isSuccessConverPhotoUpload }] = useUploadCoverPhotoMutation();
  const [uploadSupportingDocuments, { isLoading: isLoadingUploadSupportingDocuments, isError: isErrorUploadSupportingDocuments, isSuccess: isSuccessSelectedFilesUpload }] = useUploadSupportingDocumentsMutation();


  const [addPost, { isLoading, isError, isSuccess }] = useAddPostMutation();
  const [statusMessage, setStatusMessage] = useState("");
  const [submittedPostId, setSubmittedPostId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  console.log(categories);

  useEffect(() => {
    if (submittedPostId) {

      if (coverPhotoFile) {
        const uploadCoverPhotoFile = async () => {
          // Prepare FormData
          const formData = new FormData();
          formData.append('image', coverPhotoFile);
          formData.append('postId', submittedPostId.toString());

          console.log(formData);
          console.log(submittedPostId);
          console.log(coverPhotoFile);

          // Upload the file
          await uploadCoverPhoto(formData)
            .unwrap()
            .then((payload) => {
              console.log(payload);
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
          Array.from(selectedFiles).forEach((file, index) => {
            console.log("adding", index);
            formData.append(`files`, file); // 'files' is the key for multiple files
          });
          formData.append('postId', submittedPostId.toString());

          console.log(selectedFiles, "selected files here");
          console.log(formData.get("files"), "files here");
          console.log(submittedPostId);
          console.log(coverPhotoFile);

          // Upload the file
          await uploadSupportingDocuments(formData)
            .unwrap()
            .then((payload) => {
              console.log(payload);
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

    console.log(data, "submitted data is here");

    await addPost(data)
      .unwrap()
      .then((payload) => {
        setStatusMessage("success");
        setSubmittedPostId((payload as Post).postId);
      })
      .catch((error: unknown) => {
        console.log(error);
        setStatusMessage("fail");
      });
  };

  useEffect(() => {
    if (isSuccess && isSuccessConverPhotoUpload && isSuccessSelectedFilesUpload) {
      reset();
    }
  }, [isSuccess, isSuccessConverPhotoUpload, isSuccessSelectedFilesUpload]);

  return (
    <div className="container mx-auto pt-5 flex flex-col items-center">


      <div className="w-[60%] rounded-md border border-gray-300 bg-white text-gray-700">
        <div className="card-body">

          <h2 className="card-title">Blow the whistle</h2>
          <p>You don’t need to provide your personal information so your identity is always hidden and safe. This website doesn’t use cookie or tracking pixel or collect your location, IP address, or device information.</p>

        </div>
      </div>


      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
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

            {/* Cover Photo Input */}
            <div>
              <label className="label">Upload Cover Photo</label>
              <input type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs" onChange={(event) => setCoverPhotoFile(event.target.files[0])} />
              {/* {errors.content && <span className="text-red-500">Content is required</span>} */}
            </div>


            <h2 className="card-title pt-5">Supporting Documents</h2>
            <p className='text-sm text-gray-500 mt-2'>Upload at least one supporting document*</p>

            <div className="form-control">
              <label className="label">Upload files</label>
              <input
                type="file"
                multiple
                onChange={(event) => setSelectedFiles(Array.from(event.target.files))}
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

        <div className="w-[60%] rounded-md bg-gray-50 text-gray-700 mt-5 flex justify-between">
          <div className="form-control flex justify-center">
            <label className="cursor-pointer label flex justify-center items-center gap-3 w-[500px]">
              <input type="checkbox" required className="checkbox checkbox-outline ml-3" />
              <span className="label-text font-normal">I am aware, this article will appear on the website after being approved by an anonymous admin. I understand the approval process is necessary to prevent the website from flooding with irrelevant articles.</span>
            </label>
          </div>

          <button type="submit" className="btn btn-neutral text-white m-5" disabled={isLoading || isLoadingUploadCoverPhoto || isLoadingUploadCoverPhoto}>
            Publish article
          </button>
        </div>
      </form>

    </div>
  );
};

export default CreatePostForm;
