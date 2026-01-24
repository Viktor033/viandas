CREATE TABLE IF NOT EXISTS usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    email VARCHAR(255),
    telefono VARCHAR(20) NOT NULL UNIQUE,
    contraseña VARCHAR(255),
    rol VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS cadetes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    dni VARCHAR(20),
    telefono VARCHAR(20),
    zona_asignada VARCHAR(255),
    activo BOOLEAN,
    fecha_ingreso DATE,
    observaciones TEXT
);

CREATE TABLE IF NOT EXISTS zona (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    codigo_postal VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS vianda (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT,
    precio DOUBLE
);

CREATE TABLE IF NOT EXISTS pedido (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    estado VARCHAR(50),
    usuario_id BIGINT,
    zona_id BIGINT,
    cadete_id BIGINT,
    CONSTRAINT fk_pedido_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT fk_pedido_zona FOREIGN KEY (zona_id) REFERENCES zona(id),
    CONSTRAINT fk_pedido_cadete FOREIGN KEY (cadete_id) REFERENCES cadetes(id)
);
