export type NoteMetric = {
  bookmark: number;
  created_at: string;
  id: number;
  like: number;
  note_id: string | null;
  updated_at: string | null;
  view: number;
};

export type NoteSummary = {
  total_bookmark: number | null;
  total_bookmark_last_week: number | null;
  total_like: number | null;
  total_like_last_week: number | null;
  total_view: number | null;
  total_view_last_week: number | null;
};

export type NoteChartData = {
  date: string | null;
  views: number | null;
  likes: number | null;
  bookmarks: number | null;
};
