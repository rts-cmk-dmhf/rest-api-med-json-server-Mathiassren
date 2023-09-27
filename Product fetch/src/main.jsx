import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from '../src/components/ProductList';
import AddProduct from '../src/components/AddProduct';


function App() {
  return (
    <div>
      <ProductList />
      <AddProduct />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
