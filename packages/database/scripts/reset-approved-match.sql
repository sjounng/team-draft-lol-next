-- Reset approved match and clear global champion stats

-- 1. Find the approved game
-- SELECT game_id, status, is_applied FROM game_records WHERE is_applied = true;

-- 2. Reset the game record status
UPDATE game_records
SET status = 'DRAFT_COMPLETE',
    is_applied = false
WHERE is_applied = true;

-- 3. Reset user game records (clear adjusted scores)
UPDATE user_game_records
SET adjusted_score = 0
WHERE game_id IN (
  SELECT game_id FROM game_records WHERE status = 'DRAFT_COMPLETE'
);

-- 4. Clear all global champion stats
DELETE FROM global_champion_stats;

-- 5. Verify
SELECT 'Game Records' as table_name, COUNT(*) as count FROM game_records WHERE is_applied = true
UNION ALL
SELECT 'Global Champion Stats', COUNT(*) FROM global_champion_stats;
