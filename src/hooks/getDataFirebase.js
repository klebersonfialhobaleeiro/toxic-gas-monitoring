import { useEffect, useState } from 'react'
import { database as db } from '../utils/firebase';
import { onValue, ref, get } from 'firebase/database';

const useGetDataFirebase = (path) => {
    const [result, setResult] = useState([])

    useEffect(() => {
        const query = ref(db, path)
        get(query).then((snapshot) => {
            if (snapshot.exists()) {
                const value = snapshot.val() || '';
                setResult(value)
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
        })
    }, [])

    return result
}

export default useGetDataFirebase;