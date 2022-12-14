import { /* inject, */ BindingScope, injectable} from '@loopback/core';
// Nuevas librerias
const generator = require("password-generator");
const cryptoJS = require("crypto-js");

import {repository} from '@loopback/repository';
import {configuracion} from '../config/config';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(@repository(UsuarioRepository)
  public usuarioRepository: UsuarioRepository/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
  //Generacion de claves
  GenerarClave() {
    let clave = generator(8, false);
    return clave;
  }

  CifrarClave(clave: String) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  //JWT
  GenerarTokenJWT(usuario: Usuario) {
    let token = jwt.sign({
      data: {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre + " " + usuario.apellidos
      }
    }, configuracion.claveJWT)

    return token
  }
  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, configuracion.claveJWT);
      return datos;
    } catch (error) {
      return false;
    }
  }
  //Autenticacion
  identificarPersona(correo: string, password: string) {
    try {
      let p = this.usuarioRepository.findOne({
        where:
        {
          correo: correo,
          password: password
        }
      })
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

}
