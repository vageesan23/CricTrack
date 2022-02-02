import pymysql
 
#Configuration Values
endpoint = 'cricket4you.cttnapb9ysdy.us-east-1.rds.amazonaws.com'
username = 'admin'
password = 'admin123'
database_name = 'cricket4u'
 
#Connection
connection = pymysql.connect(host=endpoint, user=username,
	passwd=password, db=database_name)
 
def handler():
	item_count = 0
	cursor = connection.cursor()
	# cursor.execute('create table User ( userID  int NOT NULL, username varchar(255) NOT NULL, PRIMARY KEY (userID))')
	# cursor.execute('insert into User (userID, username) values(1, "narthi98")')
	# cursor.execute('insert into User (userID, username) values(4, "maddy98")')

	cursor.execute('select * from User')
	users = cursor.fetchall()
	for user in users:
		print(user)

	connection.commit()
handler()
