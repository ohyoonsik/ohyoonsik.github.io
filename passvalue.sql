create database passvalue;
use passvalue;
create table passvalue (
	
	name		char(32)	 not null primary key,
	kind		char(32)  	character set utf8,
	chil		int(3),
	adult	 	int(3),
	etc			int(3),
	pass		int(3),
	big3		int(3),
	free		int(3),
	yearpass	int(3)	
);
describe passvalue;
