drop schema if exists trade cascade;
create schema trade;

create table trade.account (
    account_id uuid primary key,
    name text,
    email text,
    document text,
    password text
);

create table trade.account_asset (
    account_id uuid,
    asset_id uuid,
    quantity decimal,
    primary key (account_id, asset_id)
);
