import { getRandomInteger } from "../math";

export class Logger {
  static debugColor = "#39c5bb";

  static errorColor = "red";

  static debug(...args: any[]) {
    if (process?.env?.NODE_ENV !== "production") {
      console.log(
        `%c debug `,
        `background-color:${Logger.debugColor};color:white;padding:2px;border-radius:4px;font-weight:600`,
        ...args
      );
    }
  }

  static error(...args: any[]) {
    if (process?.env?.NODE_ENV !== "production") {
      console.log(
        `%c debug `,
        `background-color:${Logger.errorColor};color:white;padding:2px;border-radius:4px;font-weight:600`,
        ...args
      );
    }
  }

  static defaultStyle = `color:white;padding:2px;font-weight:600;padding:2px 1em;background-color:#606060;`;

  static colorList = ["#66ccff", "#ab81e4", "#606060", "#689ddf"];

  static twoStage(config: { name: string; color?: string }[]) {
    const content = config.reduce((pre, cur, index) => {
      if (index === config.length - 1) {
        //@ts-ignore
        color = Logger.debugColor;
      }
      const dom = `%c${cur.name}`;

      if (pre[0]) {
        //@ts-ignore
        pre[0] = pre[0] + dom;
      } else {
        //@ts-ignore
        pre.push(dom);
      }
      let color = cur.color
        ? cur.color
        : Logger.colorList[getRandomInteger(0, Logger.colorList.length - 1)];
      let style = Logger.defaultStyle;

      if (index === config.length - 1) {
        style =
          style +
          Logger.defaultStyle +
          `background-color: #39c5bb;` +
          "border-top-right-radius:4px;border-bottom-right-radius:4px;";
      } else {
        style = style + Logger.defaultStyle + `;background-color: ${color};`;
        if (index === 0) {
          style =
            style + "border-top-left-radius:4px;border-bottom-left-radius:4px;";
        }
      }
      //@ts-ignore
      pre.push(style);
      return pre;
    }, []);
    console.log(...content);
  }
}
