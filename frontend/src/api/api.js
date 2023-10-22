export { Api }
//para conectar con el api
class Api {
  static token;
  //getter estatico
  static get baseUrl() {
    return "http://localhost:8080/api";
  }
  //en miliseconds
  static get timeout() {
    return 60 * 1000;
  }

  static createCallInfo(content, methodName){
    if (methodName === 'POST' || methodName === 'PUT')
    return {
        method: methodName,
        headers: {
        'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(content)
    };
    else{
        return {
            method: methodName,
            params: JSON.stringify(content)
        }
    }
}

  //se usa el token para autenticar que hay un usuario verificado usando los endpoints con restricciones
  //se toma en init el {} por defecto
  //fetch no maneja por default un timeout
  //debería tener un tiempo razonable para informar si no devolvio nada el navegador
  //abort controller -> flag por si hubo una interrupcion
  static async fetch(url, secure, init = {}, controller) {
    //si es un endpoint con seguridad agrego esa linea
    if (secure && Api.token) {
      //se agrega el headers si no estaba en el init (podría ser un GET o un DELETE)
      if (!init.headers){
        init.headers = {};
        if ( init != {})
          url = url + '?' + new URLSearchParams(init)
      }
        
      //con esto se evita pisar todo lo que ya habia en el init agregando el campo authorization
      init.headers['Authorization'] = `bearer ${Api.token}`;
    }

    //dentro del init con toda la info vinculo el signal del controller para que termine ni bien falla
    controller = controller || new AbortController();
    init.signal = controller.signal;
    //primero la funcion que se va a ejecutar tras el timeout-> abort-> levanta el flag
    const timer = setTimeout(() => controller.abort(), Api.timeout);

    //llamado al fetch del navegador con manejo de errores
    try {
      //es una promesa
      const response = await fetch(url, init);
      //evito que me de error si me devuelve un objeto void
      const text = await response.text();
      const result = text ? (JSON).parse(text) : {};
      //si tiene la prop code es porque hay un error
      //.code me daria undefined y de ahi pasa a ser false
      if (result.code)
        throw result;
      return result;
    } catch (error) {
      if (error.code)
        throw error;
      //si dio error al abortar-> genero un error a nivel de navegador
      //se busca que el manejo de errores despues sea transparente
      if (error.name === "AbortError")
        throw { "code": 98, "description": error.message.toLowerCase() };
      else if (error.name === "TypeError")
        throw { "code": 99, "description": error.message.toLowerCase() };
    } finally {
      //quiero que se detenga el temporizador si ya slio
      clearTimeout(timer);
    }
  }


  static async getWithParam(url, secure, queryInfo, controller) {
    return await Api.fetch(url, secure, queryInfo, controller);
  }

  static async get(url, secure, controller) {
    return await Api.fetch(url, secure, {},controller);

  }

  static async post(url, secure, data, controller) {
    return await Api.fetch(url, secure, Api.createCallInfo(data, 'POST'), controller);
  }

  static async put(url, secure, data, controller) {
    return await Api.fetch(url, secure, Api.createCallInfo(data, 'PUT'), controller);
  }

  static async delete(url, secure, controller) {
    return await Api.fetch(url, secure, Api.createCallInfo({}, 'DELETE'), controller);
  }
  static setToken(token) {
    this.token = token;
  }

}