create database classscore;
use classscore;
create table scores (
	name	char(32)	 not null primary key,
	No		char(32)  	character set utf8,
	kind		char(3)  character set utf8,
	kid 	int(3),
	adult		int(3)  character set utf8,
	etc		int(3),
	sum		int(3)
);
describe scores;
