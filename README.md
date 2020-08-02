# portal-user-web

Para a execução desta aplicação é necessário executar os seguintes passos:

 - Baixar o node.js;
 - Baixar o angular através do:
 
  ````sh
	$   npm install -g @angular/cli
  ```` 
  
 - Baixar o projeto do git;
 - Na raiz do projeto, baixar as dependências através do:
 
  ````sh
	$  npm install
  ```` 
  
 - Para rodar basta digitar o dentro da pasta do projeto:
 
  ````sh
	$   ng serve --open
  ```` 
  
 - Caso queria realizar build, executar 
 
  ````sh
	$  ng build
  ````

 - A api se comunicará com Apis 
		 - Auth-Service (Porta:8082)
		 - User-service (Porta:8081)
