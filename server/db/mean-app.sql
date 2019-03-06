-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2019 at 09:19 AM
-- Server version: 5.6.37
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_categories`
--

CREATE TABLE `tbl_categories` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(50) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_categories`
--

INSERT INTO `tbl_categories` (`id`, `categoryName`, `isDeleted`) VALUES
(1, '', 1),
(2, 'Comedy', 0),
(3, '', 1),
(4, 'Horror', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_grades`
--

CREATE TABLE `tbl_grades` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_movies`
--

CREATE TABLE `tbl_movies` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `year` varchar(10) NOT NULL,
  `director` varchar(50) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `distribution` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `photoUrl` varchar(50) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `isApproved` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_movies`
--

INSERT INTO `tbl_movies` (`id`, `title`, `year`, `director`, `categoryId`, `distribution`, `description`, `photoUrl`, `isDeleted`, `isApproved`) VALUES
(1, 'ashar film', '2010-2019', 'test', 1, 0, '', 'test', 1, 0),
(2, 'ashar film 1', '2010-2019', 'test', 1, 0, '', 'test', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_time_periods`
--

CREATE TABLE `tbl_time_periods` (
  `id` int(11) NOT NULL,
  `timePeriod` varchar(20) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_time_periods`
--

INSERT INTO `tbl_time_periods` (`id`, `timePeriod`, `isDeleted`) VALUES
(1, '2010-2019', 1),
(2, '1997-2000', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `role` varchar(5) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `registerDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `first_name`, `last_name`, `password`, `gender`, `age`, `email`, `phone`, `role`, `isDeleted`, `registerDate`) VALUES
(1, 'Ashar', 'Khalid', '098f6bcd4621d373cade4e832627b4', 'male', 23, 'assd@asd.com', '3442534317', 'USER', 0, '2019-03-06');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_favorites`
--

CREATE TABLE `tbl_user_favorites` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_grades`
--
ALTER TABLE `tbl_grades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_movies`
--
ALTER TABLE `tbl_movies`
  ADD PRIMARY KEY (`id`,`categoryId`),
  ADD KEY `FK_Categoryid` (`categoryId`);

--
-- Indexes for table `tbl_time_periods`
--
ALTER TABLE `tbl_time_periods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`,`email`);

--
-- Indexes for table `tbl_user_favorites`
--
ALTER TABLE `tbl_user_favorites`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_grades`
--
ALTER TABLE `tbl_grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_movies`
--
ALTER TABLE `tbl_movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_time_periods`
--
ALTER TABLE `tbl_time_periods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_user_favorites`
--
ALTER TABLE `tbl_user_favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_movies`
--
ALTER TABLE `tbl_movies`
  ADD CONSTRAINT `FK_Categoryid` FOREIGN KEY (`categoryId`) REFERENCES `tbl_categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
