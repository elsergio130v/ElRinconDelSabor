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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `Password` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `nombre` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `apellidos` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `ciudad` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `cp` char(5) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `rol` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL DEFAULT 'CLIENTE',
  `telefono` varchar(9) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'sergio@gmail.com','202cb962ac59075b964b07152d234b70','Sergio','Carroza Casco','Almendralejo','06200','CLIENTE','645213789'),(2,'fede@gmail.com','202cb962ac59075b964b07152d234b70','fede','garcia','Merida',NULL,'CLIENTE',NULL),(6,'antobg@gmail.com','202cb962ac59075b964b07152d234b70','Antonio','Bandera Garcia','Almendralejo',NULL,'CLIENTE',NULL),(7,'pepe@gmail.com','202cb962ac59075b964b07152d234b70','pepepe','sanchez lopez','almendralejo',NULL,'CLIENTE',NULL),(8,'kiko@gmail.com','202cb962ac59075b964b07152d234b70','kiko','sanchez','Alburquerque',NULL,'CLIENTE',NULL),(9,'sasa@gmail.com','202cb962ac59075b964b07152d234b70','sadsada','','',NULL,'CLIENTE',NULL),(10,'asdasdasd@gmail.com','202cb962ac59075b964b07152d234b70','asdasdas','','',NULL,'CLIENTE',NULL),(11,'lolo@gmail.com','202cb962ac59075b964b07152d234b70','rerererer','peidqadasd','',NULL,'EMPLEADO',NULL),(12,'DDDD@GMAIL.COM','202cb962ac59075b964b07152d234b70','DDDDDDD','','',NULL,'CLIENTE',NULL),(13,'juana@gmail.com','202cb962ac59075b964b07152d234b70','Juan','arias','almendralejo',NULL,'CLIENTE',NULL),(14,'manolis@gmail.com','202cb962ac59075b964b07152d234b70','manoli','sanchez','villalbaº',NULL,'CLIENTE',NULL),(17,'lucia@gmail.com','202cb962ac59075b964b07152d234b70','Lucia ','Garcia','almendral',NULL,'CLIENTE',NULL),(18,'admin','202cb962ac59075b964b07152d234b70','sergio','carroza','almendralejo',NULL,'GERENTE',NULL),(19,'empleado@gmail.com','202cb962ac59075b964b07152d234b70','empleado','empleado empleado','','','CLIENTE',NULL),(20,'serc@gmail.com','202cb962ac59075b964b07152d234b70','sergio','parra','almendralejo','06200','EMPLEADO','654123789'),(21,'parra@gmail.com','202cb962ac59075b964b07152d234b70','edu','parra','almendralejo','06200','EMPLEADO','659123789'),(23,'pepiiiii@gmail.com','202cb962ac59075b964b07152d234b70','pepe','garcia','almendralejo','06200','EMPLEADO','659123789'),(24,'pepa@gmail.com','202cb962ac59075b964b07152d234b70','pepe','garcia','almendralejo','06200','EMPLEADO','659123789'),(25,'padsadasd@gmail.com','202cb962ac59075b964b07152d234b70','pepe','garcia','almendralejo','06200','EMPLEADO','659123789'),(26,'padsadasasdasd@gmail.com','202cb962ac59075b964b07152d234b70','pepe','garcia','almendralejo','06200','EMPLEADO','659123789'),(27,'mariag@gmail.com','202cb962ac59075b964b07152d234b70','maria ','gertrudis','almendralejo','06200','EMPLEADO','675342321'),(28,'lucial@gmail.com','202cb962ac59075b964b07152d234b70','Lucia','Lopez','almendralejo','06200','EMPLEADO','632154789'),(29,'ramon@gmail.com','202cb962ac59075b964b07152d234b70','Ramon','Sanchez','merida','06800','EMPLEADO','654123987'),(30,'virgi@gmail.com','202cb962ac59075b964b07152d234b70','virginia','garcia','merida','06200','EMPLEADO','654344237'),(31,'asd@gmail.com','202cb962ac59075b964b07152d234b70','asd','asd','merida','06214','EMPLEADO','695214514'),(32,'erere@gmail.com','202cb962ac59075b964b07152d234b70','erer','erer','asa','65665','EMPLEADO','654567657'),(33,'aaa@gmail.com','202cb962ac59075b964b07152d234b70','aaa','aaa','d','d','EMPLEADO','652123789'),(34,'aaaaaa@gmail.com','202cb962ac59075b964b07152d234b70','ñññ','ñññ','jmjk','jjj','EMPLEADO','654123980'),(35,'kakaka@gmail.com','65ded5353c5ee48d0b7d48c591b8f430','ajaja','jaja','adsfa','06200','EMPLEADO','654453123');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
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
