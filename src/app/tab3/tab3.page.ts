import { Component } from '@angular/core';
import {Lugar} from '../models/Lugar';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {AlertController, ToastController} from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public afs: AngularFirestore, private alertController: AlertController,
              public actionSheetController: ActionSheetController, public toastController: ToastController) {

    this.lugaresCollection = afs.collection<Lugar>('lugares');
    this.lugares = this.lugaresCollection.valueChanges();

  }
  // Lugares
  lugaresCollection: AngularFirestoreCollection<Lugar>;
  lugares: Observable<Lugar[]>;
  dash = false;

  // login
  user: string;
  pass: string;


  // Hoja de accion
  async presentarHojaAcciones(lugarId: string, lugarNombre: string, lugarFoto: string, lugarPuntuacion: number, lugarTipo: string) {
    const actionSheet = await this.actionSheetController.create({
      header: lugarNombre,
      buttons: [{
        text: 'Eliminar de la DB',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.delete(lugarId);
          console.log(lugarNombre + 'ha sido eliminado');
        }
      },  {
        text: 'Editar',
        icon: 'pencil',
        handler: () => {
          this.editar(lugarId, lugarNombre, lugarFoto, lugarPuntuacion, lugarTipo);
          console.log('Editando:' + lugarNombre );
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Accion cancelada');
        }
      }]
    });
    await actionSheet.present();
  }


  // CREAR
  // Esta funcion no recibe nada y crea un nuevo lugar
  async nuevo() {

    const alertaNuevo = await this.alertController.create({
      header: 'Nuevo lugar',
      inputs: [
        {
          name: 'Nombre',
          type: 'text',
          placeholder: 'Nombre del lugar'
        },
        {
          name: 'Foto',
          type: 'text',
          placeholder: 'URL de la foto'
        },
        // multiline input.
        {
          name: 'Puntuacion',
          type: 'number',
          max: 5,
          placeholder: 'Puntuacion'
        },
        {
          name: 'Tipo',
          type: 'text',
          placeholder: 'Tipo de lugar'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Edicion cancelada');
          }
        }, {
          text: 'Guardar',
          handler: data => {
            // Generamos el id
            const id = this.generaId(10);

            if (data.Nombre === '' || data.Foto === '' || data.Puntuacion === '' || data.Tipo === '') {
              this.mensaje('Error al agregar. No puede haber campos vacios.', 4000, 'danger');
            } else {
              // Agregamos un nuevo documento
              this.afs.collection('lugares').doc(id).set({
                id,
                foto: data.Foto,
                nombre: data.Nombre,
                // tslint:disable-next-line:radix
                puntuacion: parseInt(data.Puntuacion),
                tipo: data.Tipo
              })
              // tslint:disable-next-line:only-arrow-functions
                  .then(function() {
                    console.log('Documento creado con exito');

                  })
                  // tslint:disable-next-line:only-arrow-functions
                  .catch(function(error) {
                    console.error('Error escribiendo en firestore: ', error);
                  });
              this.mensaje('Lugar creado con exito', 1000, 'success');
            }

          }
        }
      ]
    });

    await alertaNuevo.present();
  }

  // EDITAR
  // Esta funcion recibe el id del documento el cual vamos a editar
  async editar(id: string, nombre: string, foto: string, puntuacion: number, tipo: string) {

    const alertaEdit = await this.alertController.create({
      header: nombre,
      inputs: [
        {
          name: 'Nombre',
          type: 'text',
          value: nombre,
          placeholder: nombre
        },
        {
          name: 'Foto',
          type: 'text',
          value: foto,
          placeholder: foto
        },
        // multiline input.
        {
          name: 'Puntuacion',
          type: 'number',
          max: 5,
          value: puntuacion,
          placeholder: puntuacion.toString()
        },
        {
          name: 'Tipo',
          type: 'text',
          value: tipo,
          placeholder: tipo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Edicion cancelada');
          }
        }, {
          text: 'Guardar',
          handler: data => {
            if (data.Nombre === '' || data.Foto === '' || data.Puntuacion === '' || data.Tipo === '') {
              this.mensaje('Error al editar. Había campos vacios.', 4000, 'danger');
            } else {
              // Agregamos un nuevo documento
              this.afs.collection('lugares').doc(id).update({
                id,
                foto: data.Foto,
                nombre: data.Nombre,
                // tslint:disable-next-line:radix
                puntuacion: parseInt(data.Puntuacion),
                tipo: data.Tipo
              })
              // tslint:disable-next-line:only-arrow-functions
                  .then(function() {
                    console.log('Documento editado con exito');

                  })
                  // tslint:disable-next-line:only-arrow-functions
                  .catch(function(error) {
                    console.error('Error escribiendo en firestore: ', error);
                  });
              this.mensaje('Lugar editado con exito.', 1000, 'success');
            }
          }
        }
      ]
    });

    await alertaEdit.present();
  }

  // DELETE
  // Esta funcion recibe el id del documento a eliminar.
  async delete(id: string) {

    const alertaDelete = await this.alertController.create({
      message: '¿Está seguro de eliminar este lugar permanentemente?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Borrar',
          cssClass: 'primary',
          handler: () => {
            this.afs.collection('lugares').doc(id).delete();
            console.log('eliminado con exito');
            this.mensaje('Eliminado con exito', 1000, 'success');
          }
        }
      ]
    });

    await alertaDelete.present();
  }

  async mensaje(texto: string, duracion: number, estilo: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: duracion,
      position: 'top',
      color: estilo
    });
    await toast.present();
  }
  login() {

    console.log(this.user);
    if (this.user === 'admin' && this.pass === 'pass') {
      this.mensaje('Sesion iniciada correctamente', 1000, 'success');
      this.dash = true;
    } else {
      this.mensaje('Datos erroneos', 1000, 'danger');
    }

  }

  // Funcion para generar IDs
   generaId(length) {
    let resultado  = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longitudCaracteres = caracteres.length;
    for (let i = 0; i < length; i++ ) {
      resultado += caracteres.charAt(Math.floor(Math.random() * longitudCaracteres));
    }
    return resultado;
  }
}
