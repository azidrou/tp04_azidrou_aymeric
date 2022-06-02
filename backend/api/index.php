<?php
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../bootstrap.php';
require __DIR__ . '/../vendor/autoload.php';

function createJwt(Client $client,Response $response): Response
{
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
        'id' => $client->getIdClient(),
        'username' => $client->getUsername(),
        'email' => $client->getEmail(),
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload, JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
}
function getJWTToken($request)
{
    $payload = str_replace("Bearer ", "", $request->getHeader('Authorization')[0]);
    $token = JWT::decode($payload,JWT_SECRET , array("HS256"));
    return $token;
}


const JWT_SECRET = "mykey1234567";
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello","/api/login","/api/createUser"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app = AppFactory::create();
$app->add(new Tuupola\Middleware\JwtAuthentication($options));

$app->get('/api/hello/{name}',
    function (Request $request, Response $response, $args) {
        $response->getBody()->write(array('nom' => $args['name']));
        return $response;
    });
/*
$app->post('/api/login',
    function (Request $request, Response $response) {
        $err = false;

        $body = $request->getBody();
        $data = json_decode($body, true);

        $login = $data['login'] ?? '';
        $pass = $data['password'] ?? '';

        if(!preg_match("/[a-zA-Z0-9]{1,20}/", $login)){
            $err = true;
        }
        if(!preg_match("/[a-zA-Z0-9]{1,20}/", $pass)){
            $err = true;
        }
        if(!$err){
            $response = createJWT($response);
            $data = ['nom'=> 'toto', 'prenom'=> 'titi'];
            $response->getBody()->write($data);
        }else{
            $response = $response->withStatus(401);
        }
        return $response;
    });
*/

$app->post('/api/login',
    function (Request $request, Response $response) {
        global $entityManager;
        $body = $request->getParsedBody();
        $data = json_decode($body, true);

        if(isset($data['username'], $data['password'])) {
            $clientRepository = $entityManager->getRepository(Client::class);
            $client = $clientRepository->findOneBy(array('username' => $data['username'], 'password' => $data['password']));
            if($client){
                $response = createJWT($client, $response);
            }else{
                $response = $response->withStatus(401);
            }
        } else {
            $response = $response->withStatus(400);
        }

        return $response;
        
    });

$app->post('/api/signup',
    function (Request $request, Response $response) {
        global $entityManager;
        $body = $request->getParsedBody();
        //$data = json_decode($body, true);
        $data = $body;

        if($data) 
        {
            $newClient = new Client();
            $newClient->$username = $data['login'];
            $newClient->$password = $data['password'];
            
            $newClient->$nom = $data['name'];
            $newClient->$prenom = $data['firstName'];
            $newClient->$telephone = $data['phone'];
            $newClient->$civilite = $data['civility'];
            $newClient->$adresse = $data['adress'];
            $newClient->$cp = $data['cp'];
            $newClient->$ville = $data['city'];
            $newClient->$pays = $data['country'];
            $newClient->$email = $data['email'];
            
            if($client){
                $response = createJWT($client, $response);
                $entityManager->persist($client);
                $entityManager->flush();
            }else{$response = $response->withStatus(401);}
        } else {$response = $response->withStatus(400);}

        return $response;
        
    });
   
    

$app->get('/api/user',
    function (Request $request, Response $response) {
        $payload = getJWTToken($request);
        $userid = $payload->userid;
        $response->getBody()->write($userid);
        return $response;
    });

/* //méthode avec le bouchon 
$app->get('/api/catalogue',
    function(Request $request, Response $response) {
        $products = file_get_contents("../bouchon/catalogue.json");    
        if($products) {
            $response->getBody()->write($products);  //write(json_encode($products)) bug avec bouchon car on a déjà du json !
        } else {
            $response->withStatus(404);
        }

        return $response;
    });
*/

$app->get('/api/catalogue',
    function(Request $request, Response $response) {
        global $entityManager; //a rajouter à chaque fct
        $ProduitRepository = $entityManager->getRepository(Produit::class); //on récup le repo pr interagir avec la bdd
        $products = $ProduitRepository->findAll(); //on obtient un tableau d'objet, il faut restructurer pr s'en servir dans l'api
        
        if($products) {
            //on restructure
            $rawDataFromBDD = [];
            foreach($products as $product)
            {
                $rawDataFromBDD[] = 
                [
                    "adressePropriete" => $product->getAdressepropriete(),
                    "prix" => $product->getPrix(),
                    "description" => $product->getDescription()
                ];
            }

            $response->getBody()->write(json_encode($rawDataFromBDD));  
        } else {
            $response->withStatus(404);
        }

        return $response;
    });
/*
$app->get('/api/catalogue/{filter}',
    function(Request $request, Response $response, $args) {
        $products = file_get_contents("../bouchon/catalogue.json");

        // s'il n'y a pas d'erreur dans la récupération du bouchon
        if($products) {

            $filterValue = (string)$args['filter'];
            array_filter($products, function($value) use ($filterValue) {
                // si le filtre est similaire à plus de 50% au titre du produit alors on le garde
                return similar_text((string)$value['titre'], $filterValue) > 50;
            })
            $response->getBody()->write($products);
        } else {
            $response->withStatus(404);
        }


        return $response;
    });

    select()
*/

$app->run();
