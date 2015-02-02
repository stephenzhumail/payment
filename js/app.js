var csv = require('csv');
var email = require('emailjs');
var fs = require('fs');
var config = require("./../data/config.js").config;
fs.readFile('./data/gongzi.csv', 'utf8', function (err, data) {
    console.log('in fs');
    if (err) throw err;
    console.log(data);

    csv.parse(data, function (err, data) {
        var server = email.server.connect(config);

        var title = data.shift();

        data.forEach(function (item) {
            var email = item.pop();
            var td = item.join('</td><td>');
            td = '<td>' + td + '</td>';
            var th = title.join('</th><th>');
            th = '<th>' + th + '</th>';
            var table = ['<html><table><tr>', th, '</tr><tr>', td, '</tr></table></html>'];
            table = table.join('');
            console.info(table);
            var message = {
                from: 'qiaoliang<qiaolianggame@163.com>',
                to: email,
                // cc: einfo.cc
                subject: item[0] + '工资单',
                attachment: [
                    {data: table, alternative: true}
                ]
            };

            server.send(message, function (err, message) {
                console.info('发送邮件成功');
            });
        });
    });
}); 