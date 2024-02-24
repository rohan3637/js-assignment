-- create tables
create table if not exists mydb.sports
(
    id int auto_increment not null primary key,
    name varchar(50) not null,
    status boolean not null default true,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp
);

create table if not exists mydb.tours
(
    id int auto_increment not null primary key,
    name varchar(50) not null,
    sportId int not null,
    status boolean not null default true,
    startTime timestamp not null,
    endTime timestamp not null,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    foreign key (sportId) references sports(id)
);

create table if not exists mydb.matches
(
    id int auto_increment not null primary key,
    name varchar(50) not null,
    tourId int not null,
    status boolean not null default true,
    format varchar(50) not null,
    startTime timestamp not null,
    endTime timestamp not null,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    foreign key (tourId) references tours(id)
);

CREATE TABLE IF NOT EXISTS mydb.news (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    matchId INT,
    tourId INT,
    FOREIGN KEY (matchId) REFERENCES matches(id),
    FOREIGN KEY (tourId) REFERENCES tours(id)
);

-- seed data
insert ignore into mydb.sports (id, name) values (1, 'Cricket');
insert ignore into mydb.sports (id, name) values (2, 'Football');

insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (1, 'Indian Premier League, 2023', 1, '2023-04-09 00:00:00', '2023-05-30 00:00:00');
insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (2, 'India Super League, 2023', 2, '2023-04-21 00:00:00', '2023-06-20 00:00:00');
insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (3, 'India Tour of West Indies, 2023', 1, '2023-06-10 00:00:00', '2023-06-29 00:00:00');
insert ignore into mydb.tours (id, name, sportId, startTime, endTime) values (4, 'English Premier League, 2022', 2, '2022-04-09 00:00:00', '2022-05-30 00:00:00');

insert ignore into mydb.matches (id, name, tourId, format, startTime, endTime) values (1, 'GT vs RCB', 1, 'T20', '2023-04-09 18:00:00', '2023-04-09 23:00:00');
insert ignore into mydb.matches (id, name, tourId, format, startTime, endTime) values (2, 'CSK vs MI', 1, 'T20', '2023-04-10 18:00:00', '2021-04-10 23:00:00');
insert ignore into mydb.matches (id, name, tourId, format, startTime, endTime) values (3, 'LSG vs KXIP', 1, 'T20', '2023-04-11 18:00:00', '2023-04-11 23:00:00');
insert ignore into mydb.matches (id, name, tourId, format, startTime, endTime) values (4, 'RR vs SRH', 1, 'T20', '2023-04-12 18:00:00', '2023-04-12 23:00:00');
insert ignore into mydb.matches (id, name, tourId, format, startTime, endTime) values (5, 'BLR vs BEN', 2, 'soccer', '2023-04-29 18:00:00', '2023-04-29 23:00:00');
insert ignore into mydb.matches (id, name, tourId, format, startTime, endTime) values (6, 'ATK vs MCFC', 2, 'soccer', '2023-04-21 18:00:00', '2023-04-21 23:00:00');
insert ignore into mydb.matches (id, name, tourId, format, startTime, endTime) values (7, 'KER vs JFC', 2, 'soccer', '2023-04-22 18:00:00', '2023-04-22 23:00:00');
insert ignore into mydb.matches (id, name, tourId, format, startTime, endTime) values (8, 'IND vs WI', 3, 'ODI', '2023-06-10 10:00:00', '2023-06-10 23:00:00');
insert ignore into mydb.matches (id, name, tourId, format, startTime, endTime) values (9, 'IND vs WI', 3, 'ODI', '2023-06-12 10:00:00', '2023-06-12 23:00:00');
insert ignore into mydb.matches (id, name, tourId, format, startTime, endTime) values (10, 'IND vs WI', 3, 'ODI', '2023-06-14 10:00:00', '2023-06-14 23:00:00');
insert ignore into mydb.matches (id, name, tourId, format, startTime, endTime) values (11, 'KER vs JFC', 4, 'soccer', '2022-04-09 18:00:00', '2022-04-09 23:00:00');

insert ignore into mydb.news (id, title, description, matchId, tourId) values (1, 'MI defeated CSK', 'MI defeated CSK in a thriller by 2 runs. Bumrah MOM.', 2, NULL);
insert ignore into mydb.news (id, title, description, matchId, tourId) values (2, 'RCB defeated GT', 'RCB defeated GT in a thriller by 2 wickets. Virat Kohli MOM.', 1, NULL);
insert ignore into mydb.news (id, title, description, matchId, tourId) values (3, 'IPL 2023 record viewership.', 'IPL 2023 broke all previous viewership record with 8cr concurrent viewers for final on FanCode.', NULL, 1);
insert ignore into mydb.news (id, title, description, matchId, tourId) values (4, 'MANCITY wins EPL 2023', 'MANCITY wins EPL 2023 with 3 matches still to go.', NULL, 4);
