export class Helpers {
  static lowerCase(str: string): string {
    return str.toLowerCase();
  }
  static generateId() {
    const num = Math.random() * (10000000000 - 2 + 1) + 2;
    return num.toString().split(".").join("");
  }
}
