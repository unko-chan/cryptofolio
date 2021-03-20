DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS currency_balance CASCADE;

DROP TABLE IF EXISTS transactions CASCADE;

DROP TABLE IF EXISTS rebalance_settings CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  total_ownings INTEGER,
  email VARCHAR(255)
);

CREATE TABLE currency_balance (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  currency_symbol VARCHAR(5),
  balance INTEGER
);

CREATE TABLE rebalance_settings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  currency_symbol VARCHAR(5),
  allocation_percent INTEGER
);


CREATE TABLE transactions (
  id SERIAL PRIMARY KEY NOT NULL,
  date_occured DATE,
  transaction_type VARCHAR(255),
  amount FLOAT,
  transaction_fee FLOAT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  currency_symbol VARCHAR(5)

);

insert into users (id, first_name, username, total_ownings, email) values 
(1, 'Wilt', 'nwiltshear0', 5, 'catoyo1781@heroulo.com'),
(2, 'Russo', 'drusso1', 10, 'catoyo2781@heroulo.com'),
(3, 'McMyler', 'bmcmyler2', 15, 'catoyo3781@heroulo.com'),
(4, 'Phillimore', 'ephillimore3', 43, 'catoyo4781@heroulo.com'),
(5, 'Wittock', 'kwhittock4', 12, 'catoyo5781@heroulo.com');

INSERT INTO currency_balance (id, user_id, currency_symbol, balance) values 
( 1, 1, 'BTC', 1),
( 2, 1, 'LTC', 1),
( 3, 1, 'NEO', 34),
( 4, 1, 'XRP', 12),
( 5, 1, 'BCH', 6),
( 6, 1, 'ETH', 2),
( 7, 2, 'ETH', 5),
( 8, 2, 'BTC', 1),
( 9, 2, 'TRX', 5),
( 10, 2, 'DOGE', 44),
( 11, 2, 'LTC', 55),
( 12, 3, 'BTC', 10),
( 13, 3, 'LTC', 10),
( 14, 3, 'DOGE', 10),
( 15, 3, 'ETH', 10);

INSERT INTO transactions (id, date_occured, transaction_type, amount, transaction_fee, user_id, currency_symbol) values
( 1, '2021-03-15', 'Sent', 0.02, 5, 1, 'BTC'),
( 2, '2021-03-12', 'Bought', 0.0012, 5, 1, 'ETH'),
( 3, '2021-03-07', 'Bought', 0.00300000, 5, 1, 'LTC'),
( 4, '2021-03-05', 'Sent', 500, 5, 1, 'DOGE'),
( 5, '2021-03-04', 'Sent', 0.00500000, 5, 1, 'BTC'),
( 6, '2021-02-28', 'Bought', 0.00300000, 5, 1, 'LTC'),
( 7, '2021-02-25', 'Bought', 100, 5, 1, 'DOGE'),
( 8, '2021-02-14', 'Bought', 3, 5, 1, 'NEO'),
( 9, '2021-02-08', 'Sent', 0.00600000, 5, 1, 'ETH'),
( 10, '2021-02-02', 'Sent', 2, 5, 1, 'BTC');
