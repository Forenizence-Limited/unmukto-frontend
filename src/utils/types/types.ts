export type Category = {
  categoryId: number;
  categoryTitle: string;
  categoryDescription: string;
  tag: string;
};

export type Role = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  about: string;
  active: boolean;
  roles: Role[];
};

export type Post = {
  postId: number;
  title: string;
  content: string;
  imageName: string;
  addedDate: number;
  accused: string;
  category: Category;
  user: User;
  comments: string[]; // Define more if necessary
  filesName: string[]; // Define more if necessary
  likeCount: number;
  viewCount: number;
  published: boolean;

  divisions?: string;
  districts?: string;
  upazilas?: string;
  unions?: string;
  postCode?: string;
};
