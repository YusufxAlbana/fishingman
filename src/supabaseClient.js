import { createClient } from '@supabase/supabase-js';

// Access environment variables safely
// Note: Vite uses import.meta.env for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
    try {
        return new URL(url).protocol.startsWith('http');
    } catch (e) {
        return false;
    }
};

let client = null;

if (isValidUrl(supabaseUrl) && supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE') {
    client = createClient(supabaseUrl, supabaseAnonKey);
} else {
    console.warn('Supabase is not configured properly. App will run in Offline Mode.');
}

export const supabase = client;
