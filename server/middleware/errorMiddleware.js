function errorMiddleware(err, req, res, next) {
    if (err.name === "CastError") {
        return res.status(400).json({ error: err.message});
    }
    else{
        res.status(500).json({
        error: err.message
  });
    }
}

export default errorMiddleware;