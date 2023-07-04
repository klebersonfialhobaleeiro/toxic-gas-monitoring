import { useEffect, useState } from 'react'
import { database as db } from '../utils/firebase';
import { onValue, ref, get } from 'firebase/database';

const useFirebaseDataHistory = (path) => {
    const [result, setResult] = useState([])

    const getCleanData = (data) => {
        const cleanData = []
        for (let date in data) {
            const time = data[date];
            
            
        const [day, month, year] = date.split('-');
        const formattedDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;

        for (let hour in time) {
        const record = {
            date: formattedDate,
            time: hour,
            mq2: data[date][hour]['mq2'],
            mq8: data[date][hour]['mq8'],
            mq9: data[date][hour]['mq9'],
            chama: data[date][hour]['chama'],
        };
        cleanData.push(record);
        }

        }

        return cleanData
    }

    useEffect(() => {
        const query = ref(db, path)
        get(query).then((snapshot) => {
            if (snapshot.exists()) {
                const value = snapshot.val() || '';
                setResult(getCleanData(value))
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
        })
    }, [])

    return result
}

export default useFirebaseDataHistory;