import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)

  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
    
  }, [dispatch, keyword, pageNumber])


  return (
    <Fragment>
      <Meta />
      {!keyword
        ? <ProductCarousel />
        : <Link to='/' className='btn btn-light'>Go Back</Link>
      }
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Fragment>
          <Row>
            {products.length === 0 && <h5>No results found</h5>}
            {products.map(product => (
              <Col
                style={{ display: '-webkit-flex', flexWrap: 'wrap' }} key={product._id}
                sm={12} md={6} lg={4} xl={3}
              >
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </Fragment>
      )}
      
    </Fragment>
  )
}

export default HomeScreen
