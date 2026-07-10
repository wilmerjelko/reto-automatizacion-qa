# language: es
Requisito: Proceso de Compra (Checkout) en Sauce Demo

  Como un cliente de Sauce Demo,
  Quiero agregar productos al carrito y completar la compra,
  Para adquirir los productos que necesito.

  Antecedentes:
    Dado que el usuario inicia sesión con credenciales válidas y está en la página de productos

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
