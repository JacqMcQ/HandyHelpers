import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 

// set token secret and expiration date
const secret = process.env.JWT_SECRET;
const expiration = '2h';


  // function for our authenticated routes
  export const authMiddleware = ({ req }) => {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  }

  export const signToken = ({ username, email, _id }) => {
    const payload = { username, email, _id };
console.log(secret);
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  };
