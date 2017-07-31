var exec = require('child_process').exec;

function executeOsCommand(command, callback) {
    exec(command, function (error, stdout, stderr) {
        callback(stdout);
    });
};

module.exports.getGitUser = function (callback) {
    executeOsCommand('git config --global user.name', function (name) {
        executeOsCommand('git config --global user.email', function (email) {
            callback({ name: name.replace('\n', ''), email: email.replace('\n', '') });
        });
    });
};

module.exports.getOsName = function (callback) {
    executeOsCommand('lsb_release -a', function (osname) {
        callback(
            { osname: osname.replace('\n', '') }
        );
    });
}

module.exports.getRamInfo = function (callback) {
    executeOsCommand('free -m', function (result) {
        callback(
            { cmdresult: result }
        );
    });
}
