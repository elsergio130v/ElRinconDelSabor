-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: rincondelsabor
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `idreserva` int NOT NULL AUTO_INCREMENT,
  `idMesaReserva` tinyint NOT NULL,
  `horaInicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `horaFinal` timestamp NULL DEFAULT NULL,
  `emailUsuario` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  PRIMARY KEY (`idreserva`),
  KEY `emailUsuario` (`emailUsuario`),
  KEY `FK_Reservas_Mesas` (`idMesaReserva`),
  CONSTRAINT `FK_Reservas_Mesas` FOREIGN KEY (`idMesaReserva`) REFERENCES `mesas` (`idMesa`),
  CONSTRAINT `FK_Reservas_Usuarios` FOREIGN KEY (`emailUsuario`) REFERENCES `usuarios` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (4,1,'2024-06-07 13:00:00','2024-06-07 14:00:00','sergio@gmail.com'),(5,2,'2024-06-07 19:00:00','2024-06-07 15:00:00','sergio@gmail.com'),(6,3,'2024-06-07 11:00:00','2024-06-07 16:00:00','sergio@gmail.com'),(7,1,'2024-06-07 12:00:00','2024-06-07 15:00:00','sergio@gmail.com'),(8,5,'2024-06-07 13:00:00','2024-06-07 14:00:00','sergio@gmail.com'),(12,5,'2024-06-07 12:00:00','2024-06-07 11:00:00','sergio@gmail.com'),(13,1,'2024-06-07 11:00:00','2024-06-07 10:00:00','sergio@gmail.com'),(14,1,'2024-06-14 19:00:00','2024-06-14 18:00:00','sergio@gmail.com'),(15,5,'2024-06-07 11:00:00','2024-06-07 10:00:00','sergio@gmail.com'),(17,1,'2024-06-20 19:00:00','2024-06-20 18:00:00','sergio@gmail.com'),(18,2,'2024-06-07 13:00:00','2024-06-07 12:00:00','sergio@gmail.com');
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-08  0:10:16
