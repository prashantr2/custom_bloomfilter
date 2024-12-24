CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD 'replicator_password';
SELECT pg_create_physical_replication_slot('replication_slot');
CREATE DATABASE mydb; 
\c mydb;
CREATE TABLE keyval (key int, val int);
GRANT SELECT ON ALL TABLES IN SCHEMA public TO replicator;