const fetcher = (url) => fetch(url).then((res) => res.json()); //DEL GET PARA CATEGORIAS DEL FORM
export default fetcher;
