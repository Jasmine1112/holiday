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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hash_password` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `affiliation` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `college_department` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `faculty_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`first_name`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'holiday','holiday@gmail.com','$2y$10$PVs.xUCXtd.XilGhxY872OkDvKAYLlEV1XKeik8WHWn4hK9ZjkaUi','Student','ECE Junior','H.','Jane','607-232-1234','Cornell University','Information Science','MPS',NULL),(7,'Cheng Zhang','zhangcheng@gmail.com','$2y$10$6drwjJzmZ19eOg7d9WunkuosmOSczZJ81xa4CmD6mh.sFTW4sH9Ku','Faculty',NULL,'Zhang','Cheng',NULL,NULL,'Information Science',NULL,'12345'),(8,'Claire Cardie','clairecardie@gmail.com','somepassword','Faculty',NULL,'Cardie','Claire',NULL,NULL,'Computer Science',NULL,'12346'),(9,'Francois Guimbretiere','francois@gmail.com','somepassword','Faculty',NULL,'Guimbretiere','Francois',NULL,NULL,'Information Science',NULL,'12347'),(10,'Gilly Leshed','gl@gmail.com','somepassword','Faculty',NULL,'Leshed','Gilly',NULL,'Cornell University','Information Science',NULL,'12348'),(11,'Marco Mars','mm@gmail.com','somepassword','Faculty',NULL,'Mars','Marco',NULL,'Cornell University','Information Science',NULL,'12349'),(12,'Jon Saxe','js@gmail.com','somepassword','Faculty',NULL,'Saxe','Jon',NULL,'Cornell University','Information Science',NULL,'12350'),(13,'David Gries','davidgries@gmail.com','somepassword','Faculty',NULL,'Gries','David',NULL,'Cornell University','Computer Science',NULL,'12351'),(14,'Anne Bracy','annebracy@gmail.com','somepassword','Faculty',NULL,'Bracy','Anne',NULL,'Cornell University','Computer Science',NULL,'12352'),(15,'Jasmine Hu','jasmineh@gmail.com','somepassword','Faculty',NULL,'Hu','Jasmine',NULL,'Cornell University','Law School',NULL,'12353'),(16,'Zoey Zhang','zz@gmail.com','somepassword','Faculty',NULL,'Zhang','Zoey',NULL,'Cornell University','Design and Environmental Analysis',NULL,'12354'),(17,'Eric Brown','ericb@gmail.com','somepassword','Faculty',NULL,'Brown','Eric',NULL,'Cornell University','Information Science',NULL,'12355'),(19,'Ming Wan','mingming@gmail.com','somepassword','Student',NULL,'Wan','Ming',NULL,'Cornell University ','Architecture',NULL,'12357'),(20,'Yue Ares','yueares@gmail.com','somepassword','Student',NULL,'Ares','Yue',NULL,'Cornell University','City and Reginal Planning',NULL,'12358'),(21,'Qi Qi','qq@gmail.com','somepassword','Student',NULL,'Qi','Qi',NULL,'Cornell University','Music',NULL,'12359'),(22,'Fuji Tatsuya','tatsuya@gmail.com','somepassword','Student',NULL,'Tatsuya','Fuji',NULL,'Cornell University','Information Science',NULL,'12360'),(23,'Katey Swift','kateyswift@gmail.com','somepassword','Student',NULL,'Swift','katey',NULL,'Cornell University','Information Science',NULL,'12361'),(24,'Talyor Perry','perry@gmail.com','somepassword','Student',NULL,'Perry','Talyor',NULL,'Cornell University','Music',NULL,'12362'),(25,'Alison Sun','alisonsun@gmail.com','somepassword','Student',NULL,'Sun','Alison',NULL,'Cornell University','Agriculture',NULL,'12363'),(26,'Cindy Todd','ctodd@gmail.com','somepassword','Faculty',NULL,'Todd','Cindy',NULL,'Cornell University','Information Science',NULL,NULL),(27,'Ben Bing','ben@cornell.edu','$2y$10$ShFn2AxRpAHvAFyCNCkoT.2hydtkb3WQzctMQUVWfgi3riGa4NKge','Faculty',NULL,'Bing','Ben','6072222222','Cornell University','DEA Advisor',NULL,'12345'),(28,'Workday','workday@gmail.com','somepassword','Faculty',NULL,'','Workday',NULL,'Cornell University','Engineering',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
