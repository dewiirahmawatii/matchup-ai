import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bhmfjydguxqvvimayjtf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJobWZqeWRndXhxdnZpbWF5anRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMjM3ODcsImV4cCI6MjEwMTY5OTc4N30.utdpGwr6OEYpuRPUjirJF3oe0ISYQaH4kfrJIXzv9dI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
