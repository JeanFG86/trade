drop schema if exists trade cascade;
create schema trade;

create table trade.account (
    account_id uuid primary key,
    name text,
    email text,
    document text,
    password text
);