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

  toString(): String {
    let current = this.headNode;
    let string = "";

    string += `Length: ${this.length}\n`;
    string += `Head: ${this.headNode} \n`;
    string += `Tail: ${this.tailNode}\n`;

    string += `List Values: ` + this.headNode?.value ?? "Empty List";
    while (current?.next) {
      current = current.next;
      string += `, ${current.value}`;
    }
    return string;
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
    } else {
      throw new Error("Index Out Of Range!");
    }
  }
}
