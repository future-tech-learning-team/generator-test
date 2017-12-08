/**
 * Created by shiyunjie on 17/12/1.
 */

import "babel-polyfill";
import fs from 'fs';
import path from 'path';
import semver from 'semver';
import packageJS from "../package.json";   // 获取package.json
import execa from 'execa';

/*
 Alpha：内测版，内部交流或者专业测试人员测试用；
 Beta：公测版，专业爱好者大规模测试用，存在一些缺陷，该版本也不适合一般用户安装；
 Gamma：比较成熟的测试版，与即将发行的正式版相差无几；
 RC：是 Release Candidate 的缩写，意思是发布倒计时，候选版本，处于Gamma阶段，该版本已经完成全部功能并清除大部分的BUG。到了这个阶段只会除BUG，不会对软件做任何大的更改。从Alpha到Beta再到Gamma是改进的先后关系，但RC1、RC2往往是取舍关系。
 Stable：稳定版。在开源软件中，都有stable版，这个就是开源软件的稳定发行版。

 */
const main = async () => {
  console.log('test git Head')
  const status = await execa.shell('git diff');
  console.log(status)

  let msg = ''
  const result = await execa.shell('git symbolic-ref --short -q HEAD')
  //console.log(result);
  if (!result.failed) {
    msg = result.stdout
  }
  //=> 'unicorns'
  console.log('msg', msg);
  if (msg && msg !== 'master' && semver.valid(packageJS.version)) {
    const version = semver.inc(packageJS.version, 'prerelease', 'beta');
    console.log('非master分支，只能提交beta版本');

    //await execa.shell(`npm version ${version}`);
    console.log('已修改版本号为:', version);
    //await execa.shell('npm publish');
    console.log(version,'已发布');
  }


  /*  branch((err, str) => {
   if (err) throw err;
   console.log(str);
   //=> 'master'

   if(str !== 'master' && !packageJS.version.includes('-beta.')){
   // 阻止publish

   console.log('非master分支，只能提交beta版本');
   process.exit(1);

   }

   // 允许发布
   });*/
}

const branch = (cb) => {
  var cwd = process.cwd();
  fs.readFile(gitHeadpath(cwd), function (err, buf) {
    if (err) {
      cb(err);
      return;
    }
    cb(null, parseBranches(buf));
  });
}


const parseBranches = (str) => {
  var match = /ref: refs\/heads\/([^\n]+)/.exec(String(str));
  return match && match[1];
}

const gitHeadpath = (cwd) => {
  return path.join(cwd || process.cwd(), '.git/HEAD');
}


main()