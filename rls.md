ART 8 — Row Level Security (RLS) policy guide
This is based on the real schema you shared (public.users, decks, flashcards, user_flashcard_statuses, reviews, study_sessions, rooms, room_memberships, room_decks).

Core mental model: GRANTs decide whether a Postgres role (anon, authenticated) can touch a table at all; RLS policies decide which rows it can see/touch once RLS is enabled. Supabase-created tables usually already have the right grants — if these tables were created by hand, double check with \dp public.decks or the Table Editor's policy tab. With RLS enabled and zero matching policies, every row is denied by default — that default-deny is exactly what closes the pullDecks/downloadDeckContent leak from Part 4.

⚠️ Assumption to verify first: every policy below assumes public.users.id is set to the Supabase Auth UID as text, i.e. auth.uid()::text = users.id. Confirm with select id from public.users limit 5; compared against a real auth.uid() value — if your custom auth doesn't actually populate it that way, the join condition needs to change.

Rollout order to avoid locking yourself out: enable + test on reviews and study_sessions first (simplest, lowest blast radius), then user_flashcard_statuses, then decks/flashcards (test as both an anonymous/anon-key request and as a logged-in user), then the rooms family last.

8.1 users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own" ON public.users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE USING (auth.uid()::text = id) WITH CHECK (auth.uid()::text = id);

-- Only needed if the client itself creates the row (vs. a server-side trigger on signup)
CREATE POLICY "users_insert_own" ON public.users
  FOR INSERT WITH CHECK (auth.uid()::text = id);

-- No DELETE policy → deletes denied by default.
⚠️ Important gap a row policy can't close on its own: users_update_own lets a user update their own row — including flipping is_admin or is_premium to true themselves, since RLS protects rows, not individual columns. Close that with a column-level revoke:

REVOKE UPDATE (is_admin, is_premium, role) ON public.users FROM authenticated;
-- Grant those columns only to a privileged role you control server-side, e.g. service_role or a custom admin role.
8.2 decks
ALTER TABLE public.decks ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon/unauthenticated) can read public decks; owners can also read their own private/draft ones
CREATE POLICY "decks_select_public_or_own" ON public.decks
  FOR SELECT USING (is_public = true OR user_id = auth.uid()::text);

CREATE POLICY "decks_insert_own" ON public.decks
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "decks_update_own" ON public.decks
  FOR UPDATE USING (user_id = auth.uid()::text) WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "decks_delete_own" ON public.decks
  FOR DELETE USING (user_id = auth.uid()::text);
8.3 flashcards — this is the one that fixes the IDOR
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

-- Visible if the parent deck is public AND the card is published, OR you own the parent deck (so you can see your own drafts)
CREATE POLICY "flashcards_select_visible" ON public.flashcards
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.decks d
      WHERE d.id = flashcards.deck_id
        AND ((d.is_public = true AND flashcards.status = 'published') OR d.user_id = auth.uid()::text)
    )
  );

CREATE POLICY "flashcards_insert_own_deck" ON public.flashcards
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.decks d WHERE d.id = flashcards.deck_id AND d.user_id = auth.uid()::text)
  );

CREATE POLICY "flashcards_update_own_deck" ON public.flashcards
  FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.decks d WHERE d.id = flashcards.deck_id AND d.user_id = auth.uid()::text))
  WITH CHECK (EXISTS (SELECT 1 FROM public.decks d WHERE d.id = flashcards.deck_id AND d.user_id = auth.uid()::text));

CREATE POLICY "flashcards_delete_own_deck" ON public.flashcards
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.decks d WHERE d.id = flashcards.deck_id AND d.user_id = auth.uid()::text)
  );
With this in place, downloadDeckContent(privateDeckId) from a non-owner returns zero rows at the database level — no matter what the client-side JS does or doesn't check.

