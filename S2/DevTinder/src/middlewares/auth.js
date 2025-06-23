const adminAuth = (req, res, next) => {
  const token = "abc";
  const isAuth = token === "abc";

  if (!isAuth) {
    res.status(401).send("Unauthorize Access");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "sabc";
  const isAuth = token === "abc";

  if (!isAuth) {
    res.status(401).send("Unauthorize Access");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
