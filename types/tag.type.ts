export type Tag = {
  created_at: string;
  deleted_at: string | null;
  id: number;
  name: string | null;
  updated_at: string | null;
  profile_id: string | null;
};
export type NoteTag = {
  created_at: string;
  id: number;
  note_id: string;
  tag_id: number;
};

export type CreateTag = {
  name: string;
};
