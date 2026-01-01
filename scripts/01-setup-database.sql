-- Create tables for dynamic content
CREATE TABLE IF NOT EXISTS success_stories (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  stat TEXT NOT NULL,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS programs (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color_from TEXT NOT NULL,
  color_to TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transformations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  stats TEXT NOT NULL,
  before_image TEXT,
  after_image TEXT,
  duration TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS offers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  valid_till DATE,
  cta TEXT DEFAULT 'Claim Offer',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blogs (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  author TEXT DEFAULT 'Sura Fitness Team',
  image TEXT,
  date DATE DEFAULT CURRENT_DATE,
  read_time TEXT DEFAULT '5 min read',
  status TEXT DEFAULT 'Published',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dashboard_stats (
  id BIGINT PRIMARY KEY DEFAULT 1,
  total_leads INTEGER,
  active_clients INTEGER,
  blog_posts INTEGER,
  testimonials INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT dashboard_stats_single_row CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS homepage_banner_offer (
  id BIGINT PRIMARY KEY DEFAULT 1,
  title TEXT NOT NULL DEFAULT 'Limited Time Offer',
  description TEXT NOT NULL,
  cta_text TEXT DEFAULT 'Claim Offer',
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT homepage_banner_offer_single_row CHECK (id = 1)
);

-- Enable RLS
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE transformations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_banner_offer ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read on success_stories" ON success_stories FOR SELECT USING (true);
CREATE POLICY "Allow public read on programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Allow public read on transformations" ON transformations FOR SELECT USING (true);
CREATE POLICY "Allow public read on testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read on offers" ON offers FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read on blogs" ON blogs FOR SELECT USING (status = 'Published');

-- Admin CRUD access (authenticated users)
CREATE POLICY "Allow authenticated insert on transformations" ON transformations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on transformations" ON transformations FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on transformations" ON transformations FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on testimonials" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on testimonials" ON testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on testimonials" ON testimonials FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on offers" ON offers FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on offers" ON offers FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on offers" ON offers FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on blogs" ON blogs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on blogs" ON blogs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on blogs" ON blogs FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert on success_stories" ON success_stories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on success_stories" ON success_stories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on success_stories" ON success_stories FOR DELETE TO authenticated USING (true);

-- Public insert access for leads (form submissions)
CREATE POLICY "Allow public insert on leads" ON leads FOR INSERT WITH CHECK (true);
-- Admin read/update access for leads
CREATE POLICY "Allow authenticated read on leads" ON leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update on leads" ON leads FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on leads" ON leads FOR DELETE TO authenticated USING (true);

-- Dashboard stats access
CREATE POLICY "Allow public read on dashboard_stats" ON dashboard_stats FOR SELECT USING (true);
CREATE POLICY "Allow authenticated update on dashboard_stats" ON dashboard_stats FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert on dashboard_stats" ON dashboard_stats FOR INSERT TO authenticated WITH CHECK (true);

-- Homepage banner offer access
CREATE POLICY "Allow public read on homepage_banner_offer" ON homepage_banner_offer FOR SELECT USING (is_active = true);
CREATE POLICY "Allow authenticated read on homepage_banner_offer" ON homepage_banner_offer FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update on homepage_banner_offer" ON homepage_banner_offer FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert on homepage_banner_offer" ON homepage_banner_offer FOR INSERT TO authenticated WITH CHECK (true);

-- Seed data
INSERT INTO success_stories (stat, label, icon) VALUES
('500+', 'Happy Clients', '👥'),
('95%', 'Success Rate', '📈'),
('8+', 'Years Experience', '⭐');

INSERT INTO programs (title, description, icon, color_from, color_to) VALUES
('Personalized Training', 'Custom workout plans designed for your body, goals, and lifestyle.', '💪', 'primary', 'accent'),
('Nutrition Coaching', 'Sustainable eating habits tailored to Indian cuisine preferences.', '🥗', 'accent', 'primary'),
('Wellness Mentoring', 'Holistic approach covering stress management and mental health.', '🧘', 'primary', 'accent'),
('Digital Support', 'Track progress and stay connected with your coach anytime.', '📱', 'accent', 'primary');

INSERT INTO transformations (name, stats, before_image, after_image, duration) VALUES
('Priya', 'Lost 12kg', '/person-before-fitness-transformation.jpg', '/person-after-fitness-transformation.jpg', '3 months'),
('Rajesh', 'Gained Muscle Mass', '/man-before-fitness-journey.jpg', '/man-after-fitness-results.jpg', '4 months');

INSERT INTO testimonials (name, role, content, rating, avatar) VALUES
('Meera Sharma', 'Working Mom', 'I finally found a coach who understands busy life.', 5, '👩‍💼'),
('Amit Patel', 'IT Professional', 'After years of gym memberships, this personalized approach actually works.', 5, '👨‍💻');

INSERT INTO offers (title, description, details, valid_till, cta, is_active) VALUES
('New Member Welcome', 'Start your fitness journey with confidence', '30% off first month + free assessment', '2025-03-31', 'Claim Offer', true),
('Family Bundle', 'Get fit together with your loved ones', '2 members at 40% off + shared meal plan', '2025-03-31', 'Learn More', true),
('Corporate Wellness', 'Wellness programs for your team', 'Bulk discounts for 5+ employees', '2025-04-30', 'Get Quote', true),
('Referral Bonus', 'Earn rewards for bringing friends', '₹2000 credit for each successful referral', '2025-12-31', 'Refer Now', true),
('3-Month Commitment', 'Serious about transformation', '25% discount + priority coach access', '2025-03-31', 'Join Now', true),
('Annual Plan', 'Best value for committed members', '35% off annual rate + 2 free sessions', '2025-03-31', 'Subscribe', true);

-- Initialize dashboard stats with NULL values (will use actual counts as fallback)
INSERT INTO dashboard_stats (id, total_leads, active_clients, blog_posts, testimonials) VALUES
(1, NULL, NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- Initialize homepage banner offer
INSERT INTO homepage_banner_offer (id, title, description, cta_text, is_active) VALUES
(1, 'Limited Time Offer', 'Get 30% off your first month - No hidden charges, cancel anytime', 'Claim Offer', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO blogs (slug, title, excerpt, content, author, image, date, read_time, status) VALUES
('beginner-fitness-tips', '5 Essential Tips for Beginners Starting a Fitness Journey', 'Learn the fundamentals that every beginner needs to know before starting their fitness journey.', '<h2>Start Strong with These Fundamentals</h2><p>Beginning a fitness journey can feel overwhelming. Here are five essential tips to help you succeed:</p><h3>1. Start Slow and Build Consistency</h3><p>Don''t jump into intense workouts immediately. Begin with manageable exercises and gradually increase intensity. Consistency matters more than intensity.</p><h3>2. Find an Activity You Enjoy</h3><p>You''re more likely to stick with something you enjoy. Whether it''s walking, dancing, swimming, or gym training, pick what makes you happy.</p><h3>3. Prioritize Recovery</h3><p>Rest days are when your body adapts and grows stronger. Aim for 7-9 hours of sleep and take at least 2 rest days per week.</p><h3>4. Focus on Nutrition</h3><p>You can''t out-exercise a poor diet. Eat whole foods, stay hydrated, and ensure adequate protein intake for muscle recovery.</p><h3>5. Set Realistic Goals</h3><p>Don''t expect instant results. Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) and celebrate small wins along the way.</p>', 'Sura Fitness Team', '/fitness-beginner-tips.jpg', '2025-01-15', '5 min read', 'Published'),
('nutrition-myths', 'Common Nutrition Myths Debunked', 'Separate fact from fiction and learn what actually works for sustainable weight loss and health.', '<h2>Separate Fact from Fiction in Nutrition</h2><p>The fitness world is full of myths that can derail your progress. Let''s debunk some common ones:</p><h3>Myth 1: Carbs Make You Fat</h3><p>Not all carbs are bad. Complex carbs are essential for energy and recovery. It''s about choosing whole grains, vegetables, and fruits.</p><h3>Myth 2: You Must Eat Small Frequent Meals</h3><p>There''s no magic number. What matters is total daily calories and macronutrient distribution, not meal frequency.</p><h3>Myth 3: Fat is Bad</h3><p>Healthy fats are crucial for hormonal balance and nutrient absorption. Include avocados, nuts, and fish in your diet.</p>', 'Sura Fitness Team', '/healthy-nutrition-food.jpg', '2025-01-10', '7 min read', 'Published'),
('home-workouts', 'Effective Home Workouts Without Equipment', 'Transform your body using just your bodyweight with these proven home workout routines.', '<h2>Transform Your Body at Home</h2><p>You don''t need a gym membership to get fit. Here are proven home workouts using just your bodyweight:</p><h3>Full Body Routine (3x per week)</h3><p>Warm up with 5 minutes of jumping jacks and stretching. Then perform 3 rounds of: Push-ups (10-15 reps), Bodyweight squats (15-20 reps), Plank hold (30-60 seconds), Lunges (10 per leg).</p><h3>Core Strengthening</h3><p>Include planks, side planks, mountain climbers, and leg raises 2-3 times per week for a strong core.</p>', 'Sura Fitness Team', '/home-workout-training.jpg', '2025-01-05', '6 min read', 'Published');
