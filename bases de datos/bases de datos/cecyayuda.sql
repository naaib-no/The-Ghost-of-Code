-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2025 a las 07:44:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cecyayuda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `denuncias`
--

CREATE TABLE `denuncias` (
  `nombre` varchar(100) NOT NULL,
  `edad` int(11) NOT NULL,
  `sexo` varchar(15) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `nombre_agresor` varchar(100) NOT NULL,
  `relacion_agresor` varchar(100) NOT NULL,
  `lugar_incidente` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `denuncia` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `denuncias`
--

INSERT INTO `denuncias` (`nombre`, `edad`, `sexo`, `telefono`, `correo`, `direccion`, `nombre_agresor`, `relacion_agresor`, `lugar_incidente`, `fecha`, `denuncia`) VALUES
('Anna Martinez Hernandez', 23, 'Femenino', '5564860670', 'Martinez@gmail.com', 'apapazco', 'Juan ', 'Amigo', 'azucenas', '2008-06-10', 'dfgdfgdfgdfgdfgdfgdfgdfg'),
('Ricardo Cortes Andres', 24, 'Masculino', '5564860670', 'MMM@gmail.com', 'apapazco', 'Tulio', 'Familiar', 'azucenas', '2008-06-16', 'wqweqweqwe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `satisfaccion`
--

CREATE TABLE `satisfaccion` (
  `id` int(11) NOT NULL,
  `respeto` varchar(10) DEFAULT NULL,
  `ayuda` varchar(10) DEFAULT NULL,
  `escuchada` varchar(10) DEFAULT NULL,
  `recomendaria` varchar(5) DEFAULT NULL,
  `calificacion` varchar(1) DEFAULT NULL,
  `comentarios` text DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `denuncias`
--
ALTER TABLE `denuncias`
  ADD PRIMARY KEY (`correo`);

--
-- Indices de la tabla `satisfaccion`
--
ALTER TABLE `satisfaccion`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `satisfaccion`
--
ALTER TABLE `satisfaccion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
