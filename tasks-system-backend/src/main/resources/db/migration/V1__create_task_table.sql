CREATE TABLE IF NOT EXISTS tasks (
    id          BIGINT          NOT NULL    AUTO_INCREMENT PRIMARY KEY ,
    name        VARCHAR(100)    NOT NULL    UNIQUE                     ,
    cost        DECIMAL(10, 2)  NOT NULL    DEFAULT 0                  ,
    deadline    DATETIME        NOT NULL                               ,
    sequence    BIGINT          NOT NULL                               ,
    INDEX id (id ASC)                                                  ,
    INDEX sequence_index (sequence ASC)                                ,
    INDEX name_index (name ASC)
)