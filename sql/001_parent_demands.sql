CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS parent_demands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale TEXT NOT NULL CHECK (locale IN ('fr', 'en')),
  city_or_postal TEXT NOT NULL,
  age_range TEXT NOT NULL CHECK (age_range IN ('0-18', '18-36', '3-5', '5+')),
  childcare_type TEXT NULL,
  desired_start_date DATE NULL,
  source TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_parent_demands_created_at ON parent_demands (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_parent_demands_location ON parent_demands (city_or_postal);
CREATE INDEX IF NOT EXISTS idx_parent_demands_status ON parent_demands (status);
