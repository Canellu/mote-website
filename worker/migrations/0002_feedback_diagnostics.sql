-- Diagnostics a reporter chose to attach: what Mote tried and how it ended.
--
-- Validated as codes and numbers only (see worker/src/validate.ts), so no Hue
-- name, address, or id can be stored here. `diagnostics_code` duplicates the
-- JSON's code so reports can be grouped by failure without parsing.

alter table feedback add column diagnostics text;
alter table feedback add column diagnostics_code text;

create index if not exists feedback_diagnostics_code on feedback (diagnostics_code)
  where diagnostics_code is not null;