8.4 user_flashcard_statuses — closes the "forged userId" risk
ALTER TABLE public.user_flashcard_statuses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ufs_select_own" ON public.user_flashcard_statuses
  FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "ufs_insert_own" ON public.user_flashcard_statuses
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "ufs_update_own" ON public.user_flashcard_statuses
  FOR UPDATE USING (user_id = auth.uid()::text) WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "ufs_delete_own" ON public.user_flashcard_statuses
  FOR DELETE USING (user_id = auth.uid()::text);
8.5 reviews — treat as an immutable log
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviews_select_own" ON public.reviews
  FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "reviews_insert_own" ON public.reviews
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- Deliberately no UPDATE/DELETE policy — review history shouldn't be editable by clients.
8.6 study_sessions
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sessions_select_own" ON public.study_sessions
  FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "sessions_insert_own" ON public.study_sessions
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "sessions_update_own" ON public.study_sessions
  FOR UPDATE USING (user_id = auth.uid()::text) WITH CHECK (user_id = auth.uid()::text);
8.7 rooms, room_memberships, room_decks
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.room_decks ENABLE ROW LEVEL SECURITY;

-- Members and the creator can read a room
CREATE POLICY "rooms_select_member" ON public.rooms
  FOR SELECT USING (
    created_by = auth.uid()::text
    OR EXISTS (SELECT 1 FROM public.room_memberships m WHERE m.room_id = rooms.id AND m.user_id = auth.uid()::text)
  );

CREATE POLICY "rooms_insert_self" ON public.rooms
  FOR INSERT WITH CHECK (created_by = auth.uid()::text);

CREATE POLICY "rooms_update_creator" ON public.rooms
  FOR UPDATE USING (created_by = auth.uid()::text) WITH CHECK (created_by = auth.uid()::text);

CREATE POLICY "rooms_delete_creator" ON public.rooms
  FOR DELETE USING (created_by = auth.uid()::text);

-- See your own membership, or any membership in a room you also belong to (so you can see classmates)
CREATE POLICY "memberships_select" ON public.room_memberships
  FOR SELECT USING (
    user_id = auth.uid()::text
    OR EXISTS (SELECT 1 FROM public.room_memberships m2 WHERE m2.room_id = room_memberships.room_id AND m2.user_id = auth.uid()::text)
  );

-- Join a room = insert your own membership row
CREATE POLICY "memberships_insert_self" ON public.room_memberships
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- Leave a room yourself, or be removed by the room's creator
CREATE POLICY "memberships_delete" ON public.room_memberships
  FOR DELETE USING (
    user_id = auth.uid()::text
    OR EXISTS (SELECT 1 FROM public.rooms r WHERE r.id = room_memberships.room_id AND r.created_by = auth.uid()::text)
  );

-- Decks attached to a room are visible to members/creator; only the creator attaches/detaches them
CREATE POLICY "room_decks_select_member" ON public.room_decks
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.room_memberships m WHERE m.room_id = room_decks.room_id AND m.user_id = auth.uid()::text)
    OR EXISTS (SELECT 1 FROM public.rooms r WHERE r.id = room_decks.room_id AND r.created_by = auth.uid()::text)
  );

CREATE POLICY "room_decks_insert_creator" ON public.room_decks
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.rooms r WHERE r.id = room_decks.room_id AND r.created_by = auth.uid()::text));

CREATE POLICY "room_decks_delete_creator" ON public.room_decks
  FOR DELETE USING (EXISTS (SELECT 1 FROM public.rooms r WHERE r.id = room_decks.room_id AND r.created_by = auth.uid()::text));
Gotcha: rooms_select_member means a non-member can't SELECT a room to discover it — which breaks a "join by room code" flow, since the client needs to look the room up before it can join. Don't widen the SELECT policy to "anyone can read any room" just to make that work (that re-leaks room metadata to non-members). Instead, write a SECURITY DEFINER Postgres function that looks up the room by code (bypassing RLS internally, safely, since you control exactly what it does), validates, and inserts the membership row — call it from the client via supabase.rpc('join_room_by_code', { code }).