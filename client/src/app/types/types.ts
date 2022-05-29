export type TGundamData = {
  id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type TPartialGundamData = Partial<TGundamData>;
