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

test('enums has a .keys method that has all keys', () => {
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

test('enums has a .values method that has all values', () => {
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

test('enums have a memberOf method that returns true for all members', () => {
  enum A {
    A,
    B,
    C
  };

  for (const value of A.values()) {
    expect(A.memberOf(value)).toBeTruthy();
  }
});

test('enum have a memberOf method that returns false for members of other enums', () => {
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
    expect(B.memberOf(value)).toBeFalsy();
  }
  for (const value of B.values()) {
    expect(A.memberOf(value)).toBeFalsy();
  }
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
  debugger;
  expect(i).toBe(A.values().length);
});

/** TODO
test('supports inline assignments to override the default value', () => {
  const aValue = 'A';
  enum A {
    A = aValue,
    B = 'B'
  };

  expect(A.A).toBe(aValue);
  expect(A.B).toBe('B');
});

test('supports computed enum members', () => {
  const aValue = 'A';
  const bValue = 'B';
  const cValue = 'C';
  enum A {
    [aValue],
    [bValue] = bValue,
    [cValue]
  };

  expect(A[aValue]).toBeTruthy();
  expect(typeof A[aValue]).toBe(typeof Symbol);
  expect(A[bValue]).toBe(bValue);
  expect(A[cValue]).toBeTruthy();
  expect(typeof A[cValue]).toBe(typeof Symbol);
});
*/
