### Comparison between latency in getting data from database (here MySQL) and cache (here Redis)

How to setup:<br>
Install redis and make sure it's working<br>
Install mysql:<br>
* add 'dbuser' with pass 'dbpass'<br>
* add DB 'mydb'<br>
* create table 'keyValue' in 'mydb' with following schema<br>
<pre>
+-----------+--------------+------+-----+---------+-------+<br>
| Field     | Type         | Null | Key | Default | Extra |<br>
+-----------+--------------+------+-----+---------+-------+<br>
| somekey   | varchar(200) | NO   | PRI | NULL    |       |<br>
| somevalue | longtext     | YES  |     | NULL    |       |<br>
+-----------+--------------+------+-----+---------+-------+<br>
</pre>
run `npm install`<br>
run `node server.js`<br>
setup a `.env` file with these entries: 
* PORT={port_number_for_server}
* API_ENDPOINT={some_api_endpoint_giving_large_data} 

Try to hit `http://localhost:3000/mysql` and `http://localhost:3000/redis` to see the time taken in each req. in console