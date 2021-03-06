import React from 'react'
import { Link } from 'react-router-dom'
import { Row,Col, Image, ListGroup,Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { listProductDetails } from '../state/actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({match,history}) => {
    const [qty,setQty]=useState(1)

    const dispatch = useDispatch()
    const {loading,error,product} = useSelector(state=>state.productDetails)

    useEffect(()=>{
        // console.log(match.params.id)
        dispatch(listProductDetails(match.params.id))
    },[dispatch,match])

    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
        
    }
    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>GO BACK</Link>
            {loading? <Loader/> : error ? <Message variant='danger'>{error}</Message>:<Row>
                <Col md={12} lg={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={12} lg={3}>
                    <ListGroup variant=''>
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={product.numReviews}>
                                reviews
                            </Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={12} lg={3}>
                    <Card>
                        <ListGroup variant='fluse'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        {product.price}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock>0?'In Stock':'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock>0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control 
                                                as='select' 
                                                value={qty} 
                                                onChange={(e)=>setQty(e.target.value)}
                                            >
                                                {[...Array(product.countInStock).keys()].map(x=>(<option key={x+1} value={x+1}>{x+1}</option>))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button 
                                    className='btn-block' 
                                    type='button' 
                                    disabled={product.countInStock===0}
                                    onClick={addToCartHandler}
                                >
                                    ADD TO CART
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            }
        </>
    )
}

export default ProductScreen
