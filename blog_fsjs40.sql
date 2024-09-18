-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 18 sep. 2024 à 07:01
-- Version du serveur : 8.0.29
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `blog_fsjs40`
--

-- --------------------------------------------------------

--
-- Structure de la table `avatar`
--

DROP TABLE IF EXISTS `avatar`;
CREATE TABLE IF NOT EXISTS `avatar` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `avatar`
--

INSERT INTO `avatar` (`id`, `label`) VALUES
(1, 'hacker.png'),
(2, 'woman.png'),
(3, 'man.png');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `label` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `label`) VALUES
(19, 'aze'),
(2, 'Multimédia'),
(1, 'Voyage');

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int UNSIGNED NOT NULL,
  `story_id` int UNSIGNED NOT NULL,
  `message` varchar(300) NOT NULL,
  `publishDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('en attente','validé') NOT NULL DEFAULT 'en attente',
  `parent_id` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `story_id` (`story_id`),
  KEY `user_id` (`user_id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `user_id`, `story_id`, `message`, `publishDate`, `status`, `parent_id`) VALUES
(1, 1, 2, 'Trop kawai', '2024-09-11 08:22:06', 'en attente', NULL),
(2, 1, 2, 'aaa', '2024-09-12 10:28:34', 'en attente', NULL),
(3, 2, 2, 'yhh', '2024-09-12 10:28:34', 'en attente', 1),
(4, 2, 2, 'lllllllllllkk', '2024-09-12 11:54:46', 'en attente', 3),
(5, 2, 2, 'working ???', '2024-09-12 12:24:43', 'en attente', 4),
(6, 5, 8, 'Ouais c\'est nul :(', '2024-09-17 12:35:37', 'en attente', NULL),
(7, 5, 8, 'Je parle à moi même !!', '2024-09-17 12:36:18', 'en attente', 6),
(11, 5, 6, 'lkjlj', '2024-09-17 14:35:56', 'en attente', NULL),
(12, 5, 6, ',hj,j', '2024-09-17 14:36:03', 'en attente', NULL),
(15, 5, 6, 'lm!', '2024-09-17 14:38:09', 'en attente', NULL),
(16, 5, 6, 'dqsdqqqqqqqqqq', '2024-09-17 14:39:31', 'en attente', 12),
(18, 5, 6, 'dsqsdq', '2024-09-17 14:41:25', 'en attente', 16),
(19, 5, 6, '', '2024-09-17 14:42:16', 'en attente', NULL),
(20, 5, 6, 'yyjytj', '2024-09-17 14:44:24', 'en attente', NULL),
(21, 5, 6, 'hrhtrh', '2024-09-17 14:44:29', 'en attente', 20),
(22, 5, 6, 'kkkkkkkkkkkkkkkkkkkkkkk', '2024-09-17 14:44:57', 'en attente', 20),
(23, 5, 6, 'qqqqqqqqqqqqqqqqqqqqqqqqqq', '2024-09-17 14:47:08', 'en attente', 22),
(24, 5, 6, 'dddddddddddddddd', '2024-09-17 14:48:09', 'en attente', 23),
(25, 5, 6, 'rrrrrrrrrrrrrrrrrrr', '2024-09-17 14:51:05', 'en attente', 22),
(26, 5, 6, 'ttttttttttt', '2024-09-17 14:51:12', 'en attente', 22);

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `url` varchar(150) NOT NULL,
  `story_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `story_id` (`story_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`id`, `url`, `story_id`) VALUES
(3, 'IMG_0095.JPG', 2),
(4, 'IMG_0118.JPG', 2),
(6, 'IMG_0118.JPG', 6),
(7, 'IMG_0095.JPG', 6),
(10, 'sun_playa.jpg', 8);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('CcJV6M_ModlnlvfNqq0rfgFjmghWeLrD', 1726662978, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-09-18T12:30:41.391Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":5,\"username\":\"jill\",\"role\":\"user\",\"avatar\":null}}'),
('jaLyHOdNphRYto-bKN0NP3VK2VeSvE7f', 1726682945, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-09-18T18:08:42.270Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":3,\"username\":\"khyn\",\"role\":\"admin\",\"avatar\":\"man.png\"}}');

-- --------------------------------------------------------

--
-- Structure de la table `story`
--

DROP TABLE IF EXISTS `story`;
CREATE TABLE IF NOT EXISTS `story` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `publishDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author` char(5) NOT NULL DEFAULT 'Admin',
  `category_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `story`
--

INSERT INTO `story` (`id`, `title`, `content`, `publishDate`, `author`, `category_id`) VALUES
(2, 'Mon voyage au Japon', '<p>salut Japon</p>\n<img src=\"/img/sun_playa.jpg\" />', '2024-09-02 14:28:28', 'Admin', 1),
(6, 'Nouvelle Playstation 12', '<p>Rentrez dans la Matrix avec la nouvelle console de Sony !</p>\r\n\r\n<p>Le Kung-fu en 10sec est à portée de main</p>', '2024-09-04 12:25:14', 'Admin', 2),
(8, 'Le beau temps d\'aujourd\'hui ?', 'Ouais c\'est pas ouf météo france c\'est des branques :(', '2024-09-10 18:22:56', 'Admin', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` char(60) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `avatar_id` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `avatar_id` (`avatar_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `avatar_id`) VALUES
(1, 'Joe', '$2b$10$7cp2aqhEdTbUYj4qHMRNOOjKMURHl0HgTKX7MJfZKL9jB66RJ7XKu', 'user', 1),
(2, 'bobby', '$2b$10$zRa1idxGp0b7138XaPjgTu0LRslMuaVjaw/TzmbNH12SS2FbyaOhu', 'user', NULL),
(3, 'khyn', '$2b$10$/r6.SoQtnFQxqUcAl/aZZOVDkgD9Y2xIuEVRHzwJz.6ephK/H7S0G', 'admin', 3),
(4, 'clara', '$2b$10$3OLymiybeGlF4s8MWNcjWuE52BHF6S1ya0a24sE.cHC9xnXbH5jhi', 'user', NULL),
(5, 'jill', '$2b$10$RFAR74knWerZT66X.tyXeuk364OI2ZbTpLYstyRcZbpowthPLsT8.', 'user', NULL),
(6, 'jane', '$2b$10$X8/lsrm8TlLvr88cO4c1HOOLruMtSa6CKdvs8/D29Qja0vpuaHQBa', 'admin', NULL),
(16, 'www', '$2b$10$HC7ltTUOwKs8OuV978oyYOEEpILdPLa02nPXXcZW6/axIpQvPtld2', 'user', NULL),
(17, 'ccc', '$2b$10$.V3XS0ZfJBxcv8JD7fjPQObNc0MTFebjkAgW3.tIQ6gw6Y/SX9j2C', 'user', 2),
(18, 'aaa', '$2b$10$p4htCZ4JA3zWxOWYTirm9eqMTwEq3lwAi70z/feP.imAOzzV.GNBG', 'user', 2),
(19, 'sss', '$2b$10$5NuwtqttBZjp7sB9q3PQgOhkt9HbNas4MZI7gcDIMumbEN3yQRggG', 'user', 3),
(20, 'rrr', '$2b$10$vdKdvFK1LMfFGoA/7ueGR.ZBf4H06SlFjzrQshxWoFHUN5SvXG1Vi', 'user', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`story_id`) REFERENCES `story` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Contraintes pour la table `story`
--
ALTER TABLE `story`
  ADD CONSTRAINT `story_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`avatar_id`) REFERENCES `avatar` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
