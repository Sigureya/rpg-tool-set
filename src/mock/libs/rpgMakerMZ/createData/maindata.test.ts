import { describe, it, expect } from "vitest";
import {
  createActor,
  createEnemy,
  createArmor,
  createWeapon,
  createClass,
  createSkill,
  createItem,
  createState,
  createParamArray,
} from "./mainData";

describe("Object Creation Functions", () => {
  it("createActor creates a valid actor object", () => {
    const actor = createActor({ name: "Hero", classId: 1 });
    expect(actor.name).toBe("Hero");
    expect(actor.classId).toBe(1);
    expect(actor.id).toBe(0);
    expect(actor.initialLevel).toBe(1);
  });

  it("createEnemy creates a valid enemy object", () => {
    const enemy = createEnemy({ name: "Slime", exp: 10 });
    expect(enemy.name).toBe("Slime");
    expect(enemy.exp).toBe(10);
    expect(enemy.params.length).toBe(8); // Ensure params array length
    expect(enemy.dropItems).toEqual([]); // Default empty array
  });

  it("createArmor creates a valid armor object", () => {
    const armor = createArmor({ name: "Leather Armor", price: 100 });
    expect(armor.name).toBe("Leather Armor");
    expect(armor.price).toBe(100);
    expect(armor.params.length).toBe(8);
  });

  it("createWeapon creates a valid weapon object", () => {
    const weapon = createWeapon({ name: "Iron Sword", wtypeId: 1 });
    expect(weapon.name).toBe("Iron Sword");
    expect(weapon.wtypeId).toBe(1);
    expect(weapon.damage.formula).toBe("0"); // Ensure default damage formula
  });

  it("createClass creates a valid class object", () => {
    const classObj = createClass({
      name: "Warrior",
      expParams: [30, 20, 10, 10],
    });
    expect(classObj.name).toBe("Warrior");
    expect(classObj.expParams).toEqual([30, 20, 10, 10]);
  });

  it("createSkill creates a valid skill object", () => {
    const skill = createSkill({ name: "Fireball", mpCost: 10 });
    expect(skill.name).toBe("Fireball");
    expect(skill.mpCost).toBe(10);
    expect(skill.damage.variance).toBe(20); // Ensure default variance
  });

  it("createItem creates a valid item object", () => {
    const item = createItem({ name: "Potion", price: 50 });
    expect(item.name).toBe("Potion");
    expect(item.price).toBe(50);
  });

  it("createState creates a valid state object", () => {
    const state = createState({ name: "Poison", removeByDamage: true });
    expect(state.name).toBe("Poison");
    expect(state.removeByDamage).toBe(true);
    expect(state.minTurns).toBe(1); // Default value
  });

  it("createParamArray creates an array of 8 zeros", () => {
    const params = createParamArray();
    expect(params).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
