
# EvaluaciónPJ 

Aplicación para registrar, consultar, modificar, eliminar Edificios y Dependencias del Poder Judicial del Neuquén.

## Instalación

Clonar el repositorio y ejecutar el primer npm install para el primer package.json

```shell
git clone https://github.com/liamosycka/EvaluacionPJ.git
cd EvaluacionPJ
npm install
```

Abrir otra terminal
En 1 dirigirse a la carpeta /api y ejecutar:

```shell
cd api
npm install
```
Así se instalan todas las dependencias del package.json para express js.

En la otra terminal dirigirse a la carpeta /frontend y ejecutar:

```shell
cd frontend
npm install
```

Esto puede tardar varios minutos, ya que es la instalación de todas las dependencias de React js.

Una vez finalizadas ambas instalaciones, chequear que no haya ningún proceso corriendo en el puerto 9000 (express) ni en el 3000 (react) y ejecutar en cada terminal:

```shell
npm start
```
De esta manera, se puede dirigir a http://localhost:3000/ y comenzar a utilizar la aplicación.


### Construido con
El backend fue desarrollado con Express y el frontend con React. Para la base de datos se utilizó SQLite bajo su modo de ejecución en memoria (requisito de la evaluación).

