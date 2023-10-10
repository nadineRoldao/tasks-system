# tasks-system

    Este projeto é um teste que realizei para um processo seletivo, onde construi o frontend com Angular 16, MySql como banco de dados e o backend com Java 17 e SpringBoot 3.

## Acesso ao Projeto
```
http://149.100.154.83:4200/tarefas
```

## StartUp do Projeto
***
Pré requisitos:
- docker e docker-compose instalados
- as portas: 3306, 8088 e 4200 devem estar disponíveis
***

- StartUp Frontend (Vá para o diretório do front)
```
cd tasks-system-frontend
```

- executar docker compose
```
docker-compose down && docker-compose build --no-cache && docker-compose up
```

- StartUp backend (Vá para o diretório do back)
```
cd tasks-system-backend
```

- executar docker compose (as)
```
docker-compose down && docker-compose build --no-cache && docker-compose up
```

- em caso do erro na primeiro execução, execute novamente:
```
docker-compose up 
```


## URL inicial do app (localhost)
```
http://localhost:4200/tarefas
```

## Banco de dados:
*** 
    - MySQL 8

## Backend:
***
    Para a construção do backend estou utilizando o flyway para o versionamento das mudanças do banco de dados, também utilizo SpringData com hibernate extendendo os métodos da JpaRepository para que eu possa utilizar as queries que a biblioteca possui. Também criei classes de validação para tratar exceptions e impedir que o usuário crie um dado que não é permitido. Para a criação da lógica estou utilizando uma service que contém os métodos que validam e constroem toda a lógica do sistema. Para contrução da API estou construindo um controller que recebe os dados do da service e utiliza os verbos http para a criação dos requests que serão utilizados no frontend.
***
    - JDK 17
    - SpringBoot 3
    - SpringData
    - Maven 3.8
    - FlyWay (database history manager)
    - projeto estruturado utilizando arquitetura em camadas (service, repository, controller, etc)

## Frontend:
***
    Para a contrução do frontend estou utilizando o módulo AppRoutingModule para a configuração das rotas do frontend. Também criei componentes cada um com sua responsabilidade para a criação, deleção, edição e ordenação da lista de tarefas. Para fazer a conexão com o backend estou criando uma service injetável para poder utilizar os métodos vindos do backend. Para a manipulação de edição e adição dos campos data limite e custo estou criando diretivas que convertem os dados informados quando o usuário digita para que o usuário não possa inserir dados incompatíveis com o que o sistema pede. Ainda com a manipulação dos mesmos campos, tive que crias pipes para que o dado convertido inserido pelo usuário seja convertido de volta para o formato que será aceito pelo banco de dados.
***
    - Angular 16
	- ReactiveForms
    - rxjs
    - projeto estruturado utilizando arquitetura em camadas

## DevOps
Utilizamos para a parte do deploy dos projetos:
- github actions
- Docker e docker-compose
- nginx como servidor web
- Hostinger para hospedagem
- comandos linux. Vide /tasks-system-backend/build.sh

## Considerações finais sobre o projeto:
***
	- O estilo poderia ser melhor, porém por falta de tempo decidi deixar com um estilo básico para executar as funcionalidades do sistema

	- Iniciei o desenvolvimento quarta-feira de manhã e finalizei na quinta-feira à noite por complicações com relação à formatação da data
