
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import Loader from './Loader'

const Product = ({ audiobook }) => {


  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/audiobooks/${audiobook._id}`}>
        <Card.Img src={audiobook.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/audiobooks/${audiobook._id}`}>
          <Card.Title as='div'>
            <strong>{audiobook.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating value={audiobook.rating} text={`${audiobook.numReviews} Reviews`} />
        </Card.Text>
        <Card.Text as='h3'>{audiobook.genre}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product