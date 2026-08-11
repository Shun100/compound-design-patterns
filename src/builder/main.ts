import { DesktopBuilder } from "./builder/desktop-builder";
import { LaptopBuilder } from "./builder/laptop-builder";

function main() {

  const desktop = new DesktopBuilder()
    .addCpu('Core i5')
    .addRam(16)
    .build();
  
  const laptop = new LaptopBuilder()
    .addCpu('Core i3')
    .addRam(8)
    .build();
  
  console.log(desktop);
  console.log(laptop);
}

main();