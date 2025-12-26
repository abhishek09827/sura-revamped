-- Create blogs table if it doesn't exist
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

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Public read access (only published blogs)
CREATE POLICY "Allow public read on blogs" ON blogs FOR SELECT USING (status = 'Published');

-- Admin CRUD access (authenticated users)
CREATE POLICY "Allow authenticated insert on blogs" ON blogs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on blogs" ON blogs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete on blogs" ON blogs FOR DELETE TO authenticated USING (true);

-- Optional: Insert sample data
INSERT INTO blogs (slug, title, excerpt, content, author, image, date, read_time, status) VALUES
('beginner-fitness-tips', '5 Essential Tips for Beginners Starting a Fitness Journey', 'Learn the fundamentals that every beginner needs to know before starting their fitness journey.', '<h2>Start Strong with These Fundamentals</h2><p>Beginning a fitness journey can feel overwhelming. Here are five essential tips to help you succeed:</p><h3>1. Start Slow and Build Consistency</h3><p>Don''t jump into intense workouts immediately. Begin with manageable exercises and gradually increase intensity. Consistency matters more than intensity.</p><h3>2. Find an Activity You Enjoy</h3><p>You''re more likely to stick with something you enjoy. Whether it''s walking, dancing, swimming, or gym training, pick what makes you happy.</p><h3>3. Prioritize Recovery</h3><p>Rest days are when your body adapts and grows stronger. Aim for 7-9 hours of sleep and take at least 2 rest days per week.</p><h3>4. Focus on Nutrition</h3><p>You can''t out-exercise a poor diet. Eat whole foods, stay hydrated, and ensure adequate protein intake for muscle recovery.</p><h3>5. Set Realistic Goals</h3><p>Don''t expect instant results. Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) and celebrate small wins along the way.</p>', 'Sura Fitness Team', '/fitness-beginner-tips.jpg', '2025-01-15', '5 min read', 'Published'),
('nutrition-myths', 'Common Nutrition Myths Debunked', 'Separate fact from fiction and learn what actually works for sustainable weight loss and health.', '<h2>Separate Fact from Fiction in Nutrition</h2><p>The fitness world is full of myths that can derail your progress. Let''s debunk some common ones:</p><h3>Myth 1: Carbs Make You Fat</h3><p>Not all carbs are bad. Complex carbs are essential for energy and recovery. It''s about choosing whole grains, vegetables, and fruits.</p><h3>Myth 2: You Must Eat Small Frequent Meals</h3><p>There''s no magic number. What matters is total daily calories and macronutrient distribution, not meal frequency.</p><h3>Myth 3: Fat is Bad</h3><p>Healthy fats are crucial for hormonal balance and nutrient absorption. Include avocados, nuts, and fish in your diet.</p>', 'Sura Fitness Team', '/healthy-nutrition-food.jpg', '2025-01-10', '7 min read', 'Published'),
('home-workouts', 'Effective Home Workouts Without Equipment', 'Transform your body using just your bodyweight with these proven home workout routines.', '<h2>Transform Your Body at Home</h2><p>You don''t need a gym membership to get fit. Here are proven home workouts using just your bodyweight:</p><h3>Full Body Routine (3x per week)</h3><p>Warm up with 5 minutes of jumping jacks and stretching. Then perform 3 rounds of: Push-ups (10-15 reps), Bodyweight squats (15-20 reps), Plank hold (30-60 seconds), Lunges (10 per leg).</p><h3>Core Strengthening</h3><p>Include planks, side planks, mountain climbers, and leg raises 2-3 times per week for a strong core.</p>', 'Sura Fitness Team', '/home-workout-training.jpg', '2025-01-05', '6 min read', 'Published')
ON CONFLICT (slug) DO NOTHING;

