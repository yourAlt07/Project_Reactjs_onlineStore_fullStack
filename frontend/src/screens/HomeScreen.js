import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { listProducts } from '../state/actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import { bindActionCreators } from 'redux'
// import {actionCreators} from '../state/index'

const HomeScreen = () => {
    const dispatch=useDispatch()

    const {products,loading,error}=useSelector((state)=>state.productList)
 

    useEffect(()=>{
        // console.log("USED EFFECT")
        dispatch(listProducts())
        
    },[dispatch])

    return (
        <>
            <h1>Latest Products</h1>  
            {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>
            :<Row>
       
                {products.map((product)=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))
                }
            </Row>
            }
         


        </>
    )
}

export default HomeScreen
