export type Post = {
  id: string;
  title: string;
  created: Date;
  published?: Date;
  subtitle?: string;
  body: string;
  slug?: string;
};
