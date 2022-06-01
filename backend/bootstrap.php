<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('Europe/Paris');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-52-3-2-245.compute-1.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'rejkzpcbduleep',
'password' => '7f5b8e010ed419f31dce2533b512a17af610e080d7782f4e3f5369373ad15102',
'dbname' => 'dc2a4uqn21oevh',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);