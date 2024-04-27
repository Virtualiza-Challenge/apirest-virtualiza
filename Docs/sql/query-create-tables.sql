USE virtualizadb;

CREATE table drivers(
	id 				int 		NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name			varchar(40) NOT NULL, 
    surname			varchar(40) NOT NULL,
    dni 			varchar(9)  NOT NULL,
    license	 		varchar(40) NOT NULL,
    license_type	enum('Pofessional', 'Personal') DEFAULT('Professional'),
    emision_date	datetime 	NOT NULL,
    able_to_drive   bool		DEFAULT(true)
);

CREATE table vehicles(
	id 				int 		NOT NULL AUTO_INCREMENT PRIMARY KEY,
    plate			varchar(10) NOT NULL, 
    brand			varchar(20) NOT NULL,
    model 			varchar(20) NOT NULL,
    year	 		int 		NOT NULL,
    kms				int 		NOT NULL,
    is_available    bool		DEFAULT(true)
);

CREATE table trips(
	id 				int 		NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date			datetime 	NOT NULL, 
    hour	 		int 		NOT NULL,
    minutes			int 		NOT NULL,
    kms				int 		NOT NULL,
    driver_id		int 		NOT NULL,
    vehicle_id		int 		NOT NULL,
    
    FOREIGN KEY (driver_id)  REFERENCES drivers(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);
