export default (object: any) => {
  console.log("--------------------");
  console.log("System Error", object);
  console.log("--------------------");

  if (object.name === "MongoError") {
    switch (object.code) {
      case 11000: {
        object.message = "You are not allow to enter duplicate record";
      }
    }
  }

  // Challan details api error handling start
  // To handle empty params
  // if (object.name === "TypeError") {
  //   object.message = "empty string";
  //   object.status = 403;
  // }
  // Challan details api error handling end

  return {
    status: object.status || 500,
    message: object.message || "Something wrong happen on backend",
    error: object.error
  };
};
