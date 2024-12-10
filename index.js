class Room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {};
    this._character = ""
  }
  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get character() {
    return this._character;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("description is too short.");
      return;
    }
    this._description = value;
  }

  set character(value) {
    this._character = value;
  }

  describe() {
    return (
      "Looking around the " + this._name + " you can see " + this._description
    );
  }
  getDetails() {
    // object entries returns an array of both the key and value of items in the object
    const entries = Object.entries(this._linkedRooms);
    // initialise an empty details array which will hold the formatted string based on the linked room entries
    let details = [];
    // use a for loop to loop over the entries array and specify we want the key and the value
    for (const [direction, room] of entries) {
      // format a string based on the object. We only take the information we want.
      let text = `The ${room._name} is to the ${direction}`;
      details.push(text);
      return details;
    }
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You can not go that way");
      return this;
    }
  }

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }
}

class Character {
  constructor(name) {
    (this._name = name),
    (this._description = "");
    this._conversation = "";

  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Decription is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("conversation is too short.");
      return;
    }
    this._conversation = value;
  }
  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }

  describe() {
    return `You have met ${this._name}. ${this._description}`;
  }
  converse() {
    return `${this._name} says ${this._conversation}`;
  }

}

// assignment: Figure out how to link characters to rooms.

const Kitchen = new Room("Kitchen");
Kitchen.description = "a large room with two worktops, and a window by the sink. Food is stored and cooked here. This may be the perfect place to go for dinner if you are a mouse."
const QuietRoom = new Room("Quiet Room");
QuietRoom.description = "a sofa, bookshelf, and a fire place. It is a small room in the middle of the house. Nice and cosy for snoozing in. You can access every room in the house from here.";
const GamesRoom = new Room("Games Room");
GamesRoom.description = "a room full of cat toys and children toys.";
const Office = new Room("Office");
Office.description =
  "a room with a desk, comfy chair, snacks, and a bay window.";
const Catio = new Room("Catio");
Catio.description =
  "a glass room with floor heating and two cat beds, overlooking the beautiful garden.";


  QuietRoom.linkRoom("south", Catio);
  QuietRoom.linkRoom("north", Office);
  QuietRoom.linkRoom("east", Kitchen);
  QuietRoom.linkRoom("west", GamesRoom);
  Kitchen.linkRoom("west", QuietRoom);
  Office.linkRoom("south", QuietRoom);
  Catio.linkRoom("north", QuietRoom);
  GamesRoom.linkRoom("east", QuietRoom);



const Truffles = new Character("Truffles");
Truffles.description = "The mother cat. Living her best life playing in the games room";
Truffles.conversation = "The is a cute little creature sleeping in my bed in the Quiet room.";
const Poppy = new Character("Poppy");
Poppy.description = "The cat enjoying her views and temperature in the catio after eating her 5th meal of the day in the kitchen already."
Poppy.conversation = "Meow. I think I heard something in the kitchen.";
// const Mouse1 = new Character("Mouse1");
// Mouse1.description


GamesRoom.character = Truffles;
Catio.character = Poppy;
  


// the room parameter to this function is a room object

const displayRoomInfo = (room) => {
  let occupantMsg = "";

  if (room.character) {
    occupantMsg = room.character.describe() + room.character.converse();

    // logic here for displaying the character in the room and their dialogue
  } else {
    occupantMsg = "There is no one else in the room.";
  }

  textContent =
    "<p>" +
    room.describe() +
    "</p>" +
    "<p>" +
    occupantMsg +
    "</p>" +
    "<p>" +
    room.getDetails() +
    "</p>";
  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("buttonarea").innerHTML =
    '> <input type="text" id="usertext"/>';
  document.getElementById("usertext").focus();
};

const startGame = () => {
  currentRoom = Kitchen 
  displayRoomInfo(currentRoom);


  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      //grab the contents of the input box
      const command = document.getElementById("usertext").value;
      const directions = ["north", "south", "east", "west"];

      if (directions.includes(command.toLowerCase())) {
        currentRoom = currentRoom.move(command);
        document.getElementById("usertext").value = "";
        displayRoomInfo(currentRoom);
      } else {
        alert("That is not a valid command. Please try again.");
        displayRoomInfo(currentRoom);
        document.getElementById("usertext").value = "";
      }
    }
  });
};

startGame();
