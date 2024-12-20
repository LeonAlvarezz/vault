export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          note_id: string
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          note_id: string
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          note_id?: string
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      feedbacks: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image: string[] | null
          profile_id: string | null
          resolved_at: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string[] | null
          profile_id?: string | null
          resolved_at?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string[] | null
          profile_id?: string | null
          resolved_at?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedbacks_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          note_id: string
          profile_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          note_id: string
          profile_id: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          note_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      note_metrics: {
        Row: {
          bookmark: number
          created_at: string
          id: number
          like: number
          note_id: string | null
          updated_at: string | null
          view: number
        }
        Insert: {
          bookmark?: number
          created_at?: string
          id?: number
          like?: number
          note_id?: string | null
          updated_at?: string | null
          view?: number
        }
        Update: {
          bookmark?: number
          created_at?: string
          id?: number
          like?: number
          note_id?: string | null
          updated_at?: string | null
          view?: number
        }
        Relationships: [
          {
            foreignKeyName: "note_metrics_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
        ]
      }
      notes: {
        Row: {
          bookmark: number | null
          category_id: number | null
          content: Json | null
          content_text: string | null
          cover_url: string | null
          created_at: string
          deleted_at: string | null
          embedding: string | null
          fts: unknown | null
          id: string
          like: number | null
          profile_id: string
          published_at: string | null
          subscription_tier:
            | Database["public"]["Enums"]["SUBSCRIPTION_TIER"]
            | null
          title: string
          updated_at: string | null
          view: number | null
        }
        Insert: {
          bookmark?: number | null
          category_id?: number | null
          content?: Json | null
          content_text?: string | null
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          embedding?: string | null
          fts?: unknown | null
          id?: string
          like?: number | null
          profile_id?: string
          published_at?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["SUBSCRIPTION_TIER"]
            | null
          title: string
          updated_at?: string | null
          view?: number | null
        }
        Update: {
          bookmark?: number | null
          category_id?: number | null
          content?: Json | null
          content_text?: string | null
          cover_url?: string | null
          created_at?: string
          deleted_at?: string | null
          embedding?: string | null
          fts?: unknown | null
          id?: string
          like?: number | null
          profile_id?: string
          published_at?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["SUBSCRIPTION_TIER"]
            | null
          title?: string
          updated_at?: string | null
          view?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          aboutMe: Json | null
          auth_id: string
          avatar_url: string | null
          bios: string | null
          cover_url: string | null
          created_at: string
          email: string
          githubLink: string | null
          id: string
          linkedinLink: string | null
          occupation: string | null
          subscription_tier:
            | Database["public"]["Enums"]["SUBSCRIPTION_TIER"]
            | null
          updated_at: string | null
          username: string
          websiteLink: string | null
        }
        Insert: {
          aboutMe?: Json | null
          auth_id?: string
          avatar_url?: string | null
          bios?: string | null
          cover_url?: string | null
          created_at?: string
          email: string
          githubLink?: string | null
          id?: string
          linkedinLink?: string | null
          occupation?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["SUBSCRIPTION_TIER"]
            | null
          updated_at?: string | null
          username: string
          websiteLink?: string | null
        }
        Update: {
          aboutMe?: Json | null
          auth_id?: string
          avatar_url?: string | null
          bios?: string | null
          cover_url?: string | null
          created_at?: string
          email?: string
          githubLink?: string | null
          id?: string
          linkedinLink?: string | null
          occupation?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["SUBSCRIPTION_TIER"]
            | null
          updated_at?: string | null
          username?: string
          websiteLink?: string | null
        }
        Relationships: []
      }
      rel_notes_tags: {
        Row: {
          created_at: string
          id: number
          note_id: string
          tag_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          note_id: string
          tag_id: number
        }
        Update: {
          created_at?: string
          id?: number
          note_id?: string
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "rel_notes_tags_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rel_notes_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          contact_email: string | null
          created_at: string
          description: string | null
          id: number
          images: string[] | null
          profile_id: string | null
          resolved_at: string | null
          subject: string | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string
          description?: string | null
          id?: number
          images?: string[] | null
          profile_id?: string | null
          resolved_at?: string | null
          subject?: string | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string
          description?: string | null
          id?: number
          images?: string[] | null
          profile_id?: string | null
          resolved_at?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      searches: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: number
          profile_id: string | null
          query: string | null
          search_count: number | null
          search_source: Database["public"]["Enums"]["SEARCH_SOURCE"] | null
          search_type: Database["public"]["Enums"]["SEARCH_TYPE"] | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          profile_id?: string | null
          query?: string | null
          search_count?: number | null
          search_source?: Database["public"]["Enums"]["SEARCH_SOURCE"] | null
          search_type?: Database["public"]["Enums"]["SEARCH_TYPE"] | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: number
          profile_id?: string | null
          query?: string | null
          search_count?: number | null
          search_source?: Database["public"]["Enums"]["SEARCH_SOURCE"] | null
          search_type?: Database["public"]["Enums"]["SEARCH_TYPE"] | null
        }
        Relationships: [
          {
            foreignKeyName: "searches_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          created_at: string
          disable_command_search: boolean | null
          id: number
          keyboard_shortcuts: Json | null
          language: string | null
          notification: Json | null
          profile_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          disable_command_search?: boolean | null
          id?: number
          keyboard_shortcuts?: Json | null
          language?: string | null
          notification?: Json | null
          profile_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          disable_command_search?: boolean | null
          id?: number
          keyboard_shortcuts?: Json | null
          language?: string | null
          notification?: Json | null
          profile_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "settings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          color: string | null
          created_at: string
          deleted_at: string | null
          id: number
          name: string
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: number
          name: string
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: number
          name?: string
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tags_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_note_chart_data: {
        Args: {
          user_id: string
        }
        Returns: Database["public"]["CompositeTypes"]["note_chart_data"][]
      }
      get_note_summary: {
        Args: {
          user_id: string
        }
        Returns: Database["public"]["CompositeTypes"]["note_summary"]
      }
      get_recent_search_log: {
        Args: {
          limitcount: number
          user_id: string
        }
        Returns: {
          created_at: string
          deleted_at: string | null
          id: number
          profile_id: string | null
          query: string | null
          search_count: number | null
          search_source: Database["public"]["Enums"]["SEARCH_SOURCE"] | null
          search_type: Database["public"]["Enums"]["SEARCH_TYPE"] | null
        }[]
      }
      increment: {
        Args: {
          table_name: string
          row_id: string
          x: number
          field_name: string
        }
        Returns: undefined
      }
      increment_int_id: {
        Args: {
          table_name: string
          row_id: number
          x: number
          field_name: string
        }
        Returns: undefined
      }
      match_notes: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
          user_id: string
        }
        Returns: {
          bookmark: number | null
          category_id: number | null
          content: Json | null
          content_text: string | null
          cover_url: string | null
          created_at: string
          deleted_at: string | null
          embedding: string | null
          fts: unknown | null
          id: string
          like: number | null
          profile_id: string
          published_at: string | null
          subscription_tier:
            | Database["public"]["Enums"]["SUBSCRIPTION_TIER"]
            | null
          title: string
          updated_at: string | null
          view: number | null
        }[]
      }
      vector_search: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
          user_id: string
        }
        Returns: {
          bookmark: number | null
          category_id: number | null
          content: Json | null
          content_text: string | null
          cover_url: string | null
          created_at: string
          deleted_at: string | null
          embedding: string | null
          fts: unknown | null
          id: string
          like: number | null
          profile_id: string
          published_at: string | null
          subscription_tier:
            | Database["public"]["Enums"]["SUBSCRIPTION_TIER"]
            | null
          title: string
          updated_at: string | null
          view: number | null
        }[]
      }
      vector_search_v2: {
        Args: {
          query_embedding: string
          match_threshold: number
          user_id: string
          match_count: number
        }
        Returns: {
          id: string
          title: string
          content_text: string
          published_at: string
          deleted_at: string
          embedding: string
          profile_id: string
          username: string
          avatar_url: string
          similarity: number
        }[]
      }
    }
    Enums: {
      SEARCH_SOURCE: "command_search" | "search_bar"
      SEARCH_TYPE: "note" | "profile"
      SUBSCRIPTION_TIER: "free" | "premium"
    }
    CompositeTypes: {
      note_chart_data: {
        date: string | null
        views: number | null
        likes: number | null
        bookmarks: number | null
      }
      note_summary: {
        total_like: number | null
        total_view: number | null
        total_bookmark: number | null
        total_like_last_week: number | null
        total_view_last_week: number | null
        total_bookmark_last_week: number | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
