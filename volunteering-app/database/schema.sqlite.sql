-- Same entity-relationships as the mySQL branch


-- PART 1: Users & Profiles

CREATE TABLE IF NOT EXISTS Users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    date_created TEXT DEFAULT (CURRENT_DATE)
);

CREATE TABLE IF NOT EXISTS VolunteerProfiles (
    UserID INTEGER PRIMARY KEY,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE IF NOT EXISTS Organizations (
    OrganizationID INTEGER PRIMARY KEY AUTOINCREMENT,
    organization_name TEXT NOT NULL,
    organization_description TEXT,
    address TEXT NOT NULL,
    contact_email TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS OrganizationMembers (
    UserID INTEGER PRIMARY KEY,
    OrganizationID INTEGER NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID)
);


-- PART 2: Events

CREATE TABLE IF NOT EXISTS Categories (
    CategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Events (
    EventID INTEGER PRIMARY KEY AUTOINCREMENT,
    OrganizationID INTEGER NOT NULL,
    CategoryID INTEGER NOT NULL,
    event_title TEXT NOT NULL,
    event_description TEXT,
    location TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    max_capacity INTEGER,
    current_capacity INTEGER DEFAULT 0,
    FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE IF NOT EXISTS Applications (
    ApplicationID INTEGER PRIMARY KEY AUTOINCREMENT,
    EventID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    date_submitted TEXT DEFAULT (CURRENT_DATE),
    application_status TEXT DEFAULT 'submitted',
    FOREIGN KEY (EventID) REFERENCES Events(EventID),
    FOREIGN KEY (UserID) REFERENCES VolunteerProfiles(UserID),
    UNIQUE (EventID, UserID)
);

CREATE TABLE IF NOT EXISTS EventAttendance (
    AttendanceID INTEGER PRIMARY KEY AUTOINCREMENT,
    ApplicationID INTEGER NOT NULL UNIQUE,
    attendance_status TEXT DEFAULT 'registered',
    check_in_time TEXT NOT NULL,
    FOREIGN KEY (ApplicationID) REFERENCES Applications(ApplicationID)
);


-- PART 3: Conversations & Messaging

CREATE TABLE IF NOT EXISTS Conversations (
    ConversationID INTEGER PRIMARY KEY AUTOINCREMENT,
    ApplicationID INTEGER NOT NULL UNIQUE,
    date_started TEXT DEFAULT (CURRENT_DATE),
    FOREIGN KEY (ApplicationID) REFERENCES Applications(ApplicationID)
);

CREATE TABLE IF NOT EXISTS ConversationRecipients (
    ConversationID INTEGER NOT NULL,
    UserID INTEGER NOT NULL,
    PRIMARY KEY (ConversationID, UserID),
    FOREIGN KEY (ConversationID) REFERENCES Conversations(ConversationID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE IF NOT EXISTS Messages (
    MessageID INTEGER PRIMARY KEY AUTOINCREMENT,
    ConversationID INTEGER NOT NULL,
    SenderID INTEGER NOT NULL,
    message TEXT NOT NULL,
    sent_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ConversationID) REFERENCES Conversations(ConversationID),
    FOREIGN KEY (SenderID) REFERENCES Users(UserID)
);