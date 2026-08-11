import { Computer } from "../product/computer";
import { ComputerBuilder } from "./computer-builder";

export class LaptopBuilder implements ComputerBuilder {
  private readonly computer: Computer;

  constructor() {
    this.computer = { type: 'Laptop' };
  }

  // @Override
  addCpu(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;
  }

  // @Override
  addRam(ram: number): ComputerBuilder {
    this.computer.ram = ram;
    return this;
  }

  // @Override
  build(): Computer {
    return this.computer;
  }
}