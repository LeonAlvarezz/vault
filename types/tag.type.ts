export type Tag = {
  tags: any;
  color: string | null;
  created_at: string;
  deleted_at: string | null;
  id: number;
  name: string;
  profile_id: string;
  updated_at: string | null;
};

export type NoteTag = {
  id: number;
  name: string;
  profile_id: string;
  color: string | null;
  created_at?: string;
};

export type CreateTag = {
  name: string;
};

export type UpdateTag = {
  id: number;
  name: string;
  color: string;
};
