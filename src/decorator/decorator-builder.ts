import { Logger, type Component } from "./decorator.js";

export class DecoratorBuilder {
  private decorators: Array<(component: Component) => Component> = [];

  addDecorator(decorator: (component: Component) => Component): this {
    this.decorators.push(decorator);
    return this;
  }

  build(): Component {
    // reduce: 配列の要素を1つずつ処理して、最終的に1つの値にまとめる。
    return this.decorators.reduce((component, decorator) => decorator(component), new Logger());
  }
}