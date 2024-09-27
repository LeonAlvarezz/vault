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
      notes: {
        Row: {
          bookmark: number | null
          category_id: number | null
          content: Json | null
          created_at: string
          deleted_at: string | null
          id: string
          like: number | null
          profile_id: string
          published_at: string | null
          title: string
          updated_at: string | null
          view: number | null
        }
        Insert: {
          bookmark?: number | null
          category_id?: number | null
          content?: Json | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          like?: number | null
          profile_id?: string
          published_at?: string | null
          title: string
          updated_at?: string | null
          view?: number | null
        }
        Update: {
          bookmark?: number | null
          category_id?: number | null
          content?: Json | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          like?: number | null
          profile_id?: string
          published_at?: string | null
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
          created_at: string
          email: string
          githubLink: string | null
          id: string
          linkedinLink: string | null
          occupation: string | null
          updated_at: string | null
          username: string
          websiteLink: string | null
        }
        Insert: {
          aboutMe?: Json | null
          auth_id?: string
          avatar_url?: string | null
          bios?: string | null
          created_at?: string
          email: string
          githubLink?: string | null
          id?: string
          linkedinLink?: string | null
          occupation?: string | null
          updated_at?: string | null
          username: string
          websiteLink?: string | null
        }
        Update: {
          aboutMe?: Json | null
          auth_id?: string
          avatar_url?: string | null
          bios?: string | null
          created_at?: string
          email?: string
          githubLink?: string | null
          id?: string
          linkedinLink?: string | null
          occupation?: string | null
          updated_at?: string | null
          username?: string
          websiteLink?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
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
