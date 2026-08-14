Feature: Autenticación de usuarios (ServeRest)

  Background:
    * url baseUrl

    # Cada escenario trabaja con un usuario propio, creado y eliminado dentro
    # del mismo flujo, para que las pruebas sean independientes y repetibles.
    * def testUser = generateUserData()
    Given path 'usuarios'
    And request testUser
    When method post
    Then status 201
    * def createdId = response._id

  Scenario: Iniciar sesión con credenciales válidas y obtener un token
    Given path 'login'
    And request { email: '#(testUser.email)', password: '#(testUser.password)' }
    When method post
    Then status 200
    And match translate(response.message) == 'Inicio de sesión realizado con éxito'
    And match response.authorization == '#string'
    And match response.authorization contains 'Bearer'

    # Limpieza del usuario creado en el Background
    Given path 'usuarios', createdId
    When method delete
    Then status 200

  Scenario: Iniciar sesión con una contraseña incorrecta (Caso Negativo)
    Given path 'login'
    And request { email: '#(testUser.email)', password: 'clave_incorrecta' }
    When method post
    Then status 401
    And match translate(response.message) == 'Correo electrónico y/o contraseña inválidos'
    And match response.authorization == '#notpresent'

    # Limpieza del usuario creado en el Background
    Given path 'usuarios', createdId
    When method delete
    Then status 200

  Scenario: Iniciar sesión con un correo electrónico no registrado (Caso Negativo)
    Given path 'login'
    And request { email: 'no_registrado_qa@test.com', password: 'password_safe_123' }
    When method post
    Then status 401
    And match translate(response.message) == 'Correo electrónico y/o contraseña inválidos'

    # Limpieza del usuario creado en el Background
    Given path 'usuarios', createdId
    When method delete
    Then status 200
