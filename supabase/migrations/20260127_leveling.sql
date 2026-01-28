-- Migration to add Leveling System columns

alter table profiles 
add column level int default 1,
add column xp int default 0,
add column max_hooks int default 10;

-- Existing columns assumed: money (int), inventory (jsonb), owned_rods (text[]), equipped_rod_id (text)
