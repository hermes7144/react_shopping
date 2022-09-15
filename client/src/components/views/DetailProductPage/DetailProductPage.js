import Axios from 'axios';
import React, { useEffect } from 'react';
import { FaFacebook } from 'react-icons/fa';

function DetailProductPage(props) {
  const productId = props.match.params.productId;

  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then((response) => {});

    let variable = {};
  }, []);

  return <div>DetailProductPage</div>;
}

export default DetailProductPage;
