const loggerMiddleware = (store) => (next) => (action) => {
  if(!next ) {
    console.log("next is not defined : see ( loggerMiddleware ) ")
    return 
  }
  console.log("🔹 Dispatching Action:", action);
  console.log("📌 State Before:", store.getState()); 
  const result = next(action);
  console.log("✅ State After:", store.getState());
  return result;
};

export default loggerMiddleware;