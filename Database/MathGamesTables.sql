create table User (
    id int NOT NULL AUTO_INCREMENT,
    username varchar(20) NOT NULL,
    email varchar(30) NOT NULL,
    password varchar(30) NOT NULL,
    avatar int,
    ranking int NOT NULL,
    unique (username),
    unique (email),
    PRIMARY KEY (id),
    check (ranking >= 0)
);

-- eventually create a stored procedure
create table Friends (
    friend1 int NOT NULL,
    friend2 int NOT NULL,
    primary KEY(friend1, friend2),
    foreign key(friend1) references User(id),
    foreign key(friend2) references User(id),
    check(friend1 != friend2)
);

create table Bans (
    user_id int NOT NULL,
    reason VARCHAR(200),
    primary key(user_id),
    foreign key(user_id) references User(id)
);

create table Comments (
    id int NOT NULL AUTO_INCREMENT,
    text varchar(250),
    rating int,
    poster int NOT NULL,
    receiver int NOT NULL,
    primary key(id),
    foreign key(poster) references User(id),
    foreign key(receiver) references User(id),
    check(rating IS NOT NULL OR text IS NOT NULL),
    check(rating IS NULL OR (rating>0 && rating<6))
);

create table Game (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(20),
    description varchar(250),
    age int,
    primary key(id),
    check (age>0)
);

create table GameMatch (
    id int NOT NULL AUTO_INCREMENT,
    player1 int NOT NULL,
    player2 int NOT NULL,
    winner int,
    number_moves int NOT NULL,
    game_type char NOT NULL,
    game_id int NOT NULL,
    actual_state VARCHAR(500),
    PRIMARY KEY(id),
    FOREIGN KEY(player1) references User(id),
    FOREIGN KEY(player2) references User(id),
    FOREIGN KEY(winner) references User(id),
    FOREIGN KEY(game_id) references Game(id),
    check (player1 != player2),
    check (winner IS NULL OR winner = player1 or winner = player2),
    check (number_moves>=0),
    check (game_type='C' OR game_type='R' OR game_type='T')
);

create table Tournament (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    max_users int NOT NULL,
    private boolean NOT NULL,
    password VARCHAR(30),
    game_id int NOT NULL,
    winner int,
    creator int NOT NULL,
    primary key(id),
    foreign key(game_id) references Game(id),
    foreign key(winner) references User(id),
    foreign key(creator) references User(id),
    check (max_users>2)
);

create table TournamentMatches(
    match_id int NOT NULL,
    tournament_id int NOT NULL,
    primary key(match_id, tournament_id),
    foreign key(match_id) references GameMatch(id),
    foreign key(tournament_id) references Tournament(id)
);

create table TournamentUsers(
    user_id int NOT NULL,
    tournament_id int NOT NULL,
    eliminated boolean NOT NULL,
    primary key(user_id, tournament_id),
    foreign key(user_id) references User(id),
    foreign key(tournament_id) references Tournament(id)
);

create table UserHasRank(
    user_id int NOT NULL,
    game_id int NOT NULL,
    ranking int NOT NULL,
    primary key(user_id, game_id),
    foreign key(user_id) references User(id),
    foreign key(game_id) references Game(id),
    check (ranking >= 0)
);
