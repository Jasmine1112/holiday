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
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedules` (
  `schedule_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id_1` int(11) NOT NULL,
  `user_id_2` int(11) NOT NULL,
  `meeting_subject` varchar(255) DEFAULT NULL,
  `time` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `seen_by_user1` varchar(45) NOT NULL,
  `seen_by_user2` varchar(45) NOT NULL,
  PRIMARY KEY (`schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (5,5,8,'NLP homework','2018-11-16 12:30:00','Gates 213','upcoming',NULL,'true','true'),(28,5,10,'HCI G5','2018-12-05 14:00:00','gates','upcoming','','true','true'),(29,5,9,'weekly assignment','2018-12-03 15:30:00','Gates 213','past',NULL,'true','true'),(30,5,15,'next semester\'s course','2018-12-10 09:00:00','Collegetown Starbucks','pending',NULL,'true','true'),(31,5,12,'MPS poster','2018-11-30 11:00:00','Gimme Coffee','upcoming',NULL,'true','true'),(32,19,15,'recommendation letter','2018-12-03 18:00:00','Collegetown. Starbucks','upcoming',NULL,'true','true'),(33,19,11,'prelim grade','2018-12-04 13:00:00','Gates 331','upcoming',NULL,'true','true'),(34,19,16,'presentation materials','2018-11-29 08:00:00','MPS lab','pending',NULL,'true','true'),(35,20,26,'resume critique','2018-12-06 14:30:00','Gates 110','upcoming',NULL,'true','true'),(36,20,16,'semester project','2018-11-29 09:00:00','MPS lab','pending',NULL,'true','true'),(37,21,13,'debuging problems','2018-12-04 08:30:00','Gates 422','upcoming',NULL,'true','true'),(38,22,18,'graduation requirements','2018-12-07 13:00:00','Gates 406','upcoming',NULL,'true','true'),(39,23,17,'HCI I4 grade','2018-12-04 16:00:00','Gimme Coffee','upocoming',NULL,'true','true'),(40,24,17,'HCI G4 requirements','2018-12-07 10:00:00','Gimme Coffee','pending',NULL,'true','true'),(41,25,10,'changing major','2018-12-07 10:00:00','Gates 233','upcoming',NULL,'true','true'),(42,25,14,'CS2110 requirements','2018-12-07 15:00:00','Gates 423','upcoming',NULL,'true','true'),(44,5,16,'Talk about DEA design project','2018-11-27 10:30:00','Olin Hall 213','upcoming','Hi Zoey!! wanna catch up with the project','true','true'),(45,5,26,'career advice','2018-11-29 14:30:00','Gates 110','upcoming','','true','true'),(51,5,27,'talk about the website','2018-11-30 14:30:00','Gates 101','upcoming','','true','true'),(53,5,27,'Career advice','2018-12-04 11:00:00','gates 1234','past','','true','true'),(54,5,9,'INFO 4320 Final Demo','2018-12-06 16:00:00','Gates 229','past',NULL,'true','false'),(66,5,28,'MPS project','2018-12-06 18:15:00','Duffield Hall','upcoming',NULL,'true','true'),(72,5,27,'career advice','2018-12-05 08:00:00','Gates 229','upcoming','','true','false');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
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
