import Interpreter from "js-interpreter";

// here we change Interpreter.prototype.initGlobalScope to remove window global
// because it's readonly in original code. When running code, we set our own
// editor global scope.

Interpreter.prototype.initGlobalScope = function initGlobalScope (scope) {
  // Initialize uneditable global properties.
  this.setProperty(scope,
    `Infinity`,
    this.createPrimitive(Infinity),
    Interpreter.READONLY_DESCRIPTOR,
  );
  this.setProperty(scope, `NaN`, this.NAN, Interpreter.READONLY_DESCRIPTOR);
  this.setProperty(
    scope,
    `undefined`,
    this.UNDEFINED,
    Interpreter.READONLY_DESCRIPTOR,
  );
  this.setProperty(scope, `self`, scope); // Editable.

  // Initialize global objects.
  this.initFunction(scope);
  this.initObject(scope);

  // Unable to set scope's parent prior (this.OBJECT did not exist).
  scope.parent = this.OBJECT;
  this.initArray(scope);
  this.initNumber(scope);
  this.initString(scope);
  this.initBoolean(scope);
  this.initDate(scope);
  this.initMath(scope);
  this.initRegExp(scope);
  this.initJSON(scope);
  this.initError(scope);

  // Initialize global functions.
  let wrapper = (num) => {
    num = num || this.UNDEFINED;

    return this.createPrimitive(isNaN(num.toNumber()));
  };

  this.setProperty(scope, `isNaN`, this.createNativeFunction(wrapper));

  wrapper = (num) => {
    num = num || this.UNDEFINED;

    return this.createPrimitive(isFinite(num.toNumber()));
  };

  this.setProperty(scope, `isFinite`, this.createNativeFunction(wrapper));

  this.setProperty(
    scope,
    `parseFloat`,
    this.getProperty(this.NUMBER, `parseFloat`),
  );

  this.setProperty(
    scope,
    `parseInt`,
    this.getProperty(this.NUMBER, `parseInt`),
  );

  const func = this.createObject(this.FUNCTION);

  func.eval = true;

  this.setProperty(
    func,
    `length`,
    this.NUMBER_ONE,
    Interpreter.READONLY_DESCRIPTOR,
  );
  this.setProperty(scope, `eval`, func);

  const strFunctions = [
    [escape, `escape`],
    [unescape, `unescape`],
    [decodeURI, `decodeURI`],
    [decodeURIComponent, `decodeURIComponent`],
    [encodeURI, `encodeURI`],
    [encodeURIComponent, `encodeURIComponent`],
  ];

  for (let i = 0; i < strFunctions.length; i++) {
    wrapper = ((nativeFunc) => {
      return (str) => {
        str = (str || this.UNDEFINED).toString();

        try {
          str = nativeFunc(str);
        } catch (e) {
          // decodeURI('%xy') will throw an error.  Catch and rethrow.
          this.throwException(this.URI_ERROR, e.message);
        }

        return this.createPrimitive(str);
      };
    })(strFunctions[i][0]);

    this.setProperty(
      scope,
      strFunctions[i][1],
      this.createNativeFunction(wrapper),
    );
  }

  // Run any user-provided initialization.
  /* eslint-disable no-underscore-dangle */
  if (this.initFunc_) {
    this.initFunc_(this, scope);
  }
  /* eslint-enable no-underscore-dangle */
};

export default Interpreter;