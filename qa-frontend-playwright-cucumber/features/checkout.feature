# language: es
@checkout
Requisito: Proceso de Compra (Checkout) en Sauce Demo

  Como un cliente de Sauce Demo,
  Quiero agregar productos al carrito y completar la compra,
  Para adquirir los productos que necesito.

  Antecedentes:
    Dado que el usuario inicia sesión con credenciales válidas y está en la página de productos

  @smoke
  Escenario: Completar una compra de forma exitosa
    Cuando el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Y el usuario agrega el producto "Sauce Labs Bolt T-Shirt" al carrito
    Entonces el carrito debería mostrar "2" productos en la insignia
    Cuando el usuario va al carrito de compras
    Entonces debería ver los productos "Sauce Labs Backpack" y "Sauce Labs Bolt T-Shirt" en la lista
    Cuando el usuario avanza al checkout
    Y el usuario completa la información con nombre "Juan", apellido "Perez" y código postal "15001"
    Y el usuario finaliza la compra
    Entonces debería ver el mensaje de confirmación "Thank you for your order!"

  Escenario: Eliminar un producto del carrito antes de comprar
    Cuando el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Y el usuario agrega el producto "Sauce Labs Bike Light" al carrito
    Y el usuario va al carrito de compras
    Entonces el carrito debería contener 2 productos
    Cuando el usuario elimina el producto "Sauce Labs Bike Light" del carrito
    Entonces el carrito debería contener 1 producto
    Y el carrito debería mostrar "1" productos en la insignia
    Y debería ver el producto "Sauce Labs Backpack" en la lista

  Esquema del escenario: Validación de campos obligatorios en el checkout
    Cuando el usuario agrega el producto "Sauce Labs Backpack" al carrito
    Y el usuario va al carrito de compras
    Y el usuario avanza al checkout
    Y el usuario completa la información con nombre "<nombre>", apellido "<apellido>" y código postal "<codigo>"
    Entonces debería ver el error de checkout "<mensaje>"

    Ejemplos:
      | nombre | apellido | codigo | mensaje                          |
      |        | Perez    | 15001  | Error: First Name is required    |
      | Juan   |          | 15001  | Error: Last Name is required     |
      | Juan   | Perez    |        | Error: Postal Code is required   |
