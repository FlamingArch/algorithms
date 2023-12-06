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
  private head: ListNode<T> | undefined;
  private tail: ListNode<T> | undefined;

  constructor() {
    this.listLength = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  get length(): number {
    return this.listLength;
  }

  get headNode(): T | undefined {
    return this.head?.value;
  }

  get tailNode(): T | undefined {
    return this.tail?.value;
  }

  append(item: T): void {
    if (this.head) {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = new ListNode(item);
      this.tail = current.next;
      this.listLength += 1;
      return;
    }
    this.head = new ListNode(item);
    this.tail = this.head;
    this.listLength += 1;
  }

  toString(): String {
    let current = this.head;
    let string = "";

    string += `Length: ${this.length}\n`;
    string += `Head: ${this.headNode} \n`;
    string += `Tail: ${this.tailNode}\n`;

    string += `List Values: ` + this.head?.value ?? "Empty List";
    while (current?.next) {
      current = current.next;
      string += `, ${current.value}`;
    }
    return string;
  }

  insertAt(item: T, index: number): void {
    if (index == 0) {
      let newNode = new ListNode(item);
      newNode.next = this.head;
      this.head = newNode;
      if (this.length == 0) this.tail = newNode;
      this.listLength++;
      return;
    }

    let current = this.head;
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
      if (this.length - 1 == index) this.tail = newNode;
    } else {
      throw new Error("Index Out Of Range!");
    }
  }
}
