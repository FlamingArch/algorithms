interface LinkedList<T> {
  get length(): number; // ✅
  insertAt(item: T, index: number): void;
  remove(item: T): T | undefined;
  removeAt(index: number): T | undefined;
  append(item: T): void; // ✅
  prepend(item: T): void;
  get(index: number): T | undefined;
  toString(): String;
}

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

  append(item: T): void {
    if (this.head) {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = new ListNode(item);
      this.listLength += 1;
      return;
    }
    this.head = new ListNode(item);
    this.listLength += 1;
  }

  toString(): String {
    let current = this.head;
    let string =
      `List Length: ${this.length}\nList Values: ` + this.head?.value ??
      "Empty List";
    while (current?.next) {
      current = current.next;
      string += `, ${current.value}`;
    }
    return string;
  }
}
