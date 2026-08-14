Feature: Operaciones CRUD para API de Usuarios (ServeRest)

  Background:
    * url baseUrl
    * def userSchema = read('schemas/user-schema.json')
    * def listSchema = read('schemas/list-schema.json')
    # `generateUserData` y `translate` se definen en karate-config.js y quedan
    # disponibles como variables globales para todos los features.

  Scenario: Listar todos los usuarios y validar esquemas de respuesta
    Given path 'usuarios'
    When method get
    Then status 200
    And match response == listSchema
    And match each response.usuarios == userSchema
    # La cantidad reportada debe ser consistente con los registros devueltos
    And match response.quantidade == response.usuarios.length

  Scenario: Buscar un usuario inexistente por ID (Caso Negativo)
    Given path 'usuarios', '1234567890abcdef'
    When method get
    Then status 400
    And match translate(response.message) == 'Usuario no encontrado'

  Scenario: Registrar un usuario sin los campos obligatorios (Caso Negativo)
    Given path 'usuarios'
    And request {}
    When method post
    Then status 400
    # La API responde con un mensaje de validación por cada campo faltante
    And match response contains { nome: '#string', email: '#string', password: '#string' }

  Scenario: Flujo Completo CRUD (Registrar, Buscar, Actualizar y Eliminar un Usuario)
    * def testUser = generateUserData()

    # 1. Registrar un nuevo usuario (POST)
    Given path 'usuarios'
    And request testUser
    When method post
    Then status 201
    And match translate(response.message) == 'Registro realizado con éxito'
    And match response._id == '#string'
    * def createdId = response._id

    # 2. Buscar al usuario registrado por su ID (GET por ID)
    Given path 'usuarios', createdId
    When method get
    Then status 200
    And match response == userSchema
    And match response.nome == testUser.nome
    And match response.email == testUser.email

    # 3. Actualizar la información del usuario existente (PUT)
    * def updatedUser = generateUserData()
    Given path 'usuarios', createdId
    And request updatedUser
    When method put
    Then status 200
    And match translate(response.message) == 'Registro modificado con éxito'

    # Verificar que los datos se actualizaron correctamente
    Given path 'usuarios', createdId
    When method get
    Then status 200
    And match response.nome == updatedUser.nome
    And match response.email == updatedUser.email

    # 4. Eliminar al usuario del sistema (DELETE)
    Given path 'usuarios', createdId
    When method delete
    Then status 200
    And match translate(response.message) == 'Registro eliminado con éxito'

    # Verificar que el usuario ya no existe
    Given path 'usuarios', createdId
    When method get
    Then status 400
    And match translate(response.message) == 'Usuario no encontrado'

  Scenario: Intentar crear un usuario con correo electrónico duplicado (Caso Negativo)
    * def duplicateUser = generateUserData()

    # Crear el usuario por primera vez
    Given path 'usuarios'
    And request duplicateUser
    When method post
    Then status 201
    * def firstId = response._id

    # Intentar crearlo nuevamente con el mismo correo electrónico
    Given path 'usuarios'
    And request duplicateUser
    When method post
    Then status 400
    And match translate(response.message) == 'Este correo electrónico ya está en uso'

    # Limpieza: Eliminar al usuario creado para mantener limpia la base de datos
    Given path 'usuarios', firstId
    When method delete
    Then status 200
