import { LinkedList } from "./interfaces/index.ts";

class ListNode<T> {
  value: T;
  next: ListNode<T> | undefined;

  constructor(value: T) {
    this.value = value;
    this.next = undefined;
  }
}

export class SinglyLinkedList<T> implements LinkedList<T> {
  private listLength: number;
  private headNode: ListNode<T> | undefined;
  private tailNode: ListNode<T> | undefined;

  constructor() {
    this.listLength = 0;
    this.headNode = undefined;
    this.tailNode = undefined;
  }

  get length(): number {
    return this.listLength;
  }

  get head(): T | undefined {
    return this.headNode?.value;
  }

  get tail(): T | undefined {
    return this.tailNode?.value;
  }

  toString(): String {
    let current = this.headNode;
    let string = "";

    string += `Length: ${this.length}\n`;
    string += `Head: ${this.head} \n`;
    string += `Tail: ${this.tail}\n`;

    string += `List Values: ` + this.headNode?.value ?? "Empty List";
    while (current?.next) {
      current = current.next;
      string += `, ${current.value}`;
    }
    return string;
  }

  get(index: number): T | undefined {
    let current = this.headNode;
    for (let i = 0; i < index; i++) {
      if (current) {
        current = current?.next;
      } else throw new Error("Index out of range!");
    }
    if (current) return current.value;
    else throw new Error("Index out of range!");
  }

  append(item: T): void {
    if (this.headNode) {
      let current = this.headNode;
      while (current.next) {
        current = current.next;
      }
      current.next = new ListNode(item);
      this.tailNode = current.next;
      this.listLength += 1;
      return;
    }
    this.headNode = new ListNode(item);
    this.tailNode = this.headNode;
    this.listLength += 1;
  }

  prepend(item: T): void {
    let newNode = new ListNode(item);
    newNode.next = this.headNode;
    this.headNode = newNode;
    this.listLength++;
  }

  insertAt(item: T, index: number): void {
    if (index == 0) {
      let newNode = new ListNode(item);
      newNode.next = this.headNode;
      this.headNode = newNode;
      if (this.length == 0) this.tailNode = newNode;
      this.listLength++;
      return;
    }

    let current = this.headNode;
    for (let i = 1; i < index; i++) {
      if (current) {
        current = current?.next;
      } else {
        throw new Error("Index Out Of Range!");
      }
    }

    if (current) {
      let newNode = new ListNode(item);
      newNode.next = current.next;
      current.next = newNode;
      this.listLength++;
      if (this.length - 1 == index) this.tailNode = newNode;
      return;
    }
    throw new Error("Index Out Of Range!");
  }

  remove(item: T): T | undefined {
    let current = this.headNode;

    if (current?.value == item) {
      this.headNode = current.next;
      this.listLength -= 1;
    }

    while (current?.next?.value != item) {
      if (!current?.next) throw new Error("Item not found in list!");
      current = current?.next;
      return;
    }

    let nodeToRemove: ListNode<T> = current.next;
    if (!nodeToRemove) {
      return;
    }

    current.next = nodeToRemove.next;
    this.listLength -= 1;
    return nodeToRemove.value;
  }
}
