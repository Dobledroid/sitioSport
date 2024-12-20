/* eslint-disable */

// import React, { useEffect, useState, useCallback  } from 'react';
// import { Link } from 'react-router-dom';
// import Header from '../../Esquema/Header';
// import Footer from '../../Esquema/Footer';
// import { baseURL } from '../../api.js';
// import Spinner from '../utilidades/Spinner';
// import './Productos.css';
// import SearchBar from '../SearchBar.js';

// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function SidebarItem({ title, items, onFilter, type }) {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showMore, setShowMore] = useState(false);

//   const handleToggleShowMore = (event) => {
//     event.preventDefault();
//     setShowMore(!showMore);
//   };

//   const handleItemClick = (item) => {
//     setSelectedItem(item);
//     setShowMore(false);
//     onFilter(item, type);
//   };

//   const clearSelection = () => {
//     setSelectedItem(null);
//     onFilter(null, type);
//   };

//   return (
//     <div className="sidebar__item">
//       <h4>{title}</h4>
//       <ul>
//         {selectedItem && (
//           <li>
//             <span>{selectedItem.nombre}</span>
//             <button className='ms-2' onClick={clearSelection}>X</button>
//           </li>
//         )}
//         {!selectedItem &&
//           items.slice(0, showMore ? items.length : 5).map((item, index) => (
//             <li key={index}>  
//             {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//               <a href="#" onClick={() => handleItemClick(item)}>
//                 {item.nombre}
//               </a>
//             </li>
//           ))}
//         {!selectedItem && items.length > 5 && (
//           <li>
//               {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//             <a href="#" onClick={handleToggleShowMore}>
//               {showMore ? 'Ver menos' : 'Ver más'}
//             </a>
//           </li>
//         )}
//       </ul>
//     </div>
//   );
// }

// function ProductItem({ product }) {
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [idUsuario, setIdUsuario] = useState(null);
//   const [idFavorito, setIdFavorito] = useState(null);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user) {
//       setIdUsuario(user.ID_usuario);
//       checkIfFavorite(user.ID_usuario, product.ID_producto);
//     }
//   }, [product.ID_producto]);

//   const checkIfFavorite = async (userId, productId) => {
//     try {
//       const response = await fetch(`${baseURL}/favoritos/${userId}/${productId}`);
//       if (response.ok) {
//         const data = await response.json();
//         setIsFavorite(data.isFavorito);
//         setIdFavorito(data.ID_favorito);
//       }
//     } catch (error) {
//       console.error('Error de red:', error);
//     }
//   };

//   const toggleFavorite = async (event) => {
//     event.preventDefault();

//     if (!idUsuario) {
//       toast.warning('Por favor, inicie sesión para agregar a favoritos.');
//       return;
//     }

//     if (isFavorite) {
//       // Eliminar de favoritos
//       try {
//         const deleteResponse = await fetch(`${baseURL}/favorito/${idFavorito}`, {
//           method: 'DELETE'
//         });

//         if (deleteResponse.ok) {
//           setIsFavorite(false);

//         } else {
//           console.error('Error al eliminar el producto de favoritos');
//         }
//       } catch (error) {
//         console.error('Error de red:', error);
//       }
//     } else {
//       // Agregar a favoritos
//       try {
//         const addResponse = await fetch(`${baseURL}/favoritos`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             ID_usuario: idUsuario,
//             ID_producto: product.ID_producto,
//           }),
//         });

//         if (addResponse.ok) {
//           const data = await addResponse.json();
//           setIsFavorite(true);
//           setIdFavorito(data.ID_favorito); // Guarda el nuevo ID del favorito

//         } else {
//           console.error('Error al agregar el producto a favoritos');
//         }
//       } catch (error) {
//         console.error('Error de red:', error);
//       }
//     }
//   };


//   const shareProduct = (event) => {
//     event.preventDefault();
//     const shareUrl = `/product-details/${product.ID_producto}`;
//     const shareText = `Mira este producto: ${product.nombre}`;
//     if (navigator.share) {
//       navigator.share({
//         title: product.nombre,
//         text: shareText,
//         url: shareUrl,
//       })
//         .then(() => console.log('Producto compartido con éxito'))
//         .catch((error) => console.error('Error al compartir el producto', error));
//     } else {
//       alert(`Comparte este enlace: ${shareUrl}`);
//     }
//   };


