### Imagenes
> _**Descarga imagenes** en el local._
```bash
$ docker pull [NAME_IMAGE]
# docker pull node  
$ docker pull [NAME_IMAGE]:[TAG]
# docker pull node:18  

'Sin poner TAG descargara la más reciente'
```
<br>

> _**Eliminar imagenes** en el local._
```bash
$ docker image rm [NAME_IMAGE]
# docker image rm node  
$ docker image rm [NAME_IMAGE]:[TAG]
# docker image rm node:18
$ docker rmi [NAME_IMAGE]
# docker rmi node  
$ docker rmi --force [NAME_IMAGE]
# docker rmi --force node
'--force o -f es para forzar la elimación'
```
<br>

> _**Listar imagenes** descargardas en local._
```bash
$ docker images
```
<br>

### Contenedores
> _**Crear contenedor** de forma **rapida**_
```bash
'docker run es una combinación de pull, create y start'
  '1. Mira si la IMAGE esta descargada, sino la descarga (PULL)'
  '2. Crear un CONTAINER (CREATE)'
  '3. Ejecuta el CONTAINER (START)'
$ docker run [NAME_IMAGE]
# docker run mongo  
$ docker run --detach [NAME_IMAGE]
# docker run --detach mongo  
'--detach o -d para correr el CONTAINER en segundo plano, de esta forma sale de logs y puedes seguir usando la consola'
$ docker run --name [NAME] -p [PORT_HOST]:[PORT_CONTAINER] -d [NAME_IMAGE]
# docker run --name mongo_test -p 27017:27017 -d mongo 
```
<br>

> _**Crear Contenedor**_
```bash
$ docker container create [NAME_IMAGE]:[TAG]
# docker container create mongo
$ docker create [NAME_IMAGE]:[TAG]
# docker create mongo
$ docker create --name [NAME] [NAME_IMAGE]
# docker create --name mongo-test mongo
'--name es una etiqueta para asociarle un alias a ese contenedor'
$ docker create --network [NAME_NETWORK]
# docker create --network mi-red
'--network define en que network va estar el container'
$ docker create -p [PORT_HOST]:[PORT_CONTAINER] [NAME_IMAGE]
# docker create -p mongo
'--publish o -p sirven para comunicar los puertos del host con los del contenedor.
Si no se coloca el primer puerto docker te pondra uno random'
```
<br>

> _**Eliminar Contenedor**_
```bash
$ docker container rm [ID_CONTAINER]
# docker container rm e1b62f6a81cd  
$ docker container rm [NAME_CONTAINER]
# docker container rm mongo-test
$ docker rm [NAME_IMAGE]
# docker rm mongo-test
```
<br>

> _**Iniciar Contenedor**_
```bash
$ docker start [ID_CONTAINER]
# docker start e1b62f6a81cd
$ docker start [NAME_CONTAINER]
# docker start mongo-test
```
<br>

> _**Parar Contenedor**_
```bash
$ docker stop [ID_CONTAINER]
# docker stop e1b62f6a81cd
$ docker stop [NAME_CONTAINER]
# docker stop mongo-test
```
<br>

> _**Ver Logs del Contenedor**_
```bash
$ docker logs [ID_CONTAINER]
# docker logs e1b62f6a81cd  
$ docker logs [NAME_CONTAINER]
# docker logs mongo-test
$ docker logs --follow [NAME_CONTAINER]
# docker logs mongo-test
'--follow o -f para ver logs en tiempo real'
```
<br>

> _**Ver Detalles** del **Contenedor**_
```bash
$ docker container inspect [ID_CONTAINER]
# docker container inspect e1b62f6a81cd  
$ docker container inspect [NAME_CONTAINER]
# docker container inspect mongo-test
```
<br>

> _**Ver Puertos** abiertos de un **Contenedor**_
```bash
$ docker port [ID_CONTAINER]
# docker port e1b62f6a81cd  
$ docker port [NAME_CONTAINER]
# docker port mongo-test
```
<br>

