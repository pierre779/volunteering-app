-- Docker creates the database & configurations,
-- & so we do not have to create or drop each time


-- PART 1: Users & Profiles

CREATE TABLE Users (
	UserID INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	user_password VARCHAR(255) NOT NULL,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	date_created DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE VolunteerProfiles (
    UserID INT PRIMARY KEY,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Organizations (
	OrganizationID INT AUTO_INCREMENT PRIMARY KEY,
    organization_name VARCHAR(100) NOT NULL,
    organization_description TEXT,
    address VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE OrganizationMembers (
    UserID INT PRIMARY KEY,
    OrganizationID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users (UserID),
    FOREIGN KEY (OrganizationID) REFERENCES Organizations (OrganizationID)
);

-- Part 2: Events

CREATE TABLE Categories (
	CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Events (
	EventID INT AUTO_INCREMENT PRIMARY KEY,
    OrganizationID INT NOT NULL,
    CategoryID INT NOT NULL,
    event_title VARCHAR(100) NOT NULL,
    event_description TEXT,
    location VARCHAR(255) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    max_capacity INT,
    current_capacity INT DEFAULT (0),
    FOREIGN KEY (OrganizationID) REFERENCES Organizations (OrganizationID),
    FOREIGN KEY (CategoryID) REFERENCES Categories (CategoryID)
);

CREATE TABLE Applications (
	ApplicationID INT AUTO_INCREMENT PRIMARY KEY,
    EventID INT NOT NULL,
    UserID INT NOT NULL,
    date_submitted DATE DEFAULT (CURRENT_DATE),
    application_status VARCHAR(100) DEFAULT ('submitted'),
    FOREIGN KEY (EventID) REFERENCES Events (EventID),
    FOREIGN KEY (UserID) REFERENCES VolunteerProfiles (UserID)
);

CREATE TABLE EventAttendance (
	AttendanceID INT AUTO_INCREMENT PRIMARY KEY,
    ApplicationID INT NOT NULL,
    attendance_status VARCHAR(100) DEFAULT ('registered'),
    check_in_time DATETIME NOT NULL,
    FOREIGN KEY (ApplicationID) REFERENCES Applications (ApplicationID)
);

-- Part 3: Conversations & Messaging

CREATE TABLE Conversations (
	ConversationID INT AUTO_INCREMENT PRIMARY KEY,
    ApplicationID INT NOT NULL,
    date_started DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (ApplicationID) REFERENCES Applications (ApplicationID)
);

CREATE TABLE ConversationRecipients (
	ConversationID INT NOT NULL,
    UserID INT NOT NULL,
    FOREIGN KEY (ConversationID) REFERENCES Conversations (ConversationID),
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
);

CREATE TABLE Messages (
	MessageID INT AUTO_INCREMENT PRIMARY KEY,
    ConversationID INT NOT NULL,
    SenderID INT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    FOREIGN KEY (ConversationID) REFERENCES Conversations (ConversationID),
    FOREIGN KEY (SenderID) REFERENCES Users (UserID)
);

-- Test Queries / Sample Inserts:

INSERT INTO Users (email, user_password, first_name, last_name) VALUES
	('helloworld@gmail.com', 'hw123', 'hello', 'world'),
	('goodbye@aol.com', 'gb098', 'good', 'bye');
    
INSERT INTO Organizations (organization_name, organization_description, address, contact_email) VALUES
	('BigData', 'We in the database now', '10 DB ln', 'bigcompany@gmail.com'),
    ('CrankleCorp', ':)', 'right over there', 'cco@gmail.com');

INSERT INTO VolunteerProfiles (UserID) VALUES
	(1),
	(2);
    
INSERT INTO OrganizationMembers (UserID, OrganizationID) VALUES
	(2, 1);


INSERT INTO Categories (category_name) VALUES
	('Health Care'),
    ('Community Service'),
    ('Conservation'),
    ('Education');
    
INSERT INTO Events (OrganizationID, CategoryID, event_title, location, start_time, end_time) VALUES
	(1, 2, 'Soup Kitchen', '23 sillyguy rd', '2026-12-12 09:00:00', '2026-12-12 16:00:00'),
    (2, 1, 'Blood Drive', 'the closest vampire', '2026-12-12 09:00:00', '2026-12-12 16:00:00'),
    (1, 3, 'Beach Clean-up', 'the ocean', '2026-12-12 09:00:00', '2026-12-12 16:00:00');

INSERT INTO Applications (EventID, UserID) VALUES
	(3, 1),
    (1, 1);
    
INSERT INTO EventAttendance (ApplicationID, check_in_time) VALUES
	(1, '2026-12-12 09:00:00');
    
INSERT INTO Conversations (ApplicationID) VALUES
	(1);
    
INSERT INTO ConversationRecipients (ConversationID, UserID) VALUES
	(1, 1),
    (1, 2);
    
INSERT INTO Messages (ConversationID, SenderID, message) VALUES
	(1, 1, 'goodbye, world');