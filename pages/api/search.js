import results from './search.json';

export default (req, res) => {
    const {query} = req.query;
    const images = results.images.filter(image => image.title.toLowerCase().includes(query.toLowerCase()));
    setTimeout(() => {
        res.json({images});
    }, 1000);

};
