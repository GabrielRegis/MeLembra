export const version = 'CREATE TABLE IF NOT EXISTS version(version_id INTEGER PRIMARY KEY NOT NULL); ';
export const pragmaOn = `PRAGMA foreign_keys = ON`;
export const pragmaOff = `PRAGMA foreign_keys = OFF`;
export const createTableUser: string = `
    CREATE TABLE IF NOT EXISTS user (
        id varchar(36) NOT NULL,
        login varchar(50) NOT NULL,
        first_name varchar(50) DEFAULT NULL,
        last_name varchar(50) DEFAULT NULL,
        email varchar(100) DEFAULT NULL,
        image_url varchar(256) DEFAULT NULL,
        lang_key varchar(5) DEFAULT NULL,
        zoned_id varchar(255) DEFAULT NULL,
        PRIMARY KEY (id),
        CONSTRAINT login UNIQUE (login),
        CONSTRAINT email UNIQUE (email)
    )
`;
export const createTableUserAuthority: string = `
    CREATE TABLE IF NOT EXISTS user_authority (
        user_id varchar(36) NOT NULL,
        authority_name varchar(50) NOT NULL,
        PRIMARY KEY (user_id,authority_name),
        CONSTRAINT fk_authority_name UNIQUE (authority_name),
        FOREIGN KEY (authority_name) REFERENCES authority (name),
        FOREIGN KEY (user_id) REFERENCES user (id)
    ) 
`;

export const createTableCarver: string = `
    CREATE TABLE IF NOT EXISTS carver (
        id varchar(36) NOT NULL,
        name varchar(255) NOT NULL,
        created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        last_modified_date timestamp NULL DEFAULT NULL,
        PRIMARY KEY (id)
    );
`;

export const createTableChassi: string = `
    CREATE TABLE IF NOT EXISTS chassi (
        id varchar(36) NOT NULL,
        chassi_number integer NOT NULL,
        created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        last_modified_date timestamp NULL DEFAULT NULL,
        PRIMARY KEY (id)
    );
`;

export const createTableFollowUp: string = `
    CREATE TABLE IF NOT EXISTS follow_up (
        id varchar(36) NOT NULL,
        pdi_date date,
        observation varchar(255) DEFAULT NULL,
        created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        last_modified_date timestamp NULL DEFAULT NULL,
        PRIMARY KEY (id)
    );
`;

export const createTableVehicleDefect: string = `
    CREATE TABLE IF NOT EXISTS vehicle_defect (
        id varchar(36) NOT NULL,
        name varchar(255) NOT NULL,
        code integer DEFAULT NULL,
        created_by varchar(50) NOT NULL,
        created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        last_modified_by varchar(50) DEFAULT NULL,
        last_modified_date timestamp NULL DEFAULT NULL,
        PRIMARY KEY (id)
    );
`;

export const createTableFormGroup: string = `
    CREATE TABLE IF NOT EXISTS form_group (
        id varchar(36) NOT NULL,
        title varchar(255) NOT NULL,
        created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        last_modified_date timestamp NULL DEFAULT NULL,
        archived boolean DEFAULT NULL,
        PRIMARY KEY (id)
    );
`;

export const createTableVehicleObject: string = `
    CREATE TABLE IF NOT EXISTS vehicle_object (
        id varchar(36) NOT NULL,
        name varchar(255) NOT NULL,
        code integer DEFAULT NULL,
        created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        last_modified_date timestamp NULL DEFAULT NULL,
        PRIMARY KEY (id)
    );
  
`;

export const createTableFollowUpUser: string = `
    CREATE TABLE IF NOT EXISTS follow_up_user (
        id varchar(36) NOT NULL,
        name varchar(255) DEFAULT NULL,
        created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        last_modified_date timestamp NULL DEFAULT NULL,
        user_id varchar(255) DEFAULT NULL,
        carver_id varchar(255) DEFAULT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES user (id),
        FOREIGN KEY (carver_id) REFERENCES carver (id)
    )`;
export const createTableQuestion: string = `
    CREATE TABLE IF NOT EXISTS question (
        id varchar(36) NOT NULL,
        title varchar(255) NOT NULL,
        alert varchar(255) DEFAULT NULL,
        group_id varchar(36) NOT NULL,
        created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        last_modified_date timestamp NULL DEFAULT NULL,
        field_type varchar(255) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (group_id) REFERENCES form_group (id)
    );
`;

export const createTableVehicle: string = `
    CREATE TABLE IF NOT EXISTS vehicle (
        id varchar(36) NOT NULL,
        created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        last_modified_date timestamp NULL DEFAULT NULL,
        chassi_id varchar(255) DEFAULT NULL,
        follow_up_id varchar(255) DEFAULT NULL,
        status boolean DEFAULT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (follow_up_id) REFERENCES follow_up (id),
        FOREIGN KEY (chassi_id) REFERENCES chassi (id)
    );
  
`;

export const createTableVehicleGroup: string = `
    CREATE TABLE IF NOT EXISTS vehicle_group (
        groups_id varchar(36) NOT NULL,
        vehicles_id varchar(36) NOT NULL,
        PRIMARY KEY (vehicles_id,groups_id),
        FOREIGN KEY (groups_id) REFERENCES form_group (id),
        FOREIGN KEY (vehicles_id) REFERENCES vehicle (id)
    );
`;

export const createTableAnswer: string = `
    CREATE TABLE IF NOT EXISTS answer (
        id varchar(36) NOT NULL,
        observation varchar(255) DEFAULT NULL,
        question_id varchar(36) NOT NULL,
        created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        last_modified_date timestamp NULL DEFAULT NULL,
        vehicle_defect_id varchar(255) DEFAULT NULL,
        vehicle_object_id varchar(255) DEFAULT NULL,
        follow_up_user_id varchar(255) NOT NULL,
        type varchar(255) DEFAULT NULL,
        text_free varchar(255) DEFAULT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (vehicle_object_id) REFERENCES vehicle_object (id),
        FOREIGN KEY (follow_up_user_id) REFERENCES follow_up_user (id),
        FOREIGN KEY (vehicle_defect_id) REFERENCES vehicle_defect (id),
        FOREIGN KEY (question_id) REFERENCES question (id)
    );
`;

export const createTableDocument: string = `
    CREATE TABLE IF NOT EXISTS document (
        id varchar(36) NOT NULL,
        file longblob,
        file_content_type varchar(255) DEFAULT NULL,
        created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        last_modified_date timestamp NULL DEFAULT NULL,
        answer_id varchar(255) DEFAULT NULL,
        file_name varchar(255) DEFAULT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (answer_id) REFERENCES answer (id)
    );
`;
