/**
 * Created by viktyz on 2017/5/17.
 */

var P = require('path');
var fs = require('fs');
var shell = require('shelljs');

var source_name = '';
var target_name = '';
module.exports = function name(source, target) {

    source_name = source;
    target_name = target;

    walk(process.cwd(), 0, rename);
};

function walk(path, floor, cb) {

    floor++;
    fs.readdir(path, function (err, files) {
        if (err) {
            console.log('read dir error');
        } else {
            files.forEach(function (item) {
                var tmpPath = path + '/' + item;
                fs.stat(tmpPath, function (err1, stats) {

                    if (err1) {
                        console.log('stat error');
                    } else {

                        var fdStart = item.indexOf('.');
                        if (fdStart != 0) {

                            if (stats.isDirectory()) {

                                var npath = cb(path, tmpPath, item);

                                if (npath.length > 0) {
                                    walk(npath, floor, cb);
                                }
                                else {
                                    walk(tmpPath, floor, cb);
                                }
                            }
                        }
                    }
                })
            });
        }
    });
}

function is_match(path, target) {

    return (P.basename(path).indexOf(target) >= 0);
}

function rename(path, tmpPath, item) {

    if (!is_match(item, source_name)) {
        return '';
    }

    var tname = item.replace(source_name, target_name);
    var tpath = P.join(path, tname);

    console.log('source >>' + tmpPath);
    console.log('target >>' + tpath);

    shell.cp('-rf', tmpPath, tpath);
    shell.rm('-rf', tmpPath);

    return tpath;
}