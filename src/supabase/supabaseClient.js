import {createClient} from "@supabase/supabase-js";
import { Database } from "./supabase/supabaseTypes";

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient<Database>(URL, KEY);

export default supabase;