> _**Listar Contenedores**_
```bash
$ docker ps
'Muestra los contenedores activos'
$ docker ps -a
'Muestra todos los contenedores'
```
<br>

> _**Entrar al contendor** por **terminal**_
```bash
$ docker exec -ti [NAME_CONTAINER] [NAME_SHELL]
# docker exec -ti mongo_test bash
'--tty o -t abre la terminal'
'--interactive o -i hace que sea interactiva'
$ docker exec --user [NAME_USER] -ti [NAME_CONTAINER] [NAME_SHELL]
# docker exec --user ricardo -ti mongo_test bash
'--user o -u para entrar con un usuario'
```
<br>

> _**Ver estadisticas** del **Container**_
```bash
$ docker stats [NAME_CONTAINER]
# docker stats mongo_test
```
<br>

> _**Copiar ficheros** locales al **Container**_
```bash
$ docker cp [NAME_CONTAINER]:[ROUTE_CONTAINER] [ROUTE_HOST] 
# docker cp bd:/test/test.text contaner/bd
```
<br>

> _**Crear imagen** a partir de un **Container**_
```bash
$ docker commit [NAME_CONTAINER] [NAME_NEW_IMAGE]
# docker commit nginx-v1 nginx-custom
```
<br>

### Network
> _**Crear Networks**_
```bash
$ docker network create [NAME_NETWORK]
# docker network create my-red
```
<br>

> _**Conectar una Network** a un **Container**_
```bash
$ docker network connect [NAME_NETWORK] [NAME_CONTAINER]
#docker network connect network-b container-a
```
<br>

> _**Desconectar una Network** a un **Container**_
```bash
$ docker network disconnect [NAME_NETWORK] [NAME_CONTAINER]
#docker network disconnect network-b container-a
```
<br>

> _**Eliminar Networks**_
```bash
$ docker network rm [NAME_NETWORK]
# docker network rm my-red
```
<br>

> _**Eliminar No Usadas Networks**_
```bash
$ docker network prune 
```
<br>

> _**Listar Networks**_
```bash
$ docker network ls
```
<br>

> _**Ver Detalles Network**_
```bash
$ docker network inspect [NAME_NETWORK]
# docker network inspect my-red
```
<br>

### Volumes
  > Sirven para persistir datos dentro de los distintos contenedores

  ##### _1. Anonimo:_ 
  _Solo se indica que carpeta monta, por lo que docker lo gestionara donde se montara, y por eso no podemos hacer referencia para utilizarlo con otro contenedor_
  ```bash
  $ docker run -v [ROUTE_CONTAINER] [NAME_CONTAINER]
  # docker run -v /var/lib/mysql mysql:5.7
  ```

  ##### _2. Anfitrion o Host:_ 
  _Seleccionas que carpeta montar y donde se monta_
  ```bash
  $ docker run -v [ROUTE_HOST]:[ROUTE_CONTAINER] [NAME_CONTAINER]
  # docker run -v c:/Curso_Docker/mysql:/var/lib/mysql mysql:5.7
  ```
  
  ##### _3. Nombrado:_ 
  _Igual que el anonimo solo que si vas a poder referenciar el volumen_
  > Debes crear un volumen y asignarlo
  ```bash
  $ docker run -v [NAME_VOLUME] [NAME_CONTAINER]
  # docker run -v my-volume mysql:5.7
  ```
<br>

> _**Crear un volumen**_
```bash
$ docker volume create [NAME_VOLUME]
# docker volume create my-db
```
<br>

> _**Eliminar un volumen**_
```bash
$ docker volume rm [NAME_VOLUME]
# docker volume rm my-db
```
<br>

> _**Eliminar TODOS los volumenes**_
```bash
$ docker volume prune
# docker volume prune
```
<br>

> _**Listar volumenes**_
```bash
$ docker volume ls
```
<br>

> _**Ver detalles del volumen**_
```bash
$ docker volume inspect [NAME_VOLUME]
# docker volume inspect mysql-db
```
<br>

