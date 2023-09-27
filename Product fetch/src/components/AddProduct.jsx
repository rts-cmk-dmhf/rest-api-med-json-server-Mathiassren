import React, { useState } from 'react';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');

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
      });
  };

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
    </div>
  );
}

export default AddProduct;
