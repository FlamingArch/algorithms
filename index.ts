import { SinglyLinkedList } from "./LinkedList.ts";

let lineSeperator = "";

let list = new SinglyLinkedList();
list.append(2);
list.append(4);
list.append(6);
console.log(list.toString() + lineSeperator);
list.insertAt(1, 0);
list.insertAt(3, 2);
list.insertAt(5, 4);
console.log(list.toString() + lineSeperator);
