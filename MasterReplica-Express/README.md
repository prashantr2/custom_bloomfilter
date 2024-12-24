# PostgreSQL Master-Replica Setup with Node.js

This project demonstrates a PostgreSQL master-replica setup using Docker Compose and a Node.js backend.

## Services

- **postgres_primary**: Primary PostgreSQL server with replication enabled, exposed on port 5433.
- **postgres_replica**: Replica PostgreSQL server, replicating from the primary server, exposed on port 5434.
- **backend**: Node.js backend server, exposed on port 3000.

## Network

All services are connected to a shared Docker network `my_network`.

## Configuration

### PostgreSQL Primary

- **Environment Variables**:
  - `POSTGRES_USER`: user
  - `POSTGRES_DB`: postgres
  - `POSTGRES_PASSWORD`: password
  - `POSTGRES_HOST_AUTH_METHOD`: scram-sha-256
  - `POSTGRES_INITDB_ARGS`: --auth-host=scram-sha-256

- **Command**:
  ```sh
  postgres -c wal_level=replica -c hot_standby=on -c max_wal_senders=10 -c max_replication_slots=10 -c hot_standby_feedback=on -c log_statement=all

- **PostgreSQL Replica**
    - `PGUSER`: replicator
    - `PGPASSWORD`: replicator_password
    
## Usage
**Start the service**
```sh 
docker-compose up --build
```

**Access the UI** (not so polished)
Visit [href:http://localhost:3000](http://localhost:3000)

**NOTE**
- Ensure all services are correctly connected to the network and that the primary PostgreSQL server is operational before starting the replica.
- Check the logs for any errors during the startup process.
- The 00_init.sql file is used to initialize the primary database.
