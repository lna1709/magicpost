INSERT INTO account (account_id, username, password, name, email, phone, cccd, address, role, work_at, created_at, updated_at)
VALUES
    ('00000000-0000-0000-0000-000000000000', 'admin', '$2a$10$/Mt0c1.IuSGkS8m5.vw93emHkvmzTVfYpsFucJoiBpuXcorXRwQPy',
     'admin', 'dat@gmail.com', '0123456789', '123456789012', 'Hanoi', 'CEO', 2, '2020-01-01 00:00:00', '2020-01-01 00:00:00'),

    ('d6b166cb-6672-493c-9a89-8491a8410222', 'posthead1', '$2a$10$hhY6LcOuGE1XMusx7xENj.NQ1uB3mLdMaQMge8wP079ncUDj' ||
                                                          '.3c2S', 'dat',  'datposthead1@gmail.com', '0123456789',
     '123456789012', 'Hanoi', 'POST_HEAD', 1, '2020-01-01 00:00:00', '2020-01-01 00:00:00'),

    ('a5012d4c-3ade-4cd0-9cc1-de8fd375743a', 'employee1',
     '$2a$10$50FJqjLb82GoYV3U1FcnuO2k45GWRCixCzdmli5KbZuUi3uxp9z7e', 'dat employee1', 'datemployee1@gmail.com',
     '0123456789', '123456789012', 'Hanoi', 'EMPLOYEE', 1, '2020-01-01 00:00:00', '2020-01-01 00:00:00');
