/**
 * Created by chenxuhua on 2017/9/6.
 */



var obj1={
  name:"a",
  age:"22",
};
var obj2={
  name:"b",
  age:"33",
}

var obj3={
  ...obj2,
  ...obj2
}

console.log(obj3.name);





