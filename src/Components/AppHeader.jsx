import React, { useEffect, useState } from 'react'
import { Badge, Button, Drawer, Input, InputNumber, Menu, Table, Typography,Form, Checkbox, message } from 'antd';
import {HomeFilled,ShoppingCartOutlined} from "@ant-design/icons"
import { useNavigate } from 'react-router-dom';
import { getCart } from '../API';

export const AppHeader = () => {
  const navigate = useNavigate()
  const onMenuClick=(item)=>{
  navigate(`/${item.key}`)
  }
  return (
    <div className='appHeader'>
      <Menu
      onClick={onMenuClick}
      mode='horizontal'
       items = {[
        {
        label:<HomeFilled/>,
        key:'',
        },

        {
          label:'Men',
          key:'men',
          children:[
          
        
          {
            label:"Men's Watches",
            key:"mens-watches",
          },
        ]
        },

        {
            label:'Women',
            key:'women',
            children:[
              {
              label:"Women's Dresses",
              key:"womens-dresses",
            },
           
            {
              label:"Women's Watches",
              key:"womens-watches",
            },

            {
              label:"Women's Bags",
              key:"womens-bags",
            },

            {
              label:"Women's Jewellery",
              key:"womens-jewellery",
            },
          ]
        },

        {
          label:'Fragrances',
          key:'fragrances',
        },

      


      
      ]}/>

      <Typography.Title>Big Store</Typography.Title>
      <AppCart/>
    </div>

   
  )
}
function AppCart() {
  const [cartDrawerOpen,setCartDrawerOpen] = useState(false)
  const [cartItems,setCartItems]=useState([])
  const [checkoutDrawerOpen,setCheckoutDrawerOpen] = useState(false)

  useEffect(()=>{
    getCart().then(res=>{
      setCartItems(res.products)

    })
  },[])

  const onConfirmOrder=(values)=>{
    console.log({values})
    setCartDrawerOpen(false)
    setCheckoutDrawerOpen(false)
    message.success("Your order has been placed successfully")
  }
  return  (
    <div>
      <ShoppingCartOutlined onClick={()=>{
        setCartDrawerOpen(true)
      }} className="shoppingCartIcon" />
      <Drawer open={cartDrawerOpen} onClose={()=>{
        setCartDrawerOpen(false)
      }}

      title="Your Cart"
      contentWrapperStyle={{width:500}}
      
      >
        <Table
        pagination={false}
         columns={[{
          title:'Title',
          dataIndex:'title',

        },
        {
          title:'Price',
          dataIndex:'price',
          render:(value)=>{
            return <span>${value}</span>
          },
          
        },

        {
          title:'Quantity',
          dataIndex:'quantity',
          render: (value,record) => {
            return <InputNumber min={0} defaultValue={value} onChange={(value)=>{
          setCartItems((pre) =>
                pre.map((cart)=>{
                if(record.id===cart.id){
                  cart.total=cart.price*value
                }
                return cart
              }))
            }} />;
          }

        },
        {
          title:'Total',
          dataIndex:'total',
          render:(value)=>{
            return <span>${value}</span>
          },

        },
        ]}
        dataSource={cartItems}
        summary={(data)=>{
        const total=data.reduce((pre,current)=>{
            return pre+current.total

          },0)
          return <span>Total:{total}</span>
        }}
        />

        <Button onClick={()=>{
          setCheckoutDrawerOpen(true)
        }} type='primary'>Checkout Your Cart</Button>
      </Drawer>

      <Drawer open={checkoutDrawerOpen} onClose={()=>{
       setCheckoutDrawerOpen(false);
      }}
      title="Confirm Order"
      >

        <Form onFinish={onConfirmOrder}>
          <Form.Item rules={[{
            required:true,
            message:'Please enter your full name'
          }]}
           label ="Full Name" name="full_name">
            <Input placeholder='Enter your full Name...'/>
          </Form.Item>

          <Form.Item rules={[{
            required:true,
            type:'email',
            message:'Please enter a valid email'
          }]} 
          label ="Email" name="email">
            <Input placeholder='Enter your Email...'/>
          </Form.Item>

          <Form.Item rules={[{
            required:true,
            message:'Please enter your address'
          }]}
           label ="Address" name="address">
            <Input placeholder='Enter your address...'/>
          </Form.Item>

          <Form.Item>
            <Checkbox>Cash on Deleviry</Checkbox>
          </Form.Item>

          <Typography.Paragraph type='secondary'>More Methods coming soon..</Typography.Paragraph>

          <Button type='primary' htmlType='submit'>Confirm Order</Button>
        </Form>

      </Drawer>
    </div>

  ) 
}

