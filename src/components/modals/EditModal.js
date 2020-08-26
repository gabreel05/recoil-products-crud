import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { products } from '../../store';

const EditModal = (props) => {
  const { show, id, handleClose } = props;

  const [productList, setProductList] = useRecoilState(products);
  const product = productList.length
    ? productList.find((item) => item.id === id)
    : null;
  const index = productList.findIndex((item) => item === product);

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState(0.0);
  const [quantity, setQuantity] = useState(0);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeColor = (e) => {
    setColor(e.target.value);
  };

  const onChangeSize = (e) => {
    setSize(e.target.value);
  };

  const onChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const updateProduct = () => {
    const newList = replaceProduct(productList, index, {
      ...product,
      name,
      color,
      size,
      quantity,
    });

    setProductList(newList);
    handleClose();
  };

  function replaceProduct(products, i, newValue) {
    return [...products.splice(0, i), newValue, ...products.splice(i + 1)];
  }

  return (
    <>
      {product ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit the Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Product name"
                  defaultValue={product.name}
                  onChange={(e) => onChangeName(e)}
                />
              </Form.Group>

              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Product color"
                  defaultValue={product.color}
                  onChange={(e) => onChangeColor(e)}
                />
              </Form.Group>

              <Form.Group controlId="size">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Product size"
                  defaultValue={product.size}
                  onChange={(e) => onChangeSize(e)}
                />
              </Form.Group>

              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Product quantity"
                  defaultValue={product.quantity}
                  onChange={(e) => onChangeQuantity(e)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => updateProduct()}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ''
      )}
    </>
  );
};

export default EditModal;
