export type Tag = {
  color: string | null;
  created_at: string;
  description: string | null;
  id: number;
  name: string;
  updated_at: string | null;
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

export type UpdateTag = {
  id: number;
  name: string;
  color: string;
};
