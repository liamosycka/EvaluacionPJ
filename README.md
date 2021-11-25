
# EvaluaciónPJ 

Aplicación parte de una entrevista que permite registrar, consultar, modificar y eliminar edificios y dependencias del Poder Judicial del Neuquén.

## Decisiones de Diseño
Se tienen dos modelos, edificio y dependencia. Un edificio puede tener 1 o más dependencias mientras que una dependencia corresponde a 1 solo edificio. La manera de representar esto fue con una clave foránea en la tabla de dependencia que apunte a la clave primaria de edificio (esto causa que una dependencia no puede ser dada de alta hasta que no exista el edificio correspondiente). Como políticas de integridad referencial decidí utilizar CASCADE en cada update que haya de la clave primaria de edificio (no debería suceder) y un RESTRICT cuando se quiera eliminar un edificio que ya esté siendo referenciado por una dependencia (ya que sino esto podría causar que por borrar un edificio se borren muchas dependencias).

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

## Uso
En la pantalla principal se verán dos formularios para poder crear edificios y dependencias. Por lo aclarado anteriormente, primero se deben crear edificios para luego poder agregarle una dependencia. Debido a un tema de CORS puede ser que cuando se quiera cargar un edificio la primera vez este no sea dado de alta ya que el navegador primero le envía un método de options al backend, de ocurrir esto, porfavor vuelva a poner los datos e ingrese el edificio (este problema solo ocurre la primera vez y de vez en cuando).

En las pestañas de 'Ver Edificios' y 'Ver Dependencias' se pueden visualizar los datos.

En las pestañas de 'Modificar Edificios' y 'Modificar Dependencias' se pueden visualizar los datos ingresando el ID correspondiente. 

Ejemplo caso edificio: Si se ingresa el ID de un edificio en la pestaña correspondiente se cargarán en los campos los datos que tenga ese edificio. Aquí se puede proseguir a modificarlos cambiando el texto y haciendo click en el botón 'Modificar Edificio' (si se desea, se puede eliminar la tupla con el botón 'Eliminar Edificio'). Si no existe ninguna entrada con ese ID, no se mostrará nada en los datos.


## Construido con
El backend fue desarrollado con Express y el frontend con React. Para la base de datos se utilizó SQLite bajo su modo de ejecución en memoria (requisito de la evaluación).

