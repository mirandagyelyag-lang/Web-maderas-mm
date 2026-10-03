import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vwyudrmxatuukcbncats.supabase.co";
const supabaseKey = "sb_publishable_vpnoAb2BAu1aOKqeWhMFyQ_2dbLHsb4";

export const supabase = createClient(supabaseUrl, supabaseKey);
