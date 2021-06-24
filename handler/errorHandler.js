const errorHandler = (err, req, res) => {
    console.error(err.stack);
    res.status(500).json({success:false, message: "error occured, see the errorMessage key for more details", errorMessage: err.message})
}

module.exports = {errorHandler};