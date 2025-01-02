-- Definición de los tipos ENUM
CREATE TYPE sexo_enum AS ENUM ('masculino', 'femenino', 'otro');
CREATE TYPE rol_enum AS ENUM ('vendedor', 'cliente');
CREATE TYPE estado_enum AS ENUM ('disponible', 'vendido');
CREATE TYPE estado_publicacion_enum AS ENUM ('activa', 'inactiva');
CREATE TYPE tipo_mensaje_enum AS ENUM ('venta', 'mensaje', 'valoracion');

-- Tabla de usuarios
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    municipio VARCHAR(100),
    sexo sexo_enum,
    fecha_nacimiento DATE,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    celular VARCHAR(15),
    rol rol_enum NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla de productos
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_publicacion DATE NOT NULL,
    estado estado_enum DEFAULT 'disponible',
    imagen TEXT,
    cantidad_stock INT NOT NULL,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE SET NULL
);

-- Tabla de inventario
CREATE TABLE inventario (
    id_inventario SERIAL PRIMARY KEY,
    id_producto INT,
    cantidad_disponible INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

-- Tabla de valoración
CREATE TABLE valoracion (
    id_valoracion SERIAL PRIMARY KEY,
    id_producto INT,
    id_usuario INT,
    puntuacion INT CHECK (puntuacion >= 1 AND puntuacion <= 5),
    comentario TEXT,
    fecha_valoracion DATE NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- Tabla de publicación
CREATE TABLE publicacion (
    id_publicacion SERIAL PRIMARY KEY,
    id_producto INT,
    id_usuario INT,
    fecha_publicacion DATE NOT NULL,
    estado_publicacion estado_publicacion_enum DEFAULT 'activa',
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- Tabla de mensaje
CREATE TABLE mensaje (
    id_mensaje SERIAL PRIMARY KEY,
    id_usuario INT,
    id_producto INT,
    tipo tipo_mensaje_enum,
    contenido TEXT,
    fecha_envio DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

-- Creación de la función para buscar productos por nombre
CREATE OR REPLACE FUNCTION search_products_by_name(nombre_producto TEXT)
RETURNS TABLE (
    id_producto INT,
    nombre_producto VARCHAR,
    descripcion TEXT,
    precio DECIMAL(10, 2),
    fecha_publicacion DATE,
    estado estado_enum,
    imagen TEXT,
    cantidad_stock INT,
    id_usuario INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT p.id_producto,
           p.nombre_producto,
           p.descripcion,
           p.precio,
           p.fecha_publicacion,
           p.estado,
           p.imagen,
           p.cantidad_stock,
           p.id_usuario
    FROM productos p
    WHERE p.nombre_producto ILIKE '%' || nombre_producto || '%';
END;
$$ LANGUAGE plpgsql;
