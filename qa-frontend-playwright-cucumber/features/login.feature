# language: es
Requisito: Inicio de sesión en Sauce Demo

  Como un cliente de Sauce Demo,
  Quiero poder iniciar sesión en la plataforma,
  Para poder ver los productos y realizar compras.

  Antecedentes:
    Dado que el usuario navega a la página de inicio de sesión

  Escenario: Inicio de sesión exitoso con credenciales válidas
    Cuando el usuario ingresa el usuario "standard_user" y la contraseña "secret_sauce"
    Y hace clic en el botón de login
    Entonces debería ingresar correctamente a la página de productos

  Escenario: Intento de inicio de sesión con usuario bloqueado
    Cuando el usuario ingresa el usuario "locked_out_user" y la contraseña "secret_sauce"
    Y hace clic en el botón de login
    Entonces debería ver un mensaje de error que dice "Epic sadface: Sorry, this user has been locked out."

  Esquema del escenario: Intento de inicio de sesión con credenciales inválidas
    Cuando el usuario ingresa el usuario "<usuario>" y la contraseña "<contraseña>"
    Y hace clic en el botón de login
    Entonces debería ver un mensaje de error que contiene "<mensaje>"

    Ejemplos:
      | usuario          | contraseña       | mensaje                                                     |
      | usuario_invalido | secret_sauce     | Username and password do not match any user in this service |
      | standard_user    | clave_incorrecta | Username and password do not match any user in this service |