### Dockerfile
 _Dockerfile sirve para crear nuestrar propias imagenes_

> _**Crear imagen** a través de **Dockerfile**_
```bash
$ docker build --tag [NAME] [ROUTE_FILE]
# docker build --tag miapp .
'--tag o -t para indicar el nombre, tambien se le puede poner 
etiquetas [NAME]:[LABEL]'
```
<br>

1. **FROM** 
``
FROM node:18 
``
_Indica la imagen en que se va basar_

2. **RUN** 
``
RUN mkdir -p /home/app
``
_Ejecuta comandos del OS de la image_

3. **WORKDIR** 
``
WORKDIR /home/app
``
_Te mueve a una ruta y trabajaras en ella_

4. **COPY** 
``
COPY . /home/app
``
_Copia directorios de la maquina local a la imagen
(La primera ruta es el local, la segunda la ruta de la imagen)_

5. **EXPOSE** 
``
EXPOSE 3000
``
_Exponemos el puerto para que otros contenedores o el host se puedan conectar a la imagen_

6. **CMD** 
``
CMD ["node", "/home/app/index.js"]
``
_Comando para que la app se inicie (Parametros si són necesarios)_

7. **LABEL** 
``
LABEL [NAME_LABEL]=["VALUE"]
``
_Atributos para poner metadatos_

8. **ENV** 
``
ENV [NAME_ENV] [VALUE]
``
_Define las variables de entorno_

9. **USER** 
``
USER [NAME_USER]
``
_Entra en la sesion de un usuario_


### Crear una comunicación entre containers

  * #### _Forma tradicional_
    ###### _1.  Descarga la image_
    ###### _2.  Crear una red_
    ###### _3.  Crear contenedor_
      * ###### _3.1. Asignar nombre_
      * ###### _3.2. Asignar env_
      * ###### _3.3. Especificar red_
  
_Todo estos pasos se deberian de hacer por cada contenedor_
  
  * #### _Docker Compose_
_Con docker compose nos ahorraremos todos esos comandos, para ello usaremos un fichero llamado docker-compose-yml_
    
### Docker Compose
> _**Crea e inicia** los containers con **docker-compose.yml**_
```bash
$ docker compose up
# docker compose up
$ docker compose --file [ROUTE_DOCKER-COMPOSE] up
# docker compose --file docker-compose-dev-yml up
'--file o -f para indicar el fichero que se quiere procesar'
```
<br>

> _**Borrar los containers e images** del **docker-compose.yml**_
```bash
$ docker compose down
# docker compose down
```
<br>

1. **VERSION** 
``
version: "3.9" 
``
_Indica la version de docker-compose con la que se analizara el fichero_

2. **SERVICES** 
_En services definimos los contenedores_
```
services:
  [NAME_CONTAITER]:
    build: [ROUTE_DOCKERFILE]
    image: [NAME_IMAGE]
    environment:
      - [NAME_VARIABLE]=[VALUE]
    ports:
      - "[PORT_HOST]:[PORT_CONTAINER]"
    links:
      - [NAME_CONTAINER]
    volumes:
      - [NAME_VOLUME]:[ROUTE_STORE_DATA]
```
_Build &rarr; Para construir la imagen, ha de pasarse un dockerfile_


> Build puede tener tener dos parametros:
```
build:
  context: [ROUTE_APP]
  dockerfile: [ROUTE_DOCKERFILE]
```
_Context &rarr; Ruta donde se encuentra la app o contexto con el que va a trabajar_
_Dockerfile &rarr; Ruta donde esta el dockerfile_

---
_Ports &rarr; Para definir los puertos por donde se conectara el host y el container_
_Links &rarr; Se le coloca un container y este podra ver el container_
_Image &rarr; Imagen de donde parte el container_
_Environment &rarr; Crear las variables de entorno_
_Volumes &rarr; Define los volumes que va utilizar el container_


3. **VOLUMES** 
_Define los volumes_
```
volumes:
  [NAME_DATA]:
```
