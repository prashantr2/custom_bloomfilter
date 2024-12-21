import psycopg2
import time
import threading

def connectToDB():
    db_config = {
        'dbname': 'seatsdb',
        'user': 'postgres',
        'password': 'postgres',
        'host': 'localhost', 
        'port': 5432          
    }
    connection = psycopg2.connect(**db_config)
    return connection

def fill_user_name_map(cursor, user_name_map):
    query = "SELECT * FROM users;"  
    cursor.execute(query)
    results = cursor.fetchall()
    total = len(results)
    for r in range(total):
        user_id, user_name = list(map(str, results[r]))
        user_name_map[user_id] = user_name
        
def print_user_seat_map(user_name_map, user_seat_map):
    seat_rows = "ABCDEFGHIJ"
    seat_map = [[0]*10 for i in range(6)]
    
    seat_map[1][2] = 1
    
    for user_id in user_seat_map.keys():
        seat_id = int(user_seat_map[user_id])
        c, r = (seat_id-1)//6, (seat_id-1)%6
        seat_no = f"{seat_rows[c]}-{r+1}"
        seat_map[r][c] = 1
        print(f"{user_name_map[user_id]} got seat no: {seat_no}")

    for r in range(len(seat_map)):
        if (r and r % 3 == 0): print()
        for c in range(len(seat_map[0])):
            if seat_map[r][c]:
                print('X', end=' ')
            else:
                print('.', end=' ')
        print()
    
def exec_query(user_id, user_seat_map):
    # SQL command to UPDATE the seats table per thread
    connection = connectToDB()
    cursor = connection.cursor()

    select_query = "SELECT id FROM seats where user_id IS NULL \
                    ORDER BY id LIMIT 1 FOR UPDATE"                         # Here is the change we will do
    cursor.execute(select_query)
    res = cursor.fetchone()
    seat_id = res[0]
    
    update_query = f"UPDATE seats SET user_id={user_id} \
                     WHERE id={seat_id}"    
    user_seat_map[user_id] = seat_id
    cursor.execute(update_query)
    connection.commit()
    connection.close()

try:
    # Connect to PostgresQL
    start_time = time.time()
    connection = connectToDB()
    connection.autocommit = True
    cursor = connection.cursor()

    user_name_map = {}
    fill_user_name_map(cursor, user_name_map)

    # Parallel threads
    user_seat_map = {}
    jobs = []
    for user_id in user_name_map.keys():
        job = threading.Thread(target=exec_query, args=(user_id, user_seat_map))
        jobs.append(job)
        job.start()

    for job in jobs:
        job.join()

    
    # Printing result
    print_user_seat_map(user_name_map, user_seat_map)

    # Taking DB to original state
    update_query = f"UPDATE seats SET user_id = NULL;"
    cursor.execute(update_query)
    end_time = time.time()
    print(f"Total time taken: {end_time - start_time}")

except psycopg2.Error as err:
    print(f"Error: {err}")
finally:
    # Close the connection
    if 'connection' in locals():
        connection.close()