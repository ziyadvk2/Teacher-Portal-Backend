let keys;
if(process.env.NODE_ENV === 'production'){
    const loadProdKeys = async () => {
        const { default: prodKeys } = await import('./prod.js');
        return prodKeys;
    };
    keys = await loadProdKeys();

}else{
    //returning the dev keys
    const loadDevKeys = async () => {
        const { default: devKeys } = await import('./dev.js');
        return devKeys;
    };
    keys = await loadDevKeys();
}
export default keys;