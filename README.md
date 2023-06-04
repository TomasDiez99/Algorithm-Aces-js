# Aclaraciones y problemas conocidos:

- Decidimos mostrar en el home page tanto los productos disponibles como los no disponibles en vez de saltearlos.

- El checkout del carrito revisa que el mail proporcionado esté en la base de datos. Esto es una decisión tomada ya que actualmente no hay sistema de login/register para los clientes

- Somos conscientes que al ir a los detalles de cada producto, se hace un fetch a la API para recolectarlos y es redundante ya que se obtuvieron esos datos en el home. Creemos que en este caso, no es un problema prioritario ya que repetir esta solicitud de datos no es prohibitivo. Tambien sucede algo parecido al cargar la pagina home, en la que se piden las categorias, filtros y la grid de productos. En los primeros dos casos, no es tan malo por la misma razón que se nombró anteriormente.

- Hay situaciones con el carrito en las que te deja pasarte del stock de un producto. Esto es posible ya que agregar al carrito no actualiza la base de datos (y por consecuente, el stock visible).

- Cuando compras todo el stock de un producto y haces el checkout desde la pagina home, hasta que no se recargue la página el producto no quedara como deshabilitado. Creemos que esto es porque el navigate del react router no actualiza la pagina cuando ya está en esa misma página. 