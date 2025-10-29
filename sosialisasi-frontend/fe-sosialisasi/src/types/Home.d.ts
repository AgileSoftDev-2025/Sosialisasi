interface IPost {
  _id: string;
  text_content: string;
  attachmentUrl_content?: string;
  type_content: string;
  created_at_content: string;
  userId: {
    _id: string;
    fullName: string;
    profilePicture?: string;
  };
  likes: string[];
  comments: string[];
}

export { IPost };
