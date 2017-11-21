#!/usr/bin/env bash
rmbuild(){
    if [ ! -d "build/backup" ];then
        mkdir build/backup
    fi
otherFile=`ls build/* |wc -w`
 if [ "$otherFile" -gt "0" ];then
         rm build/*
     fi
}
rmbuild && ./node_modules/.bin/babel src --out-dir build