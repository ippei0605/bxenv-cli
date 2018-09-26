/**
 * @file Cloud Foundry Environment CLI
 *
 * This is the CLI that makes the result of the cf env command the value of one line of VCAP_SERVICES or VCAP_APPLICATION.
 *  <pre>
 * USAGE:
 *   node cfenv_one_line -p PROPERTY_NAME [file] [-h|--help]
 * OPTIONS
 *   -p   PROPERTY_NAME: VCAP_SERVICES or VCAP_APPLICATION
 * </pre>
 *
 * @author Ippei SUZUKI
 */
'use strict';

// モジュールを読み込む。
const fs = require('fs');

// パラメータをセットする。
let help, target, property;
setParams();

if (help || !property) {
    usage();
} else if (target) {
    // ファイルから VCAP 値を取得する。
    fs.readFile(target, 'utf-8', (error, data) => {
        if (error) {
            console.log('error:', error);
        } else {
            console.log(getOneLine(data));
        }
    });
} else {
    // 標準入力から VCAP 値を取得する。
    let input = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
        input += chunk;
    });
    process.stdin.on('end', () => {
        console.log(getOneLine(input));
    });
}

// パラメータをチェックする。
function setParams () {
    // CLI パラメータを取得する。
    const argv = process.argv;

    for (let i = 2; i < argv.length; i++) {
        switch (argv[i]) {
            case '-h':
            case '--help':
                help = true;
                break;
            case '-p':
                const temp = argv[++i];
                if (temp === 'VCAP_SERVICES' || temp === 'VCAP_APPLICATION') {
                    property = temp;
                }
                break;
            default:
                target = argv[i];
                break;
        }
    }
}

// VCAP 値を1行の文字列にして返す。
function getOneLine (text) {
    try {
        const env = text.match(/({[\s\S]*VCAP_SERVICES[\s\S]*)[\s\S]*({[\s\S]*VCAP_APPLICATION[\s\S]*)((User-Provided|No user-defined env variables have been set)[\s\S]*)/);
        const vcapServices = JSON.parse(env[1]);
        const vcapApplication = JSON.parse(env[2]);
        if (property === 'VCAP_SERVICES') {
            return JSON.stringify(vcapServices.VCAP_SERVICES);
        } else {
            return JSON.stringify(vcapApplication.VCAP_APPLICATION);
        }
    } catch (e) {
        console.log(e);
        return '';
    }
}

// USAGE を表示する。
function usage () {
    const message =
        'USAGE:\n   node cfenv_one_line -p PROPERTY_NAME [file] [-h|--help]\n\n' +
        'OPTIONS\n   -p   PROPERTY_NAME: VCAP_SERVICES or VCAP_APPLICATION';
    console.log(message);
}