let submissions = [
  {
    uid: 1,
    unitTopic: "Algebra",
    email: "teststudent1@schoolhouse.world",
    sessionLink: "loom.com/a",
  },
  {
    uid: 2,
    unitTopic: "Geometry",
    email: "teststudent2@schoolhouse.world",
    sessionLink: "loom.com/b",
  },
  {
    uid: 3,
    unitTopic: "Algebra",
    email: "teststudent3@schoolhouse.world",
    sessionLink: "loom.com/c",
  },
  {
    uid: 4,
    unitTopic: "Calculus",
    email: "teststudent4@schoolhouse.world",
    sessionLink: "loom.com/d",
  },
  {
    uid: 5,
    unitTopic: "Calculus",
    email: "teststudent5@schoolhouse.world",
    sessionLink: "loom.com/e",
  },
  {
    uid: 6,
    unitTopic: "Algebra",
    email: "teststudent6@schoolhouse.world",
    sessionLink: "loom.com/f",
  },
  {
    uid: 7,
    unitTopic: "Geometry",
    email: "teststudent7@schoolhouse.world",
    sessionLink: "loom.com/g",
  },
  {
    uid: 8,
    unitTopic: "Statistics",
    email: "teststudent8@schoolhouse.world",
    sessionLink: "loom.com/h",
  },
];

let sortedSubmissions = {
  Algebra: [
    {
      uid: 1,
      unitTopic: "Algebra",
      email: "teststudent1@schoolhouse.world",
      sessionLink: "loom.com/a",
    },
    {
      uid: 3,
      unitTopic: "Algebra",
      email: "teststudent3@schoolhouse.world",
      sessionLink: "loom.com/c",
    },
    {
      uid: 6,
      unitTopic: "Algebra",
      email: "teststudent6@schoolhouse.world",
      sessionLink: "loom.com/f",
    },
  ],
  Geometry: [
    {
      uid: 2,
      unitTopic: "Geometry",
      email: "teststudent2@schoolhouse.world",
      sessionLink: "loom.com/b",
    },
    {
      uid: 7,
      unitTopic: "Geometry",
      email: "teststudent7@schoolhouse.world",
      sessionLink: "loom.com/g",
    },
  ],
  Calculus: [
    {
      uid: 4,
      unitTopic: "Calculus",
      email: "teststudent4@schoolhouse.world",
      sessionLink: "loom.com/d",
    },
    {
      uid: 5,
      unitTopic: "Calculus",
      email: "teststudent5@schoolhouse.world",
      sessionLink: "loom.com/e",
    },
  ],
  Statistics: [
    {
      uid: 8,
      unitTopic: "Statistics",
      email: "teststudent8@schoolhouse.world",
      sessionLink: "loom.com/h",
    },
  ],
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, unitTopic, sessionLink } = req.body;

    const reqUID = submissions.length + 1;

    const reqSubmission = {
      uid: reqUID,
      email: email,
      unitTopic: unitTopic,
      sessionLink: sessionLink,
    };

    submissions.push(reqSubmission)
    const reqUnitTopic = unitTopic;
   

    // add new subject property to sortedSubmissions if subject does not exist
    if (!sortedSubmissions[reqUnitTopic]) {
      sortedSubmissions[reqUnitTopic] = [];
      sortedSubmissions[reqUID] = reqUID;
    }

    sortedSubmissions[reqUnitTopic].push(reqSubmission);

    let temp = getStichedSubmissions();

    res.status(200).json({ submissions: temp });
  } else if (req.method === "GET") {
    let temp = getStichedSubmissions();

    res.status(200).json({ submissions: temp });
  } else {
    // TODO: add request handling
  }
}

/**
 * @param {Array} arr An array containing the items.
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Returns a shuffled version of Subject objects
 *
 * @remarks
 * This method utilizes the shuffle method from above
 *
 * @param sortedSubs - The input Subject to be shuffled
 * @returns - A shuffled version of Subject objects
 *
 */
function shuffleSubjects(arr) {
  for (const subject in arr) {
    arr[subject] = shuffle(arr[subject]);
  }

  return arr;
}

/**
 * Returns a single dimensional array of the shuffled submissions
 *
 * @remarks
 * This method "flattens" the sortedSubmissions object into a 1 dimensional submissions array
 *
 * @param sortedSubs: - The input object of Subjects to be sorted
 * @returns  - A single dimensional array of shuffled submissions
 *
 */
function getStichedSubmissions(sortedSubs: Subject) {
  shuffleSubjects(sortedSubmissions);

  let temp = [];

  const fillerSubmission = {
    uid: "",
    unitTopic: "",
    email: "",
    sessionLink: "",
  };

  // stich the ordered arrays back together
  for (let subject in sortedSubmissions) {
    let subjectCount = sortedSubmissions[subject].length;
    for (let i = 0; i < subjectCount; i++) {
      temp.push(sortedSubmissions[subject][i]);
    }
  }

  temp.push(fillerSubmission);

  return temp;
}
