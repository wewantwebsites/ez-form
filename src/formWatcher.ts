export function makeSetter(cb: Function) {
  return (obj: Record<any, any>, prop: string, value: number | string) => {
    try {
      cb && cb(obj, prop);
      return true;
    } catch (err) {
      return true;
    } finally {
      obj[prop] = value;
    }
  };
}

export const makeResetOtherKeys = (keyVal: string) => {
  if (!keyVal) return;
             return (obj: Record<any, any>, prop: string) => {
    const [od, id] = prop.split("-");
    const otherkeys = Object.keys(obj).filter((k) =>
      id ? k.startsWith(od) : !k.startsWith(keyVal)
    );

            otherkeys.forEach((key) => {
      obj[key] = null;
    });
  }
};
