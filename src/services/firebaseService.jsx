import { getDatabase, set, get, ref, child, limitToFirst, orderByKey } from 'firebase/database';
import { db } from '../firebase'

export const writeUserData = async (uid, currDate, time_s_full, time_e_full, time_s_short, time_e_short, totalDayTime) => {
    await set(ref(db, 'users/' + uid + '/' + currDate), {
        time_start_full: time_s_full,
        time_start_short: time_s_short,
        time_end_full: time_e_full,
        time_end_short: time_e_short,
        total_day_time: totalDayTime
    });
};

export const readData = async (uid) => {
    // Создание ссылки на место в базе данных, где хранятся данные пользователя
    const dbRef = ref(db, uid ? `users/${uid}` : "users/");
    
    
    try {
        // Делаем запрос к базе данных
        const snapshot = await get(dbRef);

        // Проверяем, существуют ли данные
        if (snapshot.exists()) {
            return snapshot.val();  // Если да, возвращаем их
        } else {
            console.log("No data available");
            return null;  // Если нет, возвращаем null
        }
    } catch (error) {
        // Если произошла ошибка, выводим её в консоль и пробрасываем дальше
        console.error(error);
        throw error;
    }
};
export default { writeUserData, readData }

