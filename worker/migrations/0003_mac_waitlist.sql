create table mac_waitlist (
  email text primary key not null collate nocase,
  consent_version text not null,
  consented_at integer not null,
  removal_hash text not null unique
);
