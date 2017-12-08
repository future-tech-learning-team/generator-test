/**
 * Created by shiyunjie on 17/11/21.
 */
import 'babel-polyfill'  // 比较重，支持es6  es7 api
export default {
  setWidth(w){
  const maps = ['w', 's', 'y', 'x'];
   const index = maps.findIndex((item) => { w === item });
    return index;
}
}