//   return (
//     <div className="col-lg-4 col-md-6 col-sm-6">
//       <div className="product__item">
//         <div className="product__item__pic set-bg">
//           <img src={product.imagenUrl} alt={product.nombre} />
//           <ul className="product__item__pic__hover">
//               {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//             <li><a href="#" onClick={toggleFavorite}><i className="fa fa-heart" style={{ color: isFavorite ? 'red' : 'black' }}></i></a></li>
//               {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//             <li><a href="#" onClick={shareProduct}><i className="fa fa-retweet"></i></a></li>
//             {/* <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li> */}
//           </ul>
//         </div>
//         <Link to={`/product-details/${product.ID_producto}`} className="product__item__text">
//           {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
//           <h6><a href="#">{product.nombre}</a></h6>
//           <h5>${product.precioFinal}</h5>
//         </Link>
//       </div>
//     </div>
//   );
// }

// const Productos = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categorias, setCategorias] = useState([]);
//   const [marcas, setMarcas] = useState([]);
//   const [subcategorias, setSubcategorias] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [sortOrder, setSortOrder] = useState('0');

//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 9; // Define el número de productos por página

//   const [loading, setLoading] = useState(true);

//   const sortProducts = useCallback((order) => {
//     let sortedProducts = [...filteredProducts];
//     if (order === '1') {
//       sortedProducts.sort((a, b) => a.precioFinal - b.precioFinal);
//     } else if (order === '2') {
//       sortedProducts.sort((a, b) => b.precioFinal - a.precioFinal);
//     } else {
//       sortedProducts = [...products];
//     }
//     setFilteredProducts(sortedProducts);
//   }, [filteredProducts, products]);

// const handleFilter = useCallback(async (selectedItem, type) => {
//   const newFilters = { ...filters };
//   if (selectedItem) {
//     newFilters[type] = selectedItem;
//   } else if (type) {
//     delete newFilters[type];
//   }
//   setFilters(newFilters);

//   const queryString = Object.keys(newFilters)
//     .map(key => {
//       const param = 
//         key === 'ID_categoria' ? 'ID_categoria' :
//         key === 'ID_marca' ? 'ID_marca' :
//         key === 'ID_subcategoria' ? 'ID_subcategoria' : '';
//       return `${param}=${newFilters[key][param]}`;
//     })
//     .join('&');

//   try {
//     const filtersResponse = await fetch(`${baseURL}/filtrar-filtros?${queryString}`);
//     const filtersData = await filtersResponse.json();

//     const uniqueCategories = [];
//     const uniqueBrands = [];
//     const uniqueSubcategories = [];

//     const categorySet = new Set();
//     const brandSet = new Set();
//     const subcategorySet = new Set();

//     filtersData.forEach(item => {
//       if (!categorySet.has(item.ID_categoria)) {
//         categorySet.add(item.ID_categoria);
//         uniqueCategories.push({ ID_categoria: item.ID_categoria, nombre: item.nombre_categoria });
//       }
//       if (item.ID_marca && !brandSet.has(item.ID_marca)) {
//         brandSet.add(item.ID_marca);
//         uniqueBrands.push({ ID_marca: item.ID_marca, nombre: item.nombre_marca });
//       }
//       if (item.ID_subcategoria && !subcategorySet.has(item.ID_subcategoria)) {
//         subcategorySet.add(item.ID_subcategoria);
//         uniqueSubcategories.push({ ID_subcategoria: item.ID_subcategoria, nombre: item.nombre_subcategoria });
//       }
//     });

//     setCategorias(uniqueCategories);
//     setMarcas(uniqueBrands);
//     setSubcategorias(uniqueSubcategories);

//     const productsResponse = await fetch(`${baseURL}/listar-productos-imagen-principal?${queryString}`);
//     const productsData = await productsResponse.json();

//     setProducts(productsData);
//     setLoading(false);

//     if (sortOrder !== '0') {
//       sortProducts(sortOrder);
//     } else {
//       setFilteredProducts([...productsData]);
//     }
//   } catch (error) {
//     console.error('Error al obtener datos filtrados:', error);
//   }
// }, [filters, sortOrder, setCategorias, setMarcas, setSubcategorias, setProducts, setLoading, sortProducts, setFilteredProducts]);

// useEffect(() => {
//   handleFilter(); // Llamada inicial
// }, [handleFilter]); // Agregamos handleFilter como dependencia

//   const handleSortChange = (e) => {
//     const sortOrder = e.target.value;
//     // console.log("sortOrder",sortOrder)
//     setSortOrder(sortOrder);
//     sortProducts(sortOrder);
//   };


//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Calcular los productos a mostrar en la página actual
//   // const indexOfLastProduct = currentPage * productsPerPage;
//   // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;  
//   // const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

