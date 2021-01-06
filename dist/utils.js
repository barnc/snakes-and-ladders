"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keypress = void 0;
exports.keypress = async () => {
    process.stdin.setRawMode(true);
    return new Promise(resolve => process.stdin.once('data', () => {
        process.stdin.setRawMode(false);
        resolve(null);
    }));
};
