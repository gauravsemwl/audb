const audiobooks = [
    {

        name: 'The Great Gatsby',
        image: '/images/theGreatGatsby.png',
        description: 'The Great Gatsby is a novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan. The Great Gatsby is widely considered to be a literary classic and a contender for the title of the "Great American Novel".',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
        rating: 4,
        numReviews: 1
    },
    {

        name: '1984',
        image: '/images/1984.png',
        description: '1984, novel by George Orwell published in 1949 as a warning against totalitarianism. The chilling dystopia made a deep impression on readers, and his ideas entered mainstream culture in a way achieved by very few books. The book’s title and many of its concepts, such as Big Brother and the Thought Police, are instantly recognized. The story follows the life of Winston Smith, a low ranking member of ‘the Party’, who is frustrated by the omnipresent eyes of the party, and its ominous ruler Big Brother.',
        author: 'George Orwell',
        genre: 'Dystopian',
        rating: 4.8,
        numReviews: 1
    },
    {

        name: 'To Kill a Mockingbird',
        image: '/images/bird.png',
        description: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. Instantly successful, it won the Pulitzer Prize and has become a classic of modern American literature. The plot and characters are loosely based on Lee\'s observations of her family, her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was 10 years old. The novel is renowned for its warmth and humor, despite dealing with the serious issues of rape and racial inequality.',
        author: 'Harper Lee',
        genre: 'Classic',
        rating: 4.9,
        numReviews: 1
    },
    {

        name: 'The Catcher in the Rye',
        image: '/images/rye.png',
        description: 'The Catcher in the Rye is a novel by J. D. Salinger. It was originally intended for adults but is often read by adolescents for its themes of angst and alienation, and as a critique on superficiality in society. The novels protagonist Holden Caulfield has become an icon for teenage rebellion.The novel also deals with complex issues of identity, belonging, loss, connection, and alienation.It has been translated into almost all of the world\'s major languages.',
        author: 'J.D. Salinger',
        genre: 'Classic',
        rating: 4.5,
        numReviews: 1
    },
    {

        name: 'Pride and Prejudice',
        image: '/images/pride.png',
        description: 'Pride and Prejudice is a romantic novel of manners written by Jane Austen in 1813. The novel follows the character development of Elizabeth Bennet, the dynamic protagonist of the book who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness. The comedy of the writing lies in the depiction of manners, education, marriage, and money during the British Regency period.',
        author: 'Jane Austen',
        genre: 'Romance',
        rating: 3.1,
        numReviews: 1
    },
    {

        name: 'The Hobbit',
        image: '/images/hobbit.png',
        description: 'The Hobbit, or There and Back Again is a children\'s fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children\'s literature. The Hobbit is set within Tolkien\'s fictional universe and follows the quest of home-loving Bilbo Baggins to win a share of the treasure guarded by Smaug the dragon.',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        rating: 4.8,
        numReviews: 1
    },
    {

        name: 'Moby Dick',
        image: '/images/moby.png',
        description: 'Moby Dick is an 1851 novel by Herman Melville. The book is the sailor Ishmael\'s narrative of the obsessive quest of Ahab, captain of the whaling ship Pequod, for revenge against Moby Dick, the giant white sperm whale that on the ship\'s previous voyage bit off Ahab\'s leg at the knee. The novel was a commercial failure and out of print at the time of the author\'s death in 1891, but during the 20th century, its reputation as a Great American Novel was established.',
        author: 'Herman Melville',
        genre: 'Adventure',
        rating: 4.2,
        numReviews: 1
    },
    {

        name: 'War and Peace',
        image: '/images/war.png',
        description: 'War and Peace is a novel by the Russian author Leo Tolstoy, published from 1865 to 1869. It is regarded as one of Tolstoy\'s finest works and as one of the greatest novels ever written. It is a central work of world literature and is regarded as Tolstoy\'s finest literary achievement. The novel chronicles the history of the French invasion of Russia and the impact of the Napoleonic era on Tsarist society through the stories of five Russian aristocratic families.',
        author: 'Leo Tolstoy',
        genre: 'Historical',
        rating: 4,
        numReviews: 1
    },
    {

        name: 'The Odyssey',
        image: '/images/od.png',
        description: 'The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is, in part, a sequel to the Iliad, the other work ascribed to Homer. The Odyssey is fundamental to the modern Western canon; it is the second-oldest extant work of Western literature. It is believed to have been composed near the end of the 8th century BC, somewhere in Ionia, the Greek coastal region of Anatolia. The poem mainly focuses on the Greek hero Odysseus, king of Ithaca, and his journey home after the fall of Troy.',
        author: 'Homer',
        genre: 'Epic',
        rating: 3.5,
        numReviews: 1
    },
    {

        name: 'Crime and Punishment',
        image: '/images/crime.png',
        description: 'Crime and Punishment is a novel by the Russian author Fyodor Dostoevsky. It was first published in the literary journal The Russian Messenger in twelve monthly installments during 1866. It was later published in a single volume. It is the second of Dostoevsky\'s full-length novels following his return from ten years of exile in Siberia. Crime and Punishment is considered the first great novel of his mature period of writing. It focuses on the mental anguish and moral dilemmas of Rodion Raskolnikov, an impoverished ex-student in Saint Petersburg who formulates a plan to kill an unscrupulous pawnbroker for her cash.',
        author: 'Fyodor Dostoevsky',
        genre: 'Philosophical',
        rating: 4.5,
        numReviews: 1
    },
    {

        name: 'The Brothers Karamazov',
        image: '/images/brother.png',
        description: 'The Brothers Karamazov is the final novel by the Russian author Fyodor Dostoevsky. Dostoevsky spent nearly two years writing The Brothers Karamazov, which was published as a serial in The Russian Messenger from January 1879 to November 1880. It is a passionate philosophical novel set in 19th-century Russia, that enters deeply into the ethical debates of God, free will, and morality. It is a spiritual drama of moral struggles concerning faith, doubt, and reason, set against a modernizing Russia, with a plot which revolves around the subject of patricide.',
        author: 'Fyodor Dostoevsky',
        genre: 'Philosophical',
        rating: 4,
        numReviews: 1
    }
]

export default audiobooks