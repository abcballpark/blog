export type Post = {
  content: string;
  data: {
    title: string;
    subtitle?: string;
    slug: string;
    created: Date;
    published?: Date;
  };
};
