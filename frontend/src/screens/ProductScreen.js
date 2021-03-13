import React, {useState,useEffect} from 'react'
import {Row,Col,ListGroup,ListGroupItem,Image,Card,Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import Rating from "../components/Rating"
import axios from "axios"

const ProductScreen = ({match}) => {
    const [product,setProduct] = useState({})

    useEffect( () => {
        const fetchProducts = async () => {
            const {data} = await axios.get(`/api/products/${match.params.id}`)

            setProduct(data)
        }
        fetchProducts()
    },[])
    return (
        <>
           <Link className="btn btn-dark my-3" to="/">Go Back</Link>
           <Row>
               <Col md={6}>
                   <Image src={product.image} alt={product.name} fluid />
               </Col>
               <Col md={3}>
                   <ListGroup variant="flush">
                       <ListGroupItem>
                        <h1>{product.name}</h1>
                       </ListGroupItem>
                       <ListGroupItem>
                           <Rating 
                           value={product.rating}
                           text={`${product.numReviews} reviews`} />
                       </ListGroupItem>
                       <ListGroupItem>
                           Price: ${product.price}
                       </ListGroupItem>
                       <ListGroupItem>
                           Description:{product.description}
                       </ListGroupItem>
                   </ListGroup>
               </Col>
               <Col md={3}>
                   <Card>
                 <ListGroup variant="flush">
                     <ListGroupItem>
                         <Row>
                             <Col>
                             Price
                             </Col>
                             <Col>
                             <strong>${product.price}</strong>
                             </Col>
                             </Row>
                     </ListGroupItem>
                     <ListGroupItem>
                         <Row>
                             <Col>Status:</Col>
                             <Col>
                             {product.countInStock > 0 ? "In stock" : "Out Of Stock"}
                             </Col>
                         </Row>
                     </ListGroupItem>
                     <ListGroupItem>
                         <Col>
                         <Button className="btn-block" type="button">
                             Add To Cart
                         </Button>
                         </Col>
                     </ListGroupItem>
                 </ListGroup>
                   </Card>
               </Col>
           </Row>
        </>
    )
}

export default ProductScreen
