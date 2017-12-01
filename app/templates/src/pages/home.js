/**
 * Created by shiyunjie on 17/11/30.
 */

export default {
  setPage(index){
    const maps = ['a', 'b', 'c'];
    const result = maps.findIndex((item) => { index === item });
    return result;
  }

}