export function useUtils() {
    //錢單位
    function currency(num) {
        const n = parseInt(num, 10);
        return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
    }

    //時間
    function date(time) {
        const localDate = new Date(time * 1000);
        return localDate.toLocaleDateString();
    }

    // 環境判斷
    const imgPath = import.meta.env.VITE_IMG

  
    return {
        currency,
        date,
        imgPath
    }
}