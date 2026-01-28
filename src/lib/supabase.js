import { createClient } from '@supabase/supabase-js';

// Hardcoded keys as per user previous setup
const SUPABASE_URL = 'https://ycwwjbojhxfwktbnkgqq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inljd3dqYm9qaHhmd2t0Ym5rZ3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNzkwMjgsImV4cCI6MjA4NDk1NTAyOH0.K2DOUkCN1e62PuR1aIUucBeYBvAUEbSBPdErNqK5-I8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
