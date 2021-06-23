const {verify} = require('jsonwebtoken')

const validacaoToken = (req, res, next) => {
  const token = req.header("token");

  if (!token) return res.json({ error: " O usuário não está logado! " });

  try {
    const validacaoToken = verify(token, "chavedeacesso");
    
    if(validacaoToken){
        return next();
    }

  }catch(err){
    return res.json({error: err})
  }
};

module.exports = {validacaoToken};
