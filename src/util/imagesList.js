export const IMAGES = ()=>{
    let arr = []
    for(let i=1;i<=40;i++){
        arr.push({id: i, image: "a"+i, isMatched: false, isOpen:false });
    }
    return arr;
}

export const shuffle=(arr)=>{
    let array = [];
    array.push(...arr)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [{...array[j]}, {...array[i]}];
    }
    return [...array];
}