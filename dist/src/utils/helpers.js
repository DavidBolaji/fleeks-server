"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
class Helpers {
    static lowerCase(str) {
        return str.toLowerCase();
    }
    static generateId() {
        const num = Math.random() * (10000000000 - 2 + 1) + 2;
        return num.toString().split(".").join("");
    }
}
exports.Helpers = Helpers;
//# sourceMappingURL=helpers.js.map