drop shema if exists trade;
create shema trade;

create table account (
    account_id uuid primary key,
    name text,
    email text,
    document text,
    password text
);