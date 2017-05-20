/**
 * Created by viktyz on 2017/5/20.
 */

var fs = require('fs');

var source_name = '';
var target_name = '';
module.exports = function content(source, target) {

    source_name = source;
    target_name = target;

    walk(process.cwd(), 0);
};

function walk(path, floor) {

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

                                walk(tmpPath, floor);
                            }
                            else {

                                changecontent(tmpPath);
                            }
                        }
                    }
                })
            });
        }
    });
}

function changecontent(tmpPath) {

    if (!fs.existsSync(tmpPath)) {

        return;
    }

    var contentText = fs.readFileSync(tmpPath, 'utf-8');

    var fdIndex = contentText.indexOf(source_name);
    if (fdIndex != -1) {

        console.log('Exist >>' + tmpPath);

        var reg = new RegExp(source_name, 'g');

        var rcontent = contentText.replace(reg, target_name);
        fs.writeFileSync(tmpPath, rcontent);
    }
}