"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Created by chenxuhua on 2017/9/6.
 */
var obj1 = {
  name: "a",
  age: "22"
};
var obj2 = {
  name: "b",
  age: "33"
};

var obj3 = _extends({}, obj2, obj2);

console.log(obj3.name);