interface ICreateContentForm {
  text_content: string;
  type_content: "All" | "Competition" | "Project";
  file?: FileList;
}

export { ICreateContentForm };
