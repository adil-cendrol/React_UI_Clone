import { useEffect } from 'react';
import PropTypes from 'prop-types'

const getData = async () => {
    // const url = 'https://jsonplaceholder.typicode.com/todos';
    const url = 'notes/getAll';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {

            const data = await response.json();
            console.log(data)

            return data !== null ? data : [];

        }
        else {
            throw new Error('Response is not valid JSON');
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

export default function NoteData({ setData }) {
    useEffect(() => {
        getData()
            .then((fetchedData) => {
                setData(fetchedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [setData]);

    return null;
}

NoteData.prototype = {
    setData: PropTypes.func
};
