import { createClient } from '@supabase/supabase-js';

// Reemplaza estos valores con las credenciales reales de tu proyecto de Supabase
const supabaseUrl = 'https://glapnvvwjrumwgnccjqp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsYXBudnZ3anJ1bXdnbmNjanFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNjExNjQsImV4cCI6MjA5NDYzNzE2NH0.H-giX1xu7iGcYZdDbS3_1EdUkb7AN_fqkuGBE3dQOvQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);