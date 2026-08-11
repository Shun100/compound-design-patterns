import { Computer } from "../product/computer";

export interface ComputerBuilder {
  addCpu(cpu: string): ComputerBuilder;
  addRam(ram: number): ComputerBuilder;
  build(): Computer;
}