export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_name: string | null
          category: string | null
          content: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          published: boolean | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          additional_notes: string | null
          artist_inspiration: string | null
          collector_type: string | null
          created_at: string
          email: string
          first_name: string
          guest_spot_name: string | null
          id: string
          last_name: string
          location: string | null
          location_type: string | null
          phone: string | null
          placement_images: string[] | null
          portfolio_favorites: string | null
          preferred_date: string | null
          reference_images: string[] | null
          status: string | null
          story: string | null
          tattoo_placement: string | null
          tattoo_size: string | null
          updated_at: string
        }
        Insert: {
          additional_notes?: string | null
          artist_inspiration?: string | null
          collector_type?: string | null
          created_at?: string
          email: string
          first_name: string
          guest_spot_name?: string | null
          id?: string
          last_name: string
          location?: string | null
          location_type?: string | null
          phone?: string | null
          placement_images?: string[] | null
          portfolio_favorites?: string | null
          preferred_date?: string | null
          reference_images?: string[] | null
          status?: string | null
          story?: string | null
          tattoo_placement?: string | null
          tattoo_size?: string | null
          updated_at?: string
        }
        Update: {
          additional_notes?: string | null
          artist_inspiration?: string | null
          collector_type?: string | null
          created_at?: string
          email?: string
          first_name?: string
          guest_spot_name?: string | null
          id?: string
          last_name?: string
          location?: string | null
          location_type?: string | null
          phone?: string | null
          placement_images?: string[] | null
          portfolio_favorites?: string | null
          preferred_date?: string | null
          reference_images?: string[] | null
          status?: string | null
          story?: string | null
          tattoo_placement?: string | null
          tattoo_size?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      email_templates: {
        Row: {
          body: string
          created_at: string
          description: string | null
          id: string
          name: string
          subject: string
          updated_at: string
        }
        Insert: {
          body: string
          created_at?: string
          description?: string | null
          id: string
          name: string
          subject: string
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      guest_spots: {
        Row: {
          city: string
          country: string
          created_at: string
          description: string | null
          end_date: string
          id: string
          is_active: boolean | null
          start_date: string
          studio_name: string
          updated_at: string
        }
        Insert: {
          city: string
          country: string
          created_at?: string
          description?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          start_date: string
          studio_name: string
          updated_at?: string
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          description?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          start_date?: string
          studio_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_images: {
        Row: {
          created_at: string
          display_order: number
          id: string
          is_featured: boolean | null
          is_visible: boolean | null
          storage_path: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          is_featured?: boolean | null
          is_visible?: boolean | null
          storage_path: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          is_featured?: boolean | null
          is_visible?: boolean | null
          storage_path?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          cover_image: string | null
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          images: string[] | null
          location: string | null
          published: boolean | null
          title: string
          updated_at: string
          year: string | null
        }
        Insert: {
          category?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          images?: string[] | null
          location?: string | null
          published?: boolean | null
          title: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          category?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          images?: string[] | null
          location?: string | null
          published?: boolean | null
          title?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      seo_audit_issues: {
        Row: {
          category: string
          created_at: string
          details: Json | null
          id: string
          is_resolved: boolean | null
          issue_type: string
          message: string
          page_id: string | null
          resolved_at: string | null
          resolved_by: string | null
          route: string | null
          severity: string
        }
        Insert: {
          category: string
          created_at?: string
          details?: Json | null
          id?: string
          is_resolved?: boolean | null
          issue_type: string
          message: string
          page_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          route?: string | null
          severity: string
        }
        Update: {
          category?: string
          created_at?: string
          details?: Json | null
          id?: string
          is_resolved?: boolean | null
          issue_type?: string
          message?: string
          page_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          route?: string | null
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "seo_audit_issues_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "seo_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_change_log: {
        Row: {
          changed_at: string
          changed_by: string | null
          entity_id: string
          entity_route: string | null
          entity_type: string
          field_name: string
          id: string
          is_reverted: boolean | null
          new_value: string | null
          old_value: string | null
          reverted_at: string | null
          reverted_by: string | null
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          entity_id: string
          entity_route?: string | null
          entity_type: string
          field_name: string
          id?: string
          is_reverted?: boolean | null
          new_value?: string | null
          old_value?: string | null
          reverted_at?: string | null
          reverted_by?: string | null
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          entity_id?: string
          entity_route?: string | null
          entity_type?: string
          field_name?: string
          id?: string
          is_reverted?: boolean | null
          new_value?: string | null
          old_value?: string | null
          reverted_at?: string | null
          reverted_by?: string | null
        }
        Relationships: []
      }
      seo_global_settings: {
        Row: {
          created_at: string
          default_canonical_mode: string | null
          default_og_image: string | null
          default_robots: string | null
          description_template: string | null
          id: string
          robots_txt: string | null
          site_name: string
          sitemap_enabled: boolean | null
          sitemap_exclude_patterns: string[] | null
          title_template: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_canonical_mode?: string | null
          default_og_image?: string | null
          default_robots?: string | null
          description_template?: string | null
          id?: string
          robots_txt?: string | null
          site_name?: string
          sitemap_enabled?: boolean | null
          sitemap_exclude_patterns?: string[] | null
          title_template?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_canonical_mode?: string | null
          default_og_image?: string | null
          default_robots?: string | null
          description_template?: string | null
          id?: string
          robots_txt?: string | null
          site_name?: string
          sitemap_enabled?: boolean | null
          sitemap_exclude_patterns?: string[] | null
          title_template?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      seo_images: {
        Row: {
          alt_text: string | null
          created_at: string
          file_size: number | null
          format: string | null
          has_alt: boolean | null
          height: number | null
          id: string
          is_oversized: boolean | null
          page_id: string | null
          src: string
          updated_at: string
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_size?: number | null
          format?: string | null
          has_alt?: boolean | null
          height?: number | null
          id?: string
          is_oversized?: boolean | null
          page_id?: string | null
          src: string
          updated_at?: string
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_size?: number | null
          format?: string | null
          has_alt?: boolean | null
          height?: number | null
          id?: string
          is_oversized?: boolean | null
          page_id?: string | null
          src?: string
          updated_at?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "seo_images_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "seo_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_pages: {
        Row: {
          canonical_mode: string | null
          canonical_url: string | null
          created_at: string
          focus_keyword: string | null
          h1_text: string | null
          h2_outline: string[] | null
          id: string
          include_in_sitemap: boolean | null
          is_indexable: boolean | null
          last_audited_at: string | null
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          noarchive: boolean | null
          nosnippet: boolean | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          og_type: string | null
          robots_meta: string | null
          route: string
          schema_data: Json | null
          schema_types: string[] | null
          secondary_keywords: string[] | null
          seo_score: number | null
          template_type: string | null
          twitter_card: string | null
          twitter_image: string | null
          updated_at: string
          updated_by: string | null
          word_count: number | null
        }
        Insert: {
          canonical_mode?: string | null
          canonical_url?: string | null
          created_at?: string
          focus_keyword?: string | null
          h1_text?: string | null
          h2_outline?: string[] | null
          id?: string
          include_in_sitemap?: boolean | null
          is_indexable?: boolean | null
          last_audited_at?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          noarchive?: boolean | null
          nosnippet?: boolean | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          og_type?: string | null
          robots_meta?: string | null
          route: string
          schema_data?: Json | null
          schema_types?: string[] | null
          secondary_keywords?: string[] | null
          seo_score?: number | null
          template_type?: string | null
          twitter_card?: string | null
          twitter_image?: string | null
          updated_at?: string
          updated_by?: string | null
          word_count?: number | null
        }
        Update: {
          canonical_mode?: string | null
          canonical_url?: string | null
          created_at?: string
          focus_keyword?: string | null
          h1_text?: string | null
          h2_outline?: string[] | null
          id?: string
          include_in_sitemap?: boolean | null
          is_indexable?: boolean | null
          last_audited_at?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          noarchive?: boolean | null
          nosnippet?: boolean | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          og_type?: string | null
          robots_meta?: string | null
          route?: string
          schema_data?: Json | null
          schema_types?: string[] | null
          secondary_keywords?: string[] | null
          seo_score?: number | null
          template_type?: string | null
          twitter_card?: string | null
          twitter_image?: string | null
          updated_at?: string
          updated_by?: string | null
          word_count?: number | null
        }
        Relationships: []
      }
      seo_redirects: {
        Row: {
          created_at: string
          created_by: string | null
          hit_count: number | null
          id: string
          is_active: boolean | null
          last_hit_at: string | null
          notes: string | null
          redirect_type: number | null
          source_path: string
          target_path: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          hit_count?: number | null
          id?: string
          is_active?: boolean | null
          last_hit_at?: string | null
          notes?: string | null
          redirect_type?: number | null
          source_path: string
          target_path: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          hit_count?: number | null
          id?: string
          is_active?: boolean | null
          last_hit_at?: string | null
          notes?: string | null
          redirect_type?: number | null
          source_path?: string
          target_path?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          google_analytics_id: string | null
          id: string
          meta_pixel_id: string | null
          tiktok_pixel_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          google_analytics_id?: string | null
          id?: string
          meta_pixel_id?: string | null
          tiktok_pixel_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          google_analytics_id?: string | null
          id?: string
          meta_pixel_id?: string | null
          tiktok_pixel_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
