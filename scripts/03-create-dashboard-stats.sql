-- Create dashboard_stats table
CREATE TABLE IF NOT EXISTS dashboard_stats (
  id BIGINT PRIMARY KEY DEFAULT 1,
  total_leads INTEGER,
  active_clients INTEGER,
  blog_posts INTEGER,
  testimonials INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT dashboard_stats_single_row CHECK (id = 1)
);

-- Enable RLS
ALTER TABLE dashboard_stats ENABLE ROW LEVEL SECURITY;

-- Dashboard stats access policies
CREATE POLICY "Allow public read on dashboard_stats" 
  ON dashboard_stats FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated update on dashboard_stats" 
  ON dashboard_stats FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated insert on dashboard_stats" 
  ON dashboard_stats FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Initialize dashboard stats with NULL values (will use actual counts as fallback)
INSERT INTO dashboard_stats (id, total_leads, active_clients, blog_posts, testimonials) 
VALUES (1, NULL, NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

