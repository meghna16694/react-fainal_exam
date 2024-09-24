import React, { useEffect, useState } from 'react';
import { getAllProducts, getProductsByCategory, addToCart } from '../API';
import { Card, List, Image, Typography, Badge, Rate, Button, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

function Products() {
  const [items, setItems] = useState([]);
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (param?.categoryId ? getProductsByCategory(param.categoryId) : getAllProducts()).then((res) => {
      setItems(res.products);
    });
  }, [param]);

  return (
    <div>
      <List
        grid={{ column: 3 }} 
        dataSource={items}
        renderItem={(product) => (
          <List.Item key={product.id}>
            <Badge.Ribbon
              className="itemCardBadge"
              text={`${product.discountPercentage}% Off`}
              color="pink"
            >
              <Card
                className="itemCard"
                title={product.title}
                cover={<Image className="itemCardImage" src={product.thumbnail} />}
                actions={[
                  <Rate allowHalf value={product.rating} disabled />,
                  <AddToCartButton item={product} navigate={navigate} />, 
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${product.price}{' '}
                      <Typography.Text delete type="danger">
                        ${parseFloat(product.price + (product.price * product.discountPercentage) / 100).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                      {product.description}
                    </Typography.Paragraph>
                  }
                />
              </Card>
            </Badge.Ribbon>
          </List.Item>
        )}
      />
    </div>
  );
}

function AddToCartButton({ item, navigate }) {
  const addProductToCart = () => {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

   
    const updatedCart = [...cart, item];

    
    localStorage.setItem('cart', JSON.stringify(updatedCart));

   
    message.success(`${item.title} has been added to the cart!`);

    
    navigate('/addcart');
  };

  return (
    <Button
      type="link"
      onClick={() => {
        addProductToCart();
      }}
    >
      Add to Cart
    </Button>
  );
}

export default Products;