//   // Crear números de página
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   const handleSearch = (query) => {
//     console.log("Buscando:", query);

//     // Filtrar los productos según el valor de `query`
//     const filtered = products.filter(product =>
//       product.nombre.toLowerCase().includes(query.toLowerCase())
//     );

//     setFilteredProducts(filtered);
//   };

//   return (
//     <>
//       <Header />            
//       <SearchBar onSearch={handleSearch} />
//       <ToastContainer />
//       <section className="product spad">
//         {loading && (
//           <div className="spinner-container">
//             <Spinner contentReady={!loading} />
//           </div>
//         )}
//         {!loading && (
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-3 col-md-5">
//                 <div className="sidebar">
//                   <>
//                     {categorias.length > 0 && <SidebarItem title="Categorías" items={categorias} onFilter={handleFilter} type="ID_categoria" />}
//                     {marcas.length > 0 && <SidebarItem title="Marcas" items={marcas} onFilter={handleFilter} type="ID_marca" />}
//                     {subcategorias.length > 0 && <SidebarItem title="SubCategorías" items={subcategorias} onFilter={handleFilter} type="ID_subcategoria" />}
//                   </>
//                   {/* <PriceRangeSlider minPrice={minPrice} maxPrice={maxPrice} priceRange={priceRange} setPriceRange={setPriceRange} /> */}
//                 </div>
//               </div>
//               <div className="col-lg-9 col-md-7">
//                 <div className="filter__item">
//                   <div className="row">
//                     <div className="col-lg-4 col-md-5">
//                       <div className="filter__sort">
//   <label htmlFor="sort-select">Ordenar por</label>
//                         <select value={sortOrder} onChange={handleSortChange} className='ms-2'>
//                           <option value="0">Más relevantes</option>
//                           <option value="1">Menor precio</option>
//                           <option value="2">Mayor precio</option>
//                         </select>
//                       </div>
//                     </div>
//                     <div className="col-lg-4 col-md-4">
//                       <div className="filter__found">
//                         <h6><span>{filteredProducts.length}</span> Productos encontrados</h6>
//                       </div>
//                     </div>
//                     {/* <div className="col-lg-4 col-md-3">
//                     <div className="filter__option">
//                       <span className="icon_grid-2x2"></span>
//                       <span className="icon_ul"></span>
//                     </div>
//                   </div> */}
//                   </div>
//                 </div>
//                 <div className="row">
//                   {filteredProducts.map((product, index) => (
//                     <ProductItem key={index} product={product} />
//                   ))}
//                 </div>
//                 <div className="product__pagination">
//                   {pageNumbers.map(number => (    
//                     // eslint-disable-next-line jsx-a11y/anchor-is-valid
//                     <a
//                       href="#"
//                       key={number}
//                       onClick={() => handlePageChange(number)}
//                       className={number === currentPage ? 'active' : ''}
//                     >
//                       {number}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Productos;


import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Esquema/Header';
import Footer from '../../Esquema/Footer';
import { baseURL } from '../../api.js';
import Spinner from '../utilidades/Spinner';
import './Productos.css';
import SearchBar from '../SearchBar.js';
import { openDB } from 'idb';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SidebarItem({ title, items, onFilter, type }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const handleToggleShowMore = (event) => {
    event.preventDefault();
    setShowMore(!showMore);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowMore(false);
    onFilter(item, type);
  };

  const clearSelection = () => {
    setSelectedItem(null);
    onFilter(null, type);
  };

  return (
    <div className="sidebar__item">
      <h4>{title}</h4>
      <ul>
        {selectedItem && (
          <li>
            <span>{selectedItem.nombre}</span>
            <button className='ms-2' onClick={clearSelection}>X</button>
          </li>
        )}
        {!selectedItem &&
          items.slice(0, showMore ? items.length : 5).map((item, index) => (
            <li key={index}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" onClick={() => handleItemClick(item)}>
                {item.nombre}
              </a>
            </li>
          ))}
        {!selectedItem && items.length > 5 && (
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={handleToggleShowMore}>
              {showMore ? 'Ver menos' : 'Ver más'}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

function ProductItem({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [idUsuario, setIdUsuario] = useState(null);
  const [idFavorito, setIdFavorito] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIdUsuario(user.ID_usuario);
      checkIfFavorite(user.ID_usuario, product.ID_producto);
    }
  }, [product.ID_producto]);

  const checkIfFavorite = async (userId, productId) => {
    try {
      const response = await fetch(`${baseURL}/favoritos/${userId}/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setIsFavorite(data.isFavorito);
        setIdFavorito(data.ID_favorito);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const toggleFavorite = async (event) => {
    event.preventDefault();

    if (!idUsuario) {
      toast.warning('Por favor, inicie sesión para agregar a favoritos.');
      return;
    }

    if (isFavorite) {
      // Eliminar de favoritos
      try {
        const deleteResponse = await fetch(`${baseURL}/favorito/${idFavorito}`, {
          method: 'DELETE'
        });

        if (deleteResponse.ok) {
          setIsFavorite(false);

        } else {
          console.error('Error al eliminar el producto de favoritos');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    } else {
      // Agregar a favoritos
      try {
        const addResponse = await fetch(`${baseURL}/favoritos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ID_usuario: idUsuario,
            ID_producto: product.ID_producto,
          }),
        });

        if (addResponse.ok) {
          const data = await addResponse.json();
          setIsFavorite(true);
          setIdFavorito(data.ID_favorito); // Guarda el nuevo ID del favorito

        } else {
          console.error('Error al agregar el producto a favoritos');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  };


  const shareProduct = (event) => {
    event.preventDefault();
    const shareUrl = `/product-details/${product.ID_producto}`;
    const shareText = `Mira este producto: ${product.nombre}`;
    if (navigator.share) {
      navigator.share({
        title: product.nombre,
        text: shareText,
        url: shareUrl,
      })
        .then(() => console.log('Producto compartido con éxito'))
        .catch((error) => console.error('Error al compartir el producto', error));
    } else {
      alert(`Comparte este enlace: ${shareUrl}`);
    }
  };


  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
      <div className="product__item">
        <div className="product__item__pic set-bg">
          <img src={product.imagenUrl} alt={product.nombre} />
          <ul className="product__item__pic__hover">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li><a href="#" onClick={toggleFavorite} aria-label="Toggle Favorite"><i className="fa fa-heart" style={{ color: isFavorite ? 'red' : 'black' }}></i></a></li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <li><a href="#" onClick={shareProduct}><i className="fa fa-retweet"></i></a></li>
            {/* <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li> */}
          </ul>
        </div>
        <Link to={`/product-details/${product.ID_producto}`} className="product__item__text">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <h6>{product.nombre}</h6>
          <h5>${product.precioFinal}</h5>
        </Link>
      </div>
    </div>
  );
}

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortOrder, setSortOrder] = useState('0');

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Define el número de productos por página

  const [loading, setLoading] = useState(true);

  const sortProducts = useCallback((order) => {
    let sortedProducts = [...filteredProducts];
    if (order === '1') {
      sortedProducts.sort((a, b) => a.precioFinal - b.precioFinal);
    } else if (order === '2') {
      sortedProducts.sort((a, b) => b.precioFinal - a.precioFinal);
    } else {
      sortedProducts = [...products];
    }
    setFilteredProducts(sortedProducts);
  }, [filteredProducts, products]);

  const handleFilter = useCallback(async (selectedItem, type) => {
    const newFilters = { ...filters };
    if (selectedItem) {
      newFilters[type] = selectedItem;
    } else if (type) {
      delete newFilters[type];
    }
    setFilters(newFilters);

    const queryString = Object.keys(newFilters)
      .map(key => {
        const param =
          key === 'ID_categoria' ? 'ID_categoria' :
            key === 'ID_marca' ? 'ID_marca' :
              key === 'ID_subcategoria' ? 'ID_subcategoria' : '';
        return `${param}=${newFilters[key][param]}`;
      })
      .join('&');

    try {
      const filtersResponse = await fetch(`${baseURL}/filtrar-filtros?${queryString}`);
      const filtersData = await filtersResponse.json();

      const uniqueCategories = [];
      const uniqueBrands = [];
      const uniqueSubcategories = [];

      const categorySet = new Set();
      const brandSet = new Set();
      const subcategorySet = new Set();

      filtersData.forEach(item => {
        if (!categorySet.has(item.ID_categoria)) {
          categorySet.add(item.ID_categoria);
          uniqueCategories.push({ ID_categoria: item.ID_categoria, nombre: item.nombre_categoria });
        }
        if (item.ID_marca && !brandSet.has(item.ID_marca)) {
          brandSet.add(item.ID_marca);
          uniqueBrands.push({ ID_marca: item.ID_marca, nombre: item.nombre_marca });
        }
        if (item.ID_subcategoria && !subcategorySet.has(item.ID_subcategoria)) {
          subcategorySet.add(item.ID_subcategoria);
          uniqueSubcategories.push({ ID_subcategoria: item.ID_subcategoria, nombre: item.nombre_subcategoria });
        }
      });

      setCategorias(uniqueCategories);
      setMarcas(uniqueBrands);
      setSubcategorias(uniqueSubcategories);

      const productsResponse = await fetch(`${baseURL}/listar-productos-imagen-principal?${queryString}`);
      const productsData = await productsResponse.json();

      setProducts(productsData);
      setLoading(false);

      if (sortOrder !== '0') {
        sortProducts(sortOrder);
      } else {
        setFilteredProducts([...productsData]);
      }
    } catch (error) {
      console.error('Error al obtener datos filtrados:', error);
    }
  }, [filters, sortOrder, setCategorias, setMarcas, setSubcategorias, setProducts, setLoading, sortProducts, setFilteredProducts]);
  // Abrir o crear la base de datos
  const openDatabase = useCallback(async () => {
    return openDB('productos-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('productos')) {
          db.createObjectStore('productos', { keyPath: 'ID_producto' });
        }
      },
    });
  }, []);


  // Guardar productos en IndexedDB
  const saveProductsToIndexedDB = useCallback(async (products) => {
    const db = await openDatabase();
    const tx = db.transaction('productos', 'readwrite');
    const store = tx.objectStore('productos');
    products.forEach(product => {
      store.put(product);
    });
    await tx.done;
  }, [openDatabase]);

  const getProductsFromIndexedDB = useCallback(async () => {
    const db = await openDatabase();
    const tx = db.transaction('productos', 'readonly');
    const store = tx.objectStore('productos');
    return store.getAll();
  }, [openDatabase]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await fetch(`${baseURL}/listar-productos-imagen-principal`);
        if (!productsResponse.ok) throw new Error('Error al obtener datos de la API');

        const productsData = await productsResponse.json();
        setProducts(productsData);
        setFilteredProducts(productsData);
        setLoading(false);

        // Guardar los productos en IndexedDB
        await saveProductsToIndexedDB(productsData);
      } catch (error) {
        console.error('Error al obtener productos:', error);

        // Cargar productos desde IndexedDB si falla la API
        const productsFromIndexedDB = await getProductsFromIndexedDB();
        if (productsFromIndexedDB.length > 0) {
          setProducts(productsFromIndexedDB);
          setFilteredProducts(productsFromIndexedDB);
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, [saveProductsToIndexedDB, getProductsFromIndexedDB]);


  const handleSortChange = (e) => {
    const sortOrder = e.target.value;
    // console.log("sortOrder",sortOrder)
    setSortOrder(sortOrder);
    sortProducts(sortOrder);
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular los productos a mostrar en la página actual
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;  
  // const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Crear números de página
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSearch = (query) => {
    console.log("Buscando:", query);

    // Filtrar los productos según el valor de `query`
    const filtered = products.filter(product =>
      product.nombre.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <ToastContainer />
      <section className="product spad">
        {loading && (
          <div className="spinner-container">
            <Spinner contentReady={!loading} />
          </div>
        )}
        {!loading && (
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-5">
                <div className="sidebar">
                  <>
                    {categorias.length > 0 && <SidebarItem title="Categorías" items={categorias} onFilter={handleFilter} type="ID_categoria" />}
                    {marcas.length > 0 && <SidebarItem title="Marcas" items={marcas} onFilter={handleFilter} type="ID_marca" />}
                    {subcategorias.length > 0 && <SidebarItem title="SubCategorías" items={subcategorias} onFilter={handleFilter} type="ID_subcategoria" />}
                  </>
                  {/* <PriceRangeSlider minPrice={minPrice} maxPrice={maxPrice} priceRange={priceRange} setPriceRange={setPriceRange} /> */}
                </div>
              </div>
              <div className="col-lg-9 col-md-7">
                <div className="filter__item">
                  <div className="row">
                    <div className="col-lg-4 col-md-5">
                      <div className="filter__sort">
                        <label htmlFor="sort-select">Ordenar por</label>
                        <select value={sortOrder} id="sort-select" onChange={handleSortChange} className='ms-2' aria-label="Ordenar por">
                          <option value="0">Más relevantes</option>
                          <option value="1">Menor precio</option>
                          <option value="2">Mayor precio</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="filter__found">
                        <h6><span>{filteredProducts.length}</span> Productos encontrados</h6>
                      </div>
                    </div>
                    {/* <div className="col-lg-4 col-md-3">
                    <div className="filter__option">
                      <span className="icon_grid-2x2"></span>
                      <span className="icon_ul"></span>
                    </div>
                  </div> */}
                  </div>
                </div>
                <div className="row">
                  {filteredProducts.map((product, index) => (
                    <ProductItem key={index} product={product} />
                  ))}
                </div>
                <div className="product__pagination">
                  {pageNumbers.map(number => (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a
                      href="#"
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={number === currentPage ? 'active' : ''}
                    >
                      {number}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Productos;

