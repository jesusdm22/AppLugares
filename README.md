# AppLugares
Aplicación híbrida basada en Angular e Ionic


Alumno: Jesús Díaz Muñoz.
Profesor: José María García de Polavieja Ferre
Aplicación: AppLugares

Proyecto 3º Evaluación CSI2
Índice de contenido:
1.	Descripción del funcionamiento de la aplicación.
2.	Tecnologías usadas.
3.	Árbol de carpetas y componentes.
4.	Modelo principal (Clase).
5.	Descripción de la programación de cada componente.

NOTA INICIAL: El objetivo con el que he desarrollado ésta aplicación ha sido iniciarme en el desarrollo de aplicaciones híbridas, aprender a manejar con soltura una base de datos no relacional como lo es Firebase y tomar fluidez en el paso de datos entre componentes, base de datos y entrada de datos por parte del usuario. 
 
Descripción de la aplicación.

AppLugares tiene como objetivo guardar como favoritos los lugares que a primera vista e impresión, podrían encajar con tus gustos.
Su funcionamiento se divide en 3 apartados.
Lugares: 
Es la pestaña principal de inicio, en la cual irán apareciendo los lugares disponibles. En cada lugar nos aparecerá un botón de “Me gusta (❤)” y “No me gusta (X)”. Si hacemos click en “X” pasaremos a ver el siguiente lugar. En cambio, si hacemos click en “❤”, pasaremos al siguiente lugar también pero a diferencia de que éste lugar será guardado en la pestaña “Favoritos”.
 
Favoritos:
En esta pestaña podremos volver a ver los lugares a los que hemos dado “❤”. Dispondremos de un botón con una X marcado en rojo para eliminar el lugar de nuestra lista de favoritos.
Haciendo click en el lugar, se nos abrirá un modal con toda la información del sitio (*detalles).
*Detalles: 
Este componente se encarga de mostrar la información de una manera más amplia y mejor maquetada. Este componente se lanza al hacer click en un ítem de “Favoritos”.



















Panel de control (administrador):
Este componente tiene por medio un sistema de inicio de sesión, por lo cual sólo podrán acceder los usuarios que dispongan de la contraseña. En este componente tendremos total control de la base de datos y los elementos que se almacenan en ella, pudiendo así, editar los lugares ya existentes, agregar nuevos, e incluso eliminar definitivamente un lugar de la base de datos.

   




Tecnologías usadas.

El desarrollo de esta aplicación está basado en Angular, gestionado por Ionic Framework. De esta manera tenemos una aplicación híbrida, la cual está escrita en código web, y por tanto puede ser ejecutada en un navegador.
Por otro lado, se nos permite la compilación para Android e iOS mediante Cordova, que hace de puente entre el código nativo y el web.
La base de datos está alojada en Cloud Firestore (Firebase), un sistema de base de datos no relacional gestionado por Google. 


Árbol de carpetas y componentes aplicación.

 

Modelo principal.

Es el modelo en el que está basado la aplicación. Un lugar. Un lugar está formado de:
	Un nombre, una foto, un tipo, y una puntuación.
Adicionalmente, un id, que nos servirá para identificarlo en la base de datos.
 
 
Descripción de la programación de cada componente.

TAB1 (Lugares):
	MAQUETACIÓN
	Realizada mediante Ion-Slides.
	LÓGICA
En primer lugar hemos usado dos colecciones, para traernos las tablas de la base de datos desde Firebase.
En el constructor del componente, creamos un campo que nos permita acceder a Firebase (afs), y un controlador de notificaciones (toastController).
En su definición, a cada colección asignamos una tabla de Firebase.
Tabla usada: “LUGARES”
FUNCIONES
	next() -> Pasa al siguiente slide.
	nextAdd() -> Función asincrónica, la cual recibe los datos del elemento al que le hemos dado like y lo sube a la base de datos. También pasa al siguiente.
mensaje() -> Crea una notificación y la muestra.




 
TAB2 (Favoritos):
	MAQUETACIÓN
	Realizada mediante Ion-Item.
	LÓGICA
