export { Api }

class Api {
  static token;
  static get baseUrl() {
    return "http://localhost:8080/api";
  }
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

  static async fetch(url, secure, init = {}, controller) {
    if (secure && Api.token) {
      if (!init.headers){
        init.headers = {};  
      }
      init.headers['Authorization'] = `bearer ${Api.token}`;
    }
    controller = controller || new AbortController();
    init.signal = controller.signal;
    const timer = setTimeout(() => controller.abort(), Api.timeout);
    try {
      const response = await fetch(url, init);
      const text = await response.text();
      const result = text ? (JSON).parse(text) : {};
      if (result.code)
        throw result;
      return result;
    } catch (error) {
      if (error.code)
        throw error;
      if (error.name === "AbortError")
        throw { "code": 98, "description": error.message.toLowerCase() };
      else if (error.name === "TypeError")
        throw { "code": 99, "description": error.message.toLowerCase() };
    } finally {
      clearTimeout(timer);
    }
  }

  static async getWithParam(url, secure, queryInfo, controller) {
    return await Api.fetch(url , secure, {}, controller);
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
