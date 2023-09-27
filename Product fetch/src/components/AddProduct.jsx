import React, { useState, useEffect } from 'react';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch the list of products when the component mounts
    fetch('/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    const newProduct = {
      name,
      price: parseFloat(price),
      weight,
      description,
    };

    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response as needed
        console.log('Product added:', data);
        // Reset form fields
        setName('');
        setPrice('');
        setWeight('');
        setDescription('');

        // Update the product list by fetching the updated list
        fetch('/products')
          .then(response => response.json())
          .then(updatedData => setProducts(updatedData));
      });
  };

  // Function to handle product deletion
  const handleDeleteProduct = productId => {
    fetch(`/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // If the deletion was successful, update the product list
          const updatedProducts = products.filter(product => product.id !== productId);
          setProducts(updatedProducts);
        } else {
          // Handle errors if necessary
          console.error('Failed to delete product');
        }
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  // Function to filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        <br />
        <label>Price:</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        <br />
        <label>Weight:</label>
        <input type="text" value={weight} onChange={e => setWeight(e.target.value)} required />
        <br />
        <label>Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        <br />
        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong> - Price: ${product.price} - Weight: {product.weight}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddProduct;
