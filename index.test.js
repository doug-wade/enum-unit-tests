test('enum members are equal to themselves', () => {
  enum A {
    A,
    B,
    C
  };

  expect(A.A).toBe(A.A);
  expect(A.B).toBe(A.B);
  expect(A.C).toBe(A.C);
});

test('enum members aren\'t equal to other enum members with the same name', () => {
  enum A {
    A,
    B,
    C
  };

  enum B {
    A,
    B,
    C
  };

  expect(A.A).not.toBe(B.A);
  expect(A.B).not.toBe(B.B);
  expect(A.C).not.toBe(B.C);
});

test('enums have a method .size that returns the number of members', () => {
  enum A {
    A,
    B,
    C
  };

  expect(A.size()).toBe(3);
});

test('enums have a method .keys that has all keys', () => {
  enum A {
    A,
    B,
    C
  }

  expect(A.keys().length).toBe(3);
  for (const key of A.keys()) {
    expect(A[key]).toBeTruthy();
  }
});

test('enums have a method .values that returns all values', () => {
  enum A {
    A,
    B,
    C
  }

  const invertedIndex = {};
  for (const [key, value] of A.entries()) {
    invertedIndex[value] = key;
  }

  expect(A.values().length).toBe(3);
  for (const value of A.values()) {
    expect(A[invertedIndex[value]]).toBeTruthy();
  }
});

test('enums have a method .entries that returns all entries', () => {
  enum A {
    A,
    B,
    C
  };

  let i = 0;
  for (const [key, value] of A.entries()) {
    i++;
    expect(A[key]).toBe(value);
  }
  expect(i).toBe(A.size());
});

test('enums have a method .has that returns true for all members', () => {
  enum A {
    A,
    B,
    C
  };

  for (const value of A.values()) {
    expect(A.has(value)).toBeTruthy();
  }
});

test('enums have a method .has that returns false for members of other enums', () => {
  enum A {
    A,
    B,
    C
  };

  enum B {
    A,
    B,
    C
  };

  for (const value of A.values()) {
    expect(B.has(value)).toBeFalsy();
  }
  for (const value of B.values()) {
    expect(A.has(value)).toBeFalsy();
  }
});

test('enums have a method .forEach that calls a callback on every member', () => {
  enum A {
    A,
    B,
    C
  };

  let members = [];
  A.forEach(member => members.push(member));
  expect(members.length).toBe(A.size());
});

test('enum members are enumerable', () => {
  enum A {
    A,
    B,
    C
  };

  let i = 0;
  for (const member in A) {
    i++;
    expect(A[member]).toBe(A[member]);
  }

  expect(i).toBe(A.values().length);
});

test('enums identifier is optional', () => {
  const A = enum {
    A,
    B,
    C
  };

  expect(A.size()).toBe(3);
  expect(typeof A.A).toBe('symbol');
});

test('enums can be used with switch', () => {
  enum A {
    A,
    B,
    C
  };

  let val;
  switch (A.B) {
    case A.A:
      val = 'hi';
      break;
    case A.B:
      val = 'hello';
      break;
    case A.C:
      val = 'hi there';
      break;
    default:
      throw new Error('you gotta specify one')
  }

  expect(val).toBe('hello');
});

test('enums can be nested', () => {
  enum COLORS {
    GREY = enum {
      LIGHT = '#aaa',
      DARK = '#fff'
    },
    BLUE = enum {
      LIGHT = '#a3f',
      DARK = '#f6f'
    }
  };

  expect(COLORS.GREY.LIGHT).toBe('#aaa');
  expect(COLORS.BLUE.DARK).toBe('#f6f');
});

test('supports inline assignments to override the default value', () => {
  const aValue = 'A';
  enum A {
    A = aValue,
    B = 'B'
  };

  expect(A.A).toBe(aValue);
  expect(A.B).toBe('B');
});
