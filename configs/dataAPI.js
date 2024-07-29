// Función de búsqueda de productos
function productSearchFunction() {
    const productId = document.getElementById('productIdInput').value;
  
    // **Define the API URL**
    const apiUrl = 'https://pcapi-890z.onrender.com/api/product/';
  
    // Construct the URL with the product ID
    const completeUrl = apiUrl + productId;
  
    // Llamada a la API del backend para obtener datos del producto
    fetch(completeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const productInfo = data.data;
          // Mostrar información del producto
          document.getElementById('productId').textContent = productId;
          document.getElementById('productName').textContent = productInfo.Nombre;
          document.getElementById('effectivePrice').textContent = productInfo['Precio Efectivo'];
          document.getElementById('normalPrice').textContent = productInfo['Precio Normal'];
        } else {
          // Manejar el caso de error (por ejemplo, producto no encontrado)
          alert('Producto no encontrado.');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error al buscar el producto.');
      });
  }
  
  // Función para guardar el producto en LocalStorage
  function saveProductToLocalStorageFunction() {
    const productId = document.getElementById('productId').textContent;
    const productName = document.getElementById('productName').textContent;
    const effectivePrice = document.getElementById('effectivePrice').textContent;
    const normalPrice = document.getElementById('normalPrice').textContent;
  
    const productData = {
      ID: productId,
      nombre: productName,
      precioEfectivo: effectivePrice,
      precioNormal: normalPrice,
    };
  
    localStorage.setItem('savedProduct', JSON.stringify(productData));
    alert('Producto guardado en LocalStorage.');
  }
  