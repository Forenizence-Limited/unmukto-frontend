'use client';
import { useGetCategoriesQuery } from '@/libs/redux-store/apiSlice/categoryApi';
import { Category } from '@/utils/types/types';

export const CategoryNavbar = () => {
  const { isLoading, isError, data: categories, error } = useGetCategoriesQuery(undefined);

  if (isLoading) {
    return null;
  }

  if (isError) {
    return (
      <div>error fetching categories</div>
    );
  }

  return (
    <div className="flex md:justify-center mt-2 md:mt-0">
      <div className="md:flex md:flex-row menu md:menu-horizontal gap-2">
        {categories.map((category: Category, index: number) => (
          <div key={category.categoryId} className="flex items-center">
            {/* Category link */}
            <a href={`/categories/${category.categoryId}`} className="px-2">
              {category.categoryTitle}
            </a>

            {/* Add vertical bar except for the last item */}
            {index < categories.length - 1 && (
              <span className="hidden md:flex gap-2 w-[1px] bg-gray-300 h-[20px] mx-2"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};;