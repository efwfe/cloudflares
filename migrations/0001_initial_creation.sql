-- Migration number: 0001 	 2025-05-19T06:35:49.994Z

CREATE TABLE image_categories (
    id INTEGER PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO image_categories (slug, display_name) VALUES
    ('landscape', 'Landscape'),
    ('portrait', 'Portrait'),
    ('macro', 'Macro'),
    ('night', 'Night'),
    ('city', 'City'),
    ('nature', 'Nature'),   
    ('animal', 'Animal');


CREATE TABLE images (
    id INTEGER PRIMARY KEY,
    category_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    title TEXT NOT NULL,
    format TEXT NOT NULL,
    resolution TEXT NOT NULL,
    file_size_bytes INTEGER NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES image_categories(id)
);

INSERT INTO images (category_id, user_id, image_url, title, format, resolution, file_size_bytes) VALUES
    (1, 1, 'https://picsum.photos/200/300', 'Landscape 1', 'JPEG', '1024x768', 1024 * 768 * 3),
    (2, 1, 'https://picsum.photos/200/300', 'Portrait 1', 'JPEG', '1024x768', 1024 * 768 * 3),
    (3, 1, 'https://picsum.photos/200/300', 'Macro 1', 'JPEG', '1024x768', 1024 * 768 * 3),
    (4, 1, 'https://picsum.photos/200/300', 'Night 1', 'JPEG', '1024x768', 1024 * 768 * 3);
    
