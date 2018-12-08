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
-- Table structure for table `available_hours`
--

DROP TABLE IF EXISTS `available_hours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `available_hours` (
  `available_hours_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `start_time` time(6) NOT NULL,
  `end_time` time(6) NOT NULL,
  `weekdays` varchar(255) NOT NULL,
  `available_hour_location` varchar(255) NOT NULL,
  `date` date DEFAULT NULL,
  `repeat` varchar(45) NOT NULL,
  PRIMARY KEY (`available_hours_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `available_hours`
--

LOCK TABLES `available_hours` WRITE;
/*!40000 ALTER TABLE `available_hours` DISABLE KEYS */;
INSERT INTO `available_hours` VALUES (1,5,'10:00:00.000000','13:30:00.000000','Thursday','ctown','2018-11-29','true'),(3,9,'14:00:00.000000','15:00:00.000000','Wednesday','Gates Hall','2018-10-03','false'),(4,8,'17:00:00.000000','18:00:00.000000','Saturday','Gates Hall','2018-11-03','false'),(5,9,'13:00:00.000000','14:00:00.000000','Thursday','Gates Hall','2018-11-29','true'),(6,10,'09:30:00.000000','10:30:00.000000','Friday','Gates Hall','2018-11-30','true'),(7,11,'14:00:00.000000','15:00:00.000000','Thursday','Gates Hall 311','2018-10-11','true'),(8,12,'10:00:00.000000','12:00:00.000000','Monday','Gates Hall 416','2018-10-15','true'),(9,13,'16:00:00.000000','18:00:00.000000','Friday','Gates Hall','2018-12-07','false'),(10,15,'13:00:00.000000','14:00:00.000000','Tuesday','Gimme Coffee','2018-11-27','true'),(11,16,'08:00:00.000000','10:00:00.000000','Thursday','MPS lab','2018-11-29','false'),(12,17,'10:00:00.000000','12:00:00.000000','Friday','Gimme Coffee','2018-09-21','true'),(13,18,'16:00:00.000000','17:30:00.000000','Monday','Gates Hall','2018-12-03','false'),(14,5,'14:00:00.000000','15:00:00.000000','Tuesday','at home','2018-11-06','false'),(18,27,'13:00:00.000000','14:00:00.000000','Friday','gimme','2018-12-14','false'),(19,27,'14:00:00.000000','15:00:00.000000','Wednesday','ehub@ctown','2018-12-19','false'),(25,27,'10:00:00.000000','12:00:00.000000','Tuesday','Gates ','2018-12-11','false'),(27,27,'12:00:00.000000','13:00:00.000000','Monday','Statler library','2018-12-24','false'),(33,27,'08:00:00.000000','09:00:00.000000','Wednesday','Gates 229','2018-12-05','false');
/*!40000 ALTER TABLE `available_hours` ENABLE KEYS */;
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
