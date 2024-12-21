# PostgreSQL Seat Allocation Using Multi-Threading

This repository contains Python scripts that demonstrate how to allocate seats in a PostgreSQL database using multi-threading. Each script showcases a slightly different approach to handling concurrent access to the database during seat allocation.

## Overview

The core functionality includes:
- **Database Connection**: Establishes a connection to a PostgreSQL database using `psycopg2`.
- **Multi-Threading**: Spawns threads to allocate seats to users in parallel.
- **Seat Allocation Logic**: Updates a `seats` table to assign the first available seat to a user from the `users` table.
- **Visualization**: Outputs a graphical representation of the seat map after allocation.

### To seed the values in DB
> Create a Database and name it 'seatsdb'
```cat seed.sql | psql -U postgres -d seatsdb```

### Checkout
> Time taken in approach-4 < time taken in approach-3 (As we are not busy-waiting in approach-4)