import { Logger, type Component } from "../basic/decorator.js";

export class DecoratorBuilder {
  private decorators: Array<(component: Component) => Component> = [];

  addDecorator(decorator: (component: Component) => Component): this {
    this.decorators.push(decorator);
    return this;
  }

  build(): Component {
    return this.decorators.reduce((component, decorator) => decorator(component), new Logger());
  }
}