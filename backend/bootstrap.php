<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-18-210-64-223.compute-1.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'onoispfkorfhjf',
'password' => '6df3c7d91c033911446f618e0455daedb1afeb65481e4ce3a27acc73e60f4698',
'dbname' => 'd4npa390c8srr2',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);