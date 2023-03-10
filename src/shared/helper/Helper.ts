export class Helper {
  static isDefined<T>(val: T | undefined | null): val is T {
    const s = val;
    const status = s !== null && s !== undefined;
    return status;
  }

  static isNotDefined<T>(val: T | undefined | null): val is T {
    return !this.isDefined<T>(val);
  }
}
