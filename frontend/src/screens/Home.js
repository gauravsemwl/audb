
import { Row, Col, Form, DropdownButton, Dropdown, InputGroup, Button } from 'react-bootstrap'
import Product from '../components/Product'
import { useState, useMemo } from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetAudiobooksQuery } from '../slices/audiobooksApiSlice'

const genres = ["Classic", "Dystopian", "Romance", "Fantasy", "Adventure", "Historical", "Epic", "Philosophical"];

const Home = () => {

    const [selectedGenres, setSelectedGenres] = useState([])
    const [sortOrder, setSortOrder] = useState('');
    const [searchTerm, setSearchTerm] = useState('')

    const { data: audiobooks, isLoading, error } = useGetAudiobooksQuery()

    if (error) {
        console.log(error)
    }

    const handleGenreChange = (genre, e) => {
        e.stopPropagation()
        console.log(selectedGenres)
        setSelectedGenres((prevGenres) =>
            prevGenres.includes(genre)
                ? prevGenres.filter((g) => g !== genre)
                : [...prevGenres, genre]
        );
        console.log(selectedGenres)
    };

    const handleSortChange = (order) => {
        if (sortOrder === order) {
            setSortOrder('')
            console.log('orderchanged')
            return
        }
        setSortOrder(order);
        console.log('orderchanged')
    };



    const filteredAudiobooks = useMemo(() => {
        if (!audiobooks) return [];
        return audiobooks
            .filter((audiobook) =>
                selectedGenres.length > 0 ? selectedGenres.includes(audiobook.genre) : true
            )
            .filter((audiobook) =>
                audiobook.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (sortOrder === 'lotohi') {
                    return a.rating - b.rating;
                } else if (sortOrder === 'hitolo') {
                    return b.rating - a.rating;
                } else {
                    return 0;
                }
            });
    }, [audiobooks, selectedGenres, sortOrder, searchTerm]);

    return (
        <>

            <Row className="my-3 justify-content-end">
                <InputGroup className="mb-3" style={{ width: '300px' }}>
                    <Button variant="primary" >
                        Search
                    </Button>
                    <Form.Control
                        type="text"
                        placeholder="Search audiobooks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </InputGroup>
                <Col xs='auto' className='px-1'>
                    <DropdownButton id="dropdown-basic-button" title="Sort by Rating">
                        <Dropdown.Item
                            key='lotohi'
                            as='div'
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        >
                            <Form.Check
                                type="checkbox"
                                label={'Low-High'}
                                checked={sortOrder === 'lotohi'}
                                onChange={(e) => handleSortChange('lotohi')}
                            />
                        </Dropdown.Item>
                        <Dropdown.Item
                            key='hitolo'
                            as='div'
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        >
                            <Form.Check
                                type="checkbox"
                                label={'High-Low'}
                                checked={sortOrder === 'hitolo'}
                                onChange={(e) => handleSortChange('hitolo')}
                            />
                        </Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col xs='auto' className='px-1'>
                    <DropdownButton id="dropdown-basic-button" title="Select Genres">
                        {genres.map((genre) => (
                            <Dropdown.Item
                                style={{ cursor: 'pointer' }}
                                key={genre}
                                as='div'
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                            >
                                <Form.Check
                                    type="checkbox"
                                    label={genre}
                                    checked={selectedGenres.includes(genre)}
                                    onChange={(e) => handleGenreChange(genre, e)}
                                />

                            </Dropdown.Item>

                        ))}
                    </DropdownButton>
                </Col>
            </Row>
            {isLoading ? (
                <Loader></Loader>
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <Row>
                        {filteredAudiobooks.map((audiobook) => (
                            <Col key={audiobook._id} sm={12} md={6} lg={4} xl={3}>
                                <Product audiobook={audiobook}></Product>
                            </Col>
                        ))}
                    </Row>
                </>
            )}

        </>
    )
}

export default Home