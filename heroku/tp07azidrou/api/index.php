<?php

use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

function createJwt(Response $response): Response
{
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array( //contenu du token
        'userid' => 'toto',
        'email' => 'toto@gmail.com',
        'pseudo' => 'totoPseudo',
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}
function getJWTToken($request)
{
    $payload = str_replace("Bearer ", "", $request->getHeader('Authorization')[0]); //recup entete requette http
    $token = JWT::decode($payload,JWT_SECRET , array("HS256")); //dechiffrer le token
    return $token;
}


const JWT_SECRET = "makey1234567";
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello","/api/login","/api/createUser","/api/catalog"], //todo : delete /api/catalog
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write($data);
    }
];

$app = AppFactory::create();
$app->add(new Tuupola\Middleware\JwtAuthentication($options));

$app->get('/api/hello/{name}',
    function (Request $request, Response $response, $args) {
        $response->getBody()->write(array('nom' => $args['name']));
        return $response;
    });

// APi d'authentification générant un JWT
$app->post('/api/login', function (Request $request, Response $response, $args) {
    global $entityManager;
    $err=false;
    $body = $request->getParsedBody();
    $login = $body ['login'] ?? "";
    $pass = $body ['passwd'] ?? ""; //TODO verif nom variable

    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login))   {
        $err = true;
    }
    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$pass))  {
        $err=true;
    }
    if (!$err) {
        $utilisateurRepository = $entityManager->getRepository('Utilisateur');
        $utilisateur = $utilisateurRepository->findOneBy(array('login' => $login, 'password' => $pass));
        if ($utilisateur and $login == $utilisateur->getLogin() and $pass == $utilisateur->getPassword()) {
            $response = addHeaders ($response);
            $response = createJwT ($response);
            $data = array('nom' => $utilisateur->getNom(), 'prenom' => $utilisateur->getPrenom());
            $response->getBody()->write($data);
        } else {
            $response = $response->withStatus(401);
        }
    } else {
        $response = $response->withStatus(401);
    }

    return $response;
});

$app->get('/api/user',
    function (Request $request, Response $response) {
        $payload = getJWTToken($request);
        $userid = $payload->userid; //on recup la composante userid dans payload
        $response->getBody()->write($userid); //réécris ce qu'il y a ds body
        return $response;
    });

$app->get('/api/catalog',
    function(Request $request, Response $response) {
        //recup dans la bdd au lieu du bouchon
        $products = file_get_contents("../bouchon/catalogue.json"); //recup les infos d'un produit et le stocke en string dans products
        if($products) {
            $response->getBody()->write($products); //si pas vide, on encode en json et envoyé en reponse 
            //write(json_encode($products))  pose problème car on encode du json en json... 
        } else {
            $response->withStatus(404); //404 NOT FOUND
        }
        return $response;
    });

$app->get('/api/catalog/{filter}',
    function(Request $request, Response $response, $args) {
        //recup dans la bdd au lieu du bouchon
        $products = file_get_contents("../bouchon/catalogue.json");

        // s'il n'y a pas d'erreur dans la récupération du bouchon
        if($products) {

            $filterValue = (string)$args['filter'];
            //rajouter un $products =     // products n'est pas modif ??
            $products = array_filter($products, true), function($value) use ($filterValue) {
                // si le filtre est similaire à plus de 50% au titre du produit alors on le garde
                return similar_text((string)$value['titre'], $filterValue) > 50; // si titre de produit >= 50% pareil que filterValue  ; on renvoie un tableau
            });
            $response->getBody()->write($products);
        } else {
            $response->withStatus(404);
        }


        return $response;
    });

$app->run();
