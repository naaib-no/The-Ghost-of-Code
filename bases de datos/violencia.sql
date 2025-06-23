-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-06-2025 a las 00:15:34
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
-- Base de datos: `violencia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos`
--

CREATE TABLE `tipos` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `info` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos`
--

INSERT INTO `tipos` (`id`, `tipo`, `info`) VALUES
(1, 'psicologica', 'Hay violencia psicológica cuando se humilla o intenta degradar a una persona mediante insultos o pal'),
(2, 'fisica', 'La violencia física consiste en hacer uso de la fuerza para causar un daño a la víctima'),
(3, 'economica', 'Es una forma de violencia doméstica. Consiste en impedir que la víctima tenga acceso a recursos econ'),
(4, 'psicologica', 'Hay violencia psicológica cuando se humilla o intenta degradar a una persona mediante insultos o pal'),
(5, 'fisica', 'La violencia física consiste en hacer uso de la fuerza para causar un daño a la víctima'),
(6, 'economica', 'Es una forma de violencia doméstica. Consiste en impedir que la víctima tenga acceso a recursos econ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `violencia`
--

CREATE TABLE `violencia` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `info` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `violencia`
--

INSERT INTO `violencia` (`id`, `tipo`, `info`) VALUES
(1, 'psicológica', 'Hay violencia psicológica cuando se humilla o intenta degradar a una persona mediante insultos o palabras que provocan daño.'),
(2, 'física', 'La violencia física consiste en hacer uso de la fuerza para causar un daño a la víctima.'),
(3, 'económica', 'Es una forma de violencia doméstica. Consiste en impedir que la víctima tenga acceso a recursos económicos o patrimoniales o que no pueda hacer uso de ellos.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tipos`
--
ALTER TABLE `tipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `violencia`
--
ALTER TABLE `violencia`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tipo` (`tipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tipos`
--
ALTER TABLE `tipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `violencia`
--
ALTER TABLE `violencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
