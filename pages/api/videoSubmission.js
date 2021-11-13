// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let submissions = [
  {
    uid: 1,
    topic: "Algebra",
    email: "teststudent1@schoolhouse.world",
    session: "loom.com/a"
  },
  {
    uid: 2,
    topic: "Geometry",
    email: "teststudent2@schoolhouse.world",
    session: "loom.com/b"
  },
  {
    uid: 3,
    topic: "Algebra",
    email: "teststudent3@schoolhouse.world",
    session: "loom.com/c"
  },
  {
    uid: 4,
    topic: "Calculus",
    email: "teststudent4@schoolhouse.world",
    session: "loom.com/d"
  },
  {
    uid: 5,
    topic: "Calculus",
    email: "teststudent5@schoolhouse.world",
    session: "loom.com/e"
  },
  {
    uid: 6,
    topic: "Algebra",
    email: "teststudent6@schoolhouse.world",
    session: "loom.com/f"
  },
  {
    uid: 7,
    topic: "Geometry",
    email: "teststudent7@schoolhouse.world",
    session: "loom.com/g"
  }
]

let submissionsByTopic = []
let submissionPairings = []

export default function handler(req, res) {
  if (req.method === 'POST') {

    const {email, unitTopic, sessionLink } = req.body


    res.status(200).json({ submissions })

  } else if (req.method === 'GET') {
    // Handle any other HTTP method
  } else {
    // TODO: add request handling
  }
}



