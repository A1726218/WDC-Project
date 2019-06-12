-- MySQL dump 10.17  Distrib 10.3.14-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: restaurant_web
-- ------------------------------------------------------
-- Server version	10.3.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `restaurant_web`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `restaurant_web` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `restaurant_web`;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking` (
  `BookingID` int(11) NOT NULL,
  `RestID` int(11) DEFAULT NULL,
  `Time` int(11) DEFAULT NULL,
  `NumOfPeople` int(11) DEFAULT NULL,
  `PeopleID` int(11) DEFAULT NULL,
  PRIMARY KEY (`BookingID`),
  KEY `RestID` (`RestID`),
  KEY `PeopleID` (`PeopleID`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`RestID`) REFERENCES `restaurant` (`RestID`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`PeopleID`) REFERENCES `people` (`PeopleID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `people`
--

DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `people` (
  `PeopleID` int(11) NOT NULL,
  `First_Name` varchar(50) DEFAULT NULL,
  `Last_Name` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Password` varchar(64) DEFAULT NULL,
  `Owner` tinyint(1) DEFAULT 0,
  `RestID` int(11) DEFAULT NULL,
  `BookingID` int(11) DEFAULT NULL,
  PRIMARY KEY (`PeopleID`),
  KEY `RestID` (`RestID`),
  KEY `BookingID` (`BookingID`),
  CONSTRAINT `people_ibfk_1` FOREIGN KEY (`RestID`) REFERENCES `restaurant` (`RestID`),
  CONSTRAINT `people_ibfk_2` FOREIGN KEY (`BookingID`) REFERENCES `booking` (`BookingID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `people`
--

LOCK TABLES `people` WRITE;
/*!40000 ALTER TABLE `people` DISABLE KEYS */;
INSERT INTO `people` VALUES (1,'Elon','Musk','elonmusk@spaceman.com','ba19d2296aad0e7013d92e505957696716aee597c896012c06fdfa5e33e06841',0,NULL,NULL),(2,'Jane','Smith','catlover99@hotmail.com','bdf1534e0639de5772187c258300f66c68737a41432ce3e24ff44fab61209c62',0,NULL,NULL),(3,'Dave','McCarthy','d.carthy@gmail.com','19ee35f9fd8585add60fa88c2e1ec81d093b8e17650bbb42380f377fc33f67df',0,NULL,NULL),(4,'a','b','c','18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4',0,NULL,NULL);
/*!40000 ALTER TABLE `people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurant` (
  `Name` varchar(50) DEFAULT NULL,
  `Cost` int(11) DEFAULT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `Seats` int(11) DEFAULT NULL,
  `Monday` varchar(100) DEFAULT NULL,
  `Tuesday` varchar(100) DEFAULT NULL,
  `Wednesday` varchar(100) DEFAULT NULL,
  `Thursday` varchar(100) DEFAULT NULL,
  `Friday` varchar(100) DEFAULT NULL,
  `Saturday` varchar(100) DEFAULT NULL,
  `Sunday` varchar(100) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `RestID` int(11) NOT NULL,
  `ContactDetails` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`RestID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `RevID` int(11) NOT NULL,
  `PeopleID` int(11) DEFAULT NULL,
  `Review` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`RevID`),
  KEY `PeopleID` (`PeopleID`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`PeopleID`) REFERENCES `people` (`PeopleID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-12 21:03:12
