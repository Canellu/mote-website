-- Why people left the Mac waitlist. Deliberately holds no email or token.
create table mac_unsubscribe_reasons (
  id integer primary key,
  created_at integer not null,
  reasons text not null
);
