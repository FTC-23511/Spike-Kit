export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      entities: {
        Row: {
          id: string
          name: string
          team_number: number | null
          location: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          team_number?: number | null
          location?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          team_number?: number | null
          location?: string | null
          created_at?: string
        }
      }
      reports: {
        Row: {
          id: string
          entity_id: string | null
          reporter_id: string | null
          data: Json
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          entity_id?: string | null
          reporter_id?: string | null
          data: Json
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          entity_id?: string | null
          reporter_id?: string | null
          data?: Json
          notes?: string | null
          created_at?: string
        }
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
  }
}
