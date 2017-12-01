/**
 * Created by shiyunjie on 17/12/1.
 */

var fs = require('fs');
var path = require('path');
var package = require("../package.json");   // 获取package.json


function main() {

  console.log('test_git')
  branch(function(err, str) {
    if (err) throw err;
    //console.log(str);
    //=> 'master'

    if(str !== 'master' && !package.version.includes('-beta.')){
      // 阻止publish

      console.log('非master分支，只能提交beta版本');
      process.exit(1);

    }

    // 允许发布
  });
}

function branch(cb) {
  var cwd = process.cwd();
  fs.readFile(gitHeadpath(cwd), function(err, buf) {
    if (err) {
      cb(err);
      return;
    }
    cb(null, parseBranches(buf));
  });
}


function parseBranches(str) {
  var match = /ref: refs\/heads\/([^\n]+)/.exec(String(str));
  return match && match[1];
}

function gitHeadpath(cwd) {
  return path.join(cwd || process.cwd(), '.git/HEAD');
}


main()