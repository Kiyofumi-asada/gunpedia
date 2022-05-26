export type TGundamData = {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

export type TPartialGundamData = Partial<TGundamData>;

export type TFormData = {
  title: string;
  content: string;
};
