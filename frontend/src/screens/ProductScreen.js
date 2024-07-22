import { useParams } from "react-router-dom";
// import audiobooks from "../audiobooks";
import { Link } from "react-router-dom";
import { Row, Col, Image, Card, Button, ListGroup, ListGroupItem, FormGroup, Form } from 'react-bootstrap'
import Rating from "../components/Rating";
import axios from 'axios'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetAudiobookDetailQuery, useCreateReviewMutation } from "../slices/audiobooksApiSlice";
const ProductScreen = () => {
    const { id: audiobookId } = useParams()

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const { data: audiobook, isLoading, refetch, error } = useGetAudiobookDetailQuery(audiobookId)

    const [createReview, { isLoading: loadingAudiobookReview }] = useCreateReviewMutation()

    const { userInfo } = useSelector((state) => state.auth)

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await createReview({
                audiobookId,
                rating,
                comment
            }).unwrap()
            refetch()
            toast.success('Review Submitted')
            setRating(0)
            setComment('')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    if (isLoading) {
        return (<Loader></Loader>)
    }
    else {
        return (
            <>
                <Link className='btn btn-light my-3' to='/'>
                    Go Back
                </Link>
                {isLoading ? (
                    <Loader></Loader>
                ) : error ? (
                    <Message variant='danger'>{error?.data?.message || error.error}</Message>
                ) : (
                    <>
                        <Row>
                            <Col md={6}>
                                <Image src={audiobook.image} alt={audiobook.name} fluid />
                                <ListGroup.Item className="mt-5" style={{ width: '500px' }}>
                                    <h2>Write a Review</h2>

                                    {loadingAudiobookReview && <Loader />}

                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating' className='my-2'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(Number(e.target.value))}
                                                >
                                                    <option value=''>Select</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>

                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId='comment' className='my-2'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingAudiobookReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review{' '}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </Col>
                            <Col md={6}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{audiobook.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={audiobook.rating} text={`${audiobook.numReviews} Reviews`} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {`Genre : ${audiobook.genre}`}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {`Author : ${audiobook.author}`}
                                    </ListGroup.Item>
                                    < ListGroup.Item>
                                        {`${audiobook.description}`}
                                    </ListGroup.Item>

                                    < ListGroup.Item>
                                        <h2>Reviews</h2>
                                        {audiobook.reviews.length === 0 && <Message>No Reviews</Message>}
                                        <ListGroup variant="flush">
                                            {audiobook.reviews.map((review) => (
                                                <ListGroup.Item key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating} />
                                                    <p>{review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                        </Row>
                        {/* <Row className='review'>
                            <Col md={6}>
                                <h2>Reviews</h2>
                                {audiobook.reviews.length === 0 && <Message>No Reviews</Message>}
                                <ListGroup variant="flush">
                                    {audiobook.reviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h2>Write a Review</h2>

                                        {loadingAudiobookReview && <Loader />}

                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating' className='my-2'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        value={rating}
                                                        onChange={(e) => setRating(Number(e.target.value))}
                                                    >
                                                        <option value=''>Select</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Very Good</option>
                                                        <option value='5'>5 - Excellent</option>

                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId='comment' className='my-2'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        row='3'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>
                                                <Button
                                                    disabled={loadingAudiobookReview}
                                                    type='submit'
                                                    variant='primary'
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        ) : (
                                            <Message>
                                                Please <Link to='/login'>sign in</Link> to write a review{' '}
                                            </Message>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row> */}
                    </>
                )}
            </>
        )
    }

}

export default ProductScreen