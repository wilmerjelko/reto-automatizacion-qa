function fn() {
  var env = karate.env; // Obtener propiedad de sistema 'karate.env'
  karate.log('La propiedad de entorno karate.env es:', env);

  if (!env) {
    env = 'dev';
  }

  var config = {
    env: env,
    // Permite sobrescribir la URL base sin tocar el código:
    // mvn test -DbaseUrl=http://localhost:3000
    baseUrl: karate.properties['baseUrl'] || 'https://serverest.dev'
  };

  if (env === 'local') {
    config.baseUrl = karate.properties['baseUrl'] || 'http://localhost:3000';
  }

  // Configuración global de timeouts
  karate.configure('connectTimeout', 10000);
  karate.configure('readTimeout', 10000);

  /**
   * Generador de datos dinámicos para evitar colisiones de correos electrónicos
   * entre ejecuciones consecutivas de la suite.
   */
  config.generateUserData = function () {
    var rand = Math.floor(Math.random() * 1000000) + '' + new Date().getTime();
    return {
      nome: 'Usuario QA ' + rand,
      email: 'reto_qa_' + rand + '@test.com',
      password: 'password_safe_123',
      administrador: 'true'
    };
  };

  /**
   * Traduce los mensajes de respuesta del servidor (portugués -> español).
   * Permite mantener las aserciones de los features totalmente en español.
   */
  config.translate = function (msg) {
    var translations = {
      'Usuário não encontrado': 'Usuario no encontrado',
      'Cadastro realizado com sucesso': 'Registro realizado con éxito',
      'Registro alterado com sucesso': 'Registro modificado con éxito',
      'Registro excluído com sucesso': 'Registro eliminado con éxito',
      'Este email já está sendo usado': 'Este correo electrónico ya está en uso',
      'Login realizado com sucesso': 'Inicio de sesión realizado con éxito',
      'Email e/ou senha inválidos': 'Correo electrónico y/o contraseña inválidos'
    };
    return translations[msg] || msg;
  };

  return config;
}
