/**
 * Created by shiyunjie on 17/11/21.
 */
export default {
  setWidth(w){
  const maps = ['w', 's', 'y', 'x'];
   const index = maps.findIndex((item) => { w === item });
    return index;
}
}