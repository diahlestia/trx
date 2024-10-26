function ErrorHandler(err, req, res, next) {
    switch (err.name) {
      case "InvalidEmailPassword":
        res.status(400).json(err.msg);
        break;
      case "InvalidRegister":
        res.status(400).json(err.msg);
        break;
      case "NegativeStock":
        res.status(400).json(err.msg);
        break;
      case "NegativePrice":
        res.status(400).json(err.msg);
        break;
      case "InvalidStockPrice":
        res.status(400).json(err.msg);
        break;
      case "EmptyInput":
        res.status(400).json(err.msg);
        break;
  
      case "InvalidStatusCode":
        res.status(403).json(err.msg);
        break;
  
      case "WrongEmailPassword":
        res.status(403).json(err.msg);
        break;
      case "Unregistered":
        res.status(404).json(err.msg);
        break;
      case "Unauthorize":
        res.status(401).json(err.msg);
        break;
      case "ProductNotFound":
        res.status(404).json(err.msg);
        break;
      case "AuthenticationError":
        res.status(403).json(err.msg);
        break;
      case "EmailNotFound":
        res.status(404).json(err.msg);
        break;
      case "ProductNotCreated":
        res.status(404).json(err.msg);
        break;
      case "JwtNotProvided":
        res.status(500).json(err.msg);
        break;
      default:
        res.status(500).json({ message: err.msg });
        break;
    }
  }
  module.exports = ErrorHandler;