-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: Holiday_Workday_DB
-- ------------------------------------------------------
-- Server version	5.6.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `faculty_office_hours`
--

DROP TABLE IF EXISTS `faculty_office_hours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faculty_office_hours` (
  `office_hour_id` int(11) NOT NULL AUTO_INCREMENT,
  `start_time` time(6) NOT NULL,
  `end_time` time(6) NOT NULL,
  `weekdays` varchar(255) NOT NULL,
  `office_hour_location` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`office_hour_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty_office_hours`
--

LOCK TABLES `faculty_office_hours` WRITE;
/*!40000 ALTER TABLE `faculty_office_hours` DISABLE KEYS */;
INSERT INTO `faculty_office_hours` VALUES (1,'14:00:00.000000','16:00:00.000000','Wednesday','Gates 123',7),(2,'10:00:00.000000','11:30:00.000000','Friday','Gates 321',8),(3,'15:00:00.000000','16:00:00.000000','Monday','Gates 213',9),(4,'14:00:00.000000','16:00:00.000000','Thursday','Gates 123',7),(20,'13:00:00.000000','14:00:00.000000','Monday','Gates 233',10),(21,'09:30:00.000000','10:30:00.000000','Friday','Gates 233',10),(22,'12:00:00.000000','14:00:00.000000','Tuesday','Gates 331',11),(23,'14:00:00.000000','17:00:00.000000','Wednesday','Gates 416',12),(24,'08:00:00.000000','09:00:00.000000','Tuesday','Gates 422',13),(25,'15:00:00.000000','16:00:00.000000','Friday','Gates 423',14),(26,'18:00:00.000000','19:00:00.000000','Monday','CollegeTown Starbucks',15),(27,'10:30:00.000000','12:30:00.000000','Tuesday','Olin Hall 213',16),(28,'16:00:00.000000','17:00:00.000000','Tuesday','Gimme Coffee',17),(29,'11:00:00.000000','12:00:00.000000','Wednesday','Gates 406',18),(30,'13:00:00.000000','14:30:00.000000','Friday','Gates 406',18),(31,'14:30:00.000000','15:30:00.000000','Thursday','Gates 110',26),(39,'10:00:00.000000','11:00:00.000000','Monday','Gates 229',27);
/*!40000 ALTER TABLE `faculty_office_hours` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-08 17:00:59