En primer lugar hemos usado dos colecciones, para traernos las tablas de la base de datos desde Firebase.
En el constructor del componente, creamos un campo que nos permita acceder a Firebase (afs), un controlador de notificaciones (toastController), un controlador de modal (modalController) y un controlador de alerta (alertController).
En su definición, a cada colección asignamos una tabla de Firebase.
Tabla usada: “FAVORITOS”
FUNCIONES
	delete() -> Recibe el id del elemento a eliminar, crea una alerta y pide confirmación, si se confirma borra el elemento de la base de datos, si no, se cierra la alerta
	showDetalles() -> Función la cual muestra un modal con todos los datos del lugar en el que hemos hecho click. Recibe un Lugar, y llama a una función (presentModal) al que le pasa los mismos parámetros.
presentModal() -> Recibe un lugar, construye el modal usando la página (Detalles), y lo lanza.
mensaje() -> Crea una notificación y la muestra.
 
TAB3 (PANEL DE CONTROL):
	MAQUETACIÓN
	Realizada mediante Ion-Item, Ion-Input para login
	LÓGICA
En primer lugar hemos usado dos colecciones, para traernos las tablas de la base de datos desde Firebase.
En el constructor del componente, creamos un campo que nos permita acceder a Firebase (afs), un controlador de notificaciones (toastController), una hoja de acciones (actionSheetController) y un controlador de alerta (alertController).
En su definición, a cada colección asignamos una tabla de Firebase.
Tabla usada: “LUGARES”.
Declaramos también un booleano (dash) para ocultar el login o mostrarlo y las credenciales son correctas.
Además, un campo user y pass, que serán string, para  validar la entrada de datos del usuario.

La pasalera del login es sencilla. Toda la página está oculta, y el login se está mostrando. Si al dar en “Iniciar sesión” las credenciales son correctas, la variable “dash” se pone a true, por lo que el panel de control es mostrado y el login se oculta. Esto es posible mediante *ngIf

FUNCIONES
	presentarHojaAcciones() -> Recibe un lugar, crea una hoja de acciones con varias opciones. 
La opción de eliminar de la base de datos, llama a la función delete(), que recibe un id, y elimina ese elemento de la base de datos.

La opción editar, llama a la función editar(), que recibe un id, construye una alerta con campos input, y al dar OK los actualiza en la base de datos.

La opción cancelar simplemente sale de la hoja de acciones.

	nuevo() -> Esta función crea y lanza una alerta con un formulario de entrada de datos, que serán validados para no tener campos vacios. Una vez finalizada la entrada de datos, se procederá a guardarlo en la base de datos, concretamente en la tabla “LUGARES”.  El id del nuevo elemento será generado mediante la función generaId().
En cambio,  si hay errores en los campos, se lanzará una notificación mediante toastController y se cerrará la alerta con el formulario.
editar() -> Recibe un lugar, y coloca todos los datos en un formulario. Podemos editarlo mediante los inputs, y aquí el funcionamiento es igual que en la función anterior, si son correctos, actualizamos la base de datos, si no, lanzamos una notificación y cerramos el formulario
delete() -> Recibe el id del elemento a eliminar, construye y lanza una alerta que pide confirmación, si se confirma, el elemento será eliminado, si no, se cerrará la alerta y no ocurrirá nada.

login() -> En esta función comprobaremos que los datos que introdujo el usuario en el formulario de login sean iguales que los de la condición. Si lo son,  construimos una notificación de éxito y ponemos el booleano de “dash” a true para mostrar el panel de control. Si los datos son erróneos, el panel de control sigue estando oculto.

generaId() -> En Firebase, los id son strings. Para generar nuestros propios id.  En esta función tenemos un string con el abecedario completo y números de 1 cifra. Con un ciclo for y un random logramos devolver una cadena con caracteres mezclados.
 
DETALLES (Pagina (Modal)):
	MAQUETACIÓN
	Realizada mediante HTML y elementos Ionic
	LÓGICA
En el constructor del componente, creamos un controlador de modal (modalController).
En su definición, obtenemos los datos de los input de la pagina anterior mediante la anotación @Input. Estos campos serán string.

FUNCIONES
	closeModal() -> Esta función será llamada desde un botón HTML. En su definición simplemente usamos la opción “dismiss” para cerrar el modal y volver donde estábamos.


