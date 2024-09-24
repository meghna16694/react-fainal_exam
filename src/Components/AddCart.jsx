import React, { useEffect, useState } from 'react';
import { List, Card, Image, Typography, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

function AddCart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    message.success(`${item.title} has been removed from the cart!`);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <List
          grid={{ column: 3 }} // 3 columns layout
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Card
                title={item.title}
                cover={<Image src={item.thumbnail} />}
                actions={[
                  <Button className='btn' type="link"  onClick={() => removeFromCart(item)}>
                    Remove from Cart
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={`Price: $${item.price}`}
                  description={item.description}
                />
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <Typography.Text color='pink'>Your cart is empty.</Typography.Text>
      )}

      <Button
        type="primary"
        onClick={() => navigate('/')}
        style={{ marginTop: '20px' }}
      >
      <p> Continue Shopping</p> 
      </Button>
    </div>
  );
}

export default AddCart;
