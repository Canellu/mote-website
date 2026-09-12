-- Private feedback reports submitted from Mote Desktop.
--
-- Nothing in this table is ever rendered publicly. The public roadmap, when it
-- ships, gets its own tables and must never be joined to this one — see
-- mote-desktop/docs/feedback-and-roadmap-delivery-plan.md.

create table if not exists feedback (
  id                 text primary key,           -- f_<timestamp><random>, quoted back to the reporter
  category           text not null,              -- bug | feature | general
  message            text not null,              -- after redaction, <= 4000 chars
  contact_email      text,                       -- null unless the reporter asked for a reply
  contact_preference text not null default 'none', -- none | reply | updates
  app_version        text,
  platform           text,
  release_channel    text,
  source             text not null,              -- app | web
  status             text not null default 'new',-- new | triaged | resolved
  created_at         integer not null,           -- unix seconds
  updated_at         integer not null,
  email_purge_after  integer                     -- unix seconds; the retention cron clears the email at this point
);

create index if not exists feedback_created_at on feedback (created_at desc);
create index if not exists feedback_status on feedback (status);
create index if not exists feedback_email_purge on feedback (email_purge_after)
  where contact_email is not null;
