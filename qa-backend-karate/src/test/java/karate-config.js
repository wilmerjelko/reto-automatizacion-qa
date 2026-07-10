function fn() {
  var env = karate.env; // Obtener propiedad de sistema 'karate.env'
  karate.log('La propiedad de entorno karate.env es:', env);
  
  if (!env) {
    env = 'dev';
  }
  
  var config = {
    env: env,
    baseUrl: 'https://serverest.dev'
  };
  
  // Configuración global de timeouts
  karate.configure('connectTimeout', 10000);
  karate.configure('readTimeout', 10000);
  
  return config;
}
