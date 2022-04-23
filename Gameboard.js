import { Ship } from "./Ship";

export function Gameboard() {
  let shipsHere = []; // <-- contains the coordinate locations on which ships have been placed
  let ship;
  let shipsObject = {};
  let targetShip;
  return {
    placeShip(shipModel, ...coordies) {
      ship = Ship(shipModel);
      let coordinates = coordies;
      // <-- register [{destroyer: 'A7'}, {anotherShip: 'coordinates'}, {etc...}];
      let obj = {};
      obj.ship = ship.getName();
      obj.damage = ship.damageReport();
      obj.hit = ship.hit;
      obj.isSunk = ship.isSunk;
      obj.getName = ship.getName;
      obj.getLength = ship.getLength;
      obj.positions = coordinates;
      shipsHere.push(obj); // <-- store each {ship:coord} inside [shipsHere];
      shipsObject[ship.getName()] = ship;
      // if (shipsHere.length < 1) shipsHere.push({});
      return { ship, coordinates, shipsHere };
    },
    shipsPls() {
      return shipsHere;
    },
    shipsObjectPls() {
      return shipsObject;
    },
    receiveAttack(coordinates) {
      try {
        //<-- if position has been hit before, => false
        // <-- is there a ship at those coordinates? If yes, proceed with line below
        if (shipsHere.some((e) => e.positions.includes(coordinates))) {
          targetShip = shipsHere.find((e) => e.positions.includes(coordinates)); // <-- we get the ship at the input coordinates (the targeted ship's own object)
          //<--- before, we were targeting the <ship> variable, which is always the most recently created ship
          // <-- but now, we're updating the ship we're targeting to be the one at the current coordinates
          if (targetShip.damage.includes(coordinates)) return false; // <-- if that position has already been hit, return false.
          targetShip.hit(coordinates);
          if (targetShip.isSunk()) {
            return `${targetShip.getName()} has been sunk`;
          }
          return `${targetShip.getName()} HP: ${targetShip.getLength()}`;
          // if (targetShip.hit(coordinates)) {
          //   // ^ => false on repeat hits, true otherwise
          //   if (ship.isSunk()) return `${ship.getName()} has been sunk`;
          //   return `${ship.getName()} HP: ${ship.getLength()}`;
          // }
        } else {
          return false; // <-- player hit the water, there's no ships there
        }
      } catch (err) {
        return err;
      }
    },
  };
}
