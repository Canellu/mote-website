create table mac_waitlist (
  email text primary key not null collate nocase,
  consent_version text not null,
  consented_at integer not null,
  -- Kept as issued rather than hashed: every later email to this person
  -- carries it in their unsubscribe link.
  unsubscribe_token text not null unique
);
