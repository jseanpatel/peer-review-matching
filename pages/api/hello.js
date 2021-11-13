// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function testing(req, res) {
  const {email, unitTopic, sessionLink } = req.body
  res.status(200).json({ name: 'You have reached /testing' })
}


