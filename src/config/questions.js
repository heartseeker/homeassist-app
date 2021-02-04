export const NEXT = {
  end: 'END',
  proceed: 'PROCEED',
  completed: 'COMPLETED',
};

export const QUESTIONS = [
  {
    questionId: 'q1',
    question: 'How many valid IDs do you have?',
    inputType: 'radio',
    points: 10,
    options: [
      {
        answerId: 'a1',
        nextQuestionId: null,
        next: NEXT.end,
        points: 0,
        answer: 'None',
        message: "Apologies, but you have to secure at least 1 valid ID to secure a home loan. Please get back to us once you've done it.",
        sortOrder: 1,
      },
      {
        answerId: 'a2',
        nextQuestionId: 'q2',
        next: NEXT.proceed,
        points: 6,
        answer: '1',
        message: 'Nice! However, your choice of bank might be limited as some require 2 valid IDs',
        sortOrder: 2,
      },
      {
        answerId: 'a3',
        nextQuestionId: 'q2',
        next: NEXT.proceed,
        points: 15,
        answer: '2 or more',
        message: null,
        sortOrder: 3,
      },
    ],
  },
  {
    questionId: 'q2',
    question: 'What is your civil status?',
    inputType: 'radio',
    points: 15,
    options: [
      {
        answerId: 'a4',
        nextQuestionId: 'q2q1',
        next: NEXT.proceed,
        points: 0,
        answer: 'Married',
        message: null,
        sortOrder: 1,
      },
      {
        answerId: 'a5',
        nextQuestionId: 'q2q2',
        next: NEXT.proceed,
        points: 0,
        answer: 'Divorced or Separated',
        message: null,
        sortOrder: 2,
      },
      {
        answerId: 'a6',
        nextQuestionId: 'q3',
        next: NEXT.proceed,
        points: 14,
        answer: 'Single',
        message: null,
        sortOrder: 3,
      },
    ],
  },
  {
    questionId: 'q2q1',
    question: 'Can you provide a marriage certificate?',
    inputType: 'radio',
    points: 15,
    options: [
      {
        answerId: 'a7',
        nextQuestionId: 'q3',
        next: NEXT.proceed,
        points: 14,
        answer: 'Yes',
        message: null,
        sortOrder: 1,
      },
      {
        answerId: 'a8',
        nextQuestionId: 'q3',
        next: NEXT.proceed,
        points: 11,
        answer: 'No',
        message: 'You may still qualify but your married status may not reflect',
        sortOrder: 2,
      },
    ],
  },
  {
    questionId: 'q2q2',
    question: 'Can you provide divorce papers or legal separation document?',
    inputType: 'radio',
    points: 15,
    options: [
      {
        answerId: 'a9',
        nextQuestionId: 'q3',
        next: NEXT.proceed,
        points: 14,
        answer: 'Yes',
        message: "It may reflect that you're still married even if you have physically separated",
        sortOrder: 1,
      },
      {
        answerId: 'a10',
        nextQuestionId: 'q3',
        next: NEXT.proceed,
        points: 11,
        answer: 'No',
        message: 'You may still qualify but your married status may not reflect',
        sortOrder: 2,
      },
    ],
  },
  {
    questionId: 'q3',
    question: 'What best describes your citizenship?',
    inputType: 'radio',
    points: 15,
    options: [
      {
        answerId: 'a11',
        nextQuestionId: 'q3q1',
        next: NEXT.proceed,
        points: 0,
        answer: 'Non-Filipino',
        message: 'Got it. You can still purchase a property here in the Philippines provided that it is a condominium property and condominium corporation ownership is 60% Filipino-owned. Please contact us for more',
        sortOrder: 1,
      },
      {
        answerId: 'a12',
        nextQuestionId: 'q4',
        next: NEXT.proceed,
        points: 0,
        answer: 'Dual Citizen',
        message: 'Please prepare a signed Oath of Allegiance to the Republic of the Philippines. Contact us for more info about this.',
        sortOrder: 2,
      },
      {
        answerId: 'a13',
        nextQuestionId: 'q4',
        next: NEXT.proceed,
        points: 14,
        answer: 'Filipino',
        message: null,
        sortOrder: 3,
      },
    ],
  },
  {
    questionId: 'q3q1',
    question: 'Can you provide a passport or ACR (alien certificate of registration?)',
    inputType: 'radio',
    points: 15,
    options: [
      {
        answerId: 'a14',
        nextQuestionId: 'q4',
        next: NEXT.proceed,
        points: 14,
        answer: 'Yes',
        message: null,
        sortOrder: 1,
      },
      {
        answerId: 'a15',
        nextQuestionId: null,
        next: NEXT.end,
        points: 0,
        answer: 'No',
        message: "Sorry, but you can't proceed with this evaluation if you can't present any of the 2. Contact us for more info.",
        sortOrder: 2,
      },
    ],
  },
  {
    questionId: 'q4',
    question: 'What best describes your type of livelihood?',
    inputType: 'radio',
    points: 15,
    options: [
      {
        answerId: 'a16',
        nextQuestionId: 'q4q1',
        next: NEXT.proceed,
        points: 0,
        answer: 'OFW',
        message: null,
        sortOrder: 1,
      },
      {
        answerId: 'a17',
        nextQuestionId: 'q4q2',
        next: NEXT.proceed,
        points: 0,
        answer: 'Self-employed',
        message: null,
        sortOrder: 2,
      },
      {
        answerId: 'a18',
        nextQuestionId: 'q4q3',
        next: NEXT.proceed,
        points: 0,
        answer: 'Locally employed',
        message: null,
        sortOrder: 3,
      },
    ],
  },
  {
    questionId: 'q4q1',
    question: 'Which of these documents can you provide?',
    inputType: 'checkbox',
    points: 15,
    // OFW
    options: [
      {
        answerId: 'a19',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 3,
        answer: 'Latest Certificate of Employment and Compensation',
        message: null,
        sortOrder: 1,
      },
      {
        answerId: 'a20',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 3,
        answer: 'Latest Crew Contract',
        message: null,
        sortOrder: 2,
      },
      {
        answerId: 'a21',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 3,
        answer: 'Allotment Slip',
        message: null,
        sortOrder: 3,
      },
      {
        answerId: 'a22',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 3,
        answer: 'Latest Payslip or Bank Statement/Remittance',
        message: null,
        sortOrder: 4,
      },
      {
        answerId: 'a23',
        nextQuestionId: null,
        next: NEXT.end,
        points: 0,
        answer: 'None of the above',
        message: "You can't proceed with this evaluation. Please contact us for more info.",
        sortOrder: 5,
      },
    ],
  },
  {
    questionId: 'q4q2',
    question: 'Which of these documents can you provide?',
    inputType: 'checkbox',
    points: 15,
    // Self-employed
    options: [
      {
        answerId: 'a24',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 1.5,
        answer: 'Audited Financial Statements',
        message: null,
        sortOrder: 1,
      },
      {
        answerId: 'a25',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 1.5,
        answer: 'Bank Statements',
        message: null,
        sortOrder: 2,
      },
      {
        answerId: 'a26',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 1.5,
        answer: 'Lease/Rental Contracts',
        message: null,
        sortOrder: 3,
      },
      {
        answerId: 'a27',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 1.5,
        answer: 'Certificate of Business Registration w/ DTI or SEC',
        message: null,
        sortOrder: 4,
      },
      {
        answerId: 'a28',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 1.5,
        answer: 'Business Background or Company Profile',
        message: null,
        sortOrder: 5,
      },
      {
        answerId: 'a29',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 1.5,
        answer: 'Professional Information Sheet',
        message: null,
        sortOrder: 6,
      },
      {
        answerId: 'a30',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 1.5,
        answer: 'List of Customers and Suppliers/Trade References',
        message: null,
        sortOrder: 7,
      },
      {
        answerId: 'a31',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 1.5,
        answer: 'Board or Partnership Resolution/Sec Certificate',
        message: null,
        sortOrder: 8,
      },
      {
        answerId: 'a32',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 1.5,
        answer: 'Articles of Incorporations and By-Laws',
        message: null,
        sortOrder: 9,
      },
      {
        answerId: 'a33',
        nextQuestionId: null,
        next: NEXT.end,
        points: 1.5,
        answer: 'None of the above',
        message: "You can't proceed with this evaluation. Please contact us for more info.",
        sortOrder: 10,
      },
    ],
  },
  {
    questionId: 'q4q3',
    question: 'Which of these documents can you provide?',
    inputType: 'checkbox',
    points: 15,
    // Locally employed
    options: [
      {
        answerId: 'a34',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 3,
        answer: 'Latest Certificate of Employment and Compensation',
        message: null,
        sortOrder: 1,
      },
      {
        answerId: 'a35',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 3,
        answer: 'Latest Income Tax Return',
        message: null,
        sortOrder: 2,
      },
      {
        answerId: 'a36',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 3,
        answer: 'Latest Payslip',
        message: null,
        sortOrder: 3,
      },
      {
        answerId: 'a37',
        nextQuestionId: 'q5',
        next: NEXT.proceed,
        points: 3,
        answer: 'Latest Bank Statement',
        message: null,
        sortOrder: 3,
      },
      {
        answerId: 'a38',
        nextQuestionId: null,
        next: NEXT.end,
        points: 0,
        answer: 'None of the above',
        message: "You can't proceed with this evaluation. Please contact us for more info.",
        sortOrder: 4,
      },
    ],
  },
  {
    questionId: 'q5',
    question: 'As an individual, what range does your monthly income (with proof of income) belong?',
    inputType: 'radio',
    points: 15,
    options: [
      {
        answerId: 'a39',
        nextQuestionId: 'q5q1',
        next: NEXT.proceed,
        points: 3,
        answer: 'Php39,999.99 and below',
        message: 'Do you have a spouse, sibling, parent or son/daughter that has a regular monthly income?',
        sortOrder: 1,
      },
      {
        answerId: 'a40',
        nextQuestionId: 'q6',
        next: NEXT.proceed,
        points: 8,
        answer: 'Php40,000 - 49,999.99',
        message: null,
        sortOrder: 2,
      },
      {
        answerId: 'a41',
        nextQuestionId: 'q6',
        next: NEXT.proceed,
        points: 12,
        answer: 'Php50,000 - 59,999.99',
        message: null,
        sortOrder: 3,
      },
      {
        answerId: 'a42',
        nextQuestionId: 'q6',
        next: NEXT.proceed,
        points: 13,
        answer: 'Php60,000 - 69,999.99',
        message: null,
        sortOrder: 4,
      },
      {
        answerId: 'a43',
        nextQuestionId: 'q6',
        next: NEXT.proceed,
        points: 14,
        answer: 'Php70,000 and above',
        message: null,
        sortOrder: 5,
      },
    ],
  },
  {
    questionId: 'q5q1',
    question: 'Do you have a spouse, sibling, parent or son/daughter that has a regular monthly income?',
    inputType: 'radio',
    points: 15,
    options: [
      {
        answerId: 'a44',
        nextQuestionId: null,
        next: NEXT.end,
        points: 0,
        answer: 'No',
        message: 'It may be difficult to have a home loan without a qualified co-borrower. Please contact us for help on this.',
        sortOrder: 1,
      },
      {
        answerId: 'a45',
        nextQuestionId: 'q5q1q1',
        next: NEXT.proceed,
        points: 0,
        answer: 'Yes',
        message: null,
        sortOrder: 2,
      },
    ],
  },
  {
    questionId: 'q5q1q1',
    question: "What's his/her monthly income (with proof of income) range?",
    inputType: 'radio',
    points: 15,
    options: [
      {
        answerId: 'a46',
        nextQuestionId: 'q6',
        next: NEXT.proceed,
        points: 0,
        answer: 'Php39,999.99 and below',
        message: "Combining your co-borrower's monthly basic income, you have exceeded the minimum monthly income requirement of most banks. Possible for you to get a home loan but could be limited to the socialized housing and affordable price range.",
        sortOrder: 1,
      },
      {
        answerId: 'a47',
        nextQuestionId: 'q6',
        next: NEXT.proceed,
        points: 0,
        answer: 'Php40,000 - 49,999.99',
        message: null,
        sortOrder: 2,
      },
      {
        answerId: 'a48',
        nextQuestionId: 'q6',
        next: NEXT.proceed,
        points: 0,
        answer: 'Php50,000 - 59,999.99',
        message: null,
        sortOrder: 3,
      },
      {
        answerId: 'a49',
        nextQuestionId: 'q6',
        next: NEXT.proceed,
        points: 0,
        answer: 'Php60,000 - 69,999.99',
        message: null,
        sortOrder: 4,
      },
      {
        answerId: 'a50',
        nextQuestionId: 'q6',
        next: NEXT.proceed,
        points: 0,
        answer: 'Php70,000 and above',
        message: null,
        sortOrder: 5,
      },
    ],
  },
  {
    questionId: 'q6',
    question: 'How long have you stayed with your last company or been with your current company?',
    inputType: 'radio',
    points: 15,
    options: [
      {
        answerId: 'a51',
        nextQuestionId: 'q7',
        next: NEXT.proceed,
        points: 7,
        answer: 'Less than a year',
        message: null,
        sortOrder: 1,
      },
      {
        answerId: 'a52',
        nextQuestionId: 'q7',
        next: NEXT.proceed,
        points: 12,
        answer: '2-3 years',
        message: null,
        sortOrder: 2,
      },
      {
        answerId: 'a53',
        nextQuestionId: 'q7',
        next: NEXT.proceed,
        points: 14,
        answer: '3 years and above',
        message: null,
        sortOrder: 3,
      },
    ],
  },
  {
    questionId: 'q7',
    question: 'Do you have unpaid loans or any kind or unpaid credit card balance in the past?',
    inputType: 'radio',
    points: 15,
    options: [
      {
        answerId: 'a54',
        nextQuestionId: null,
        next: NEXT.completed,
        points: 5,
        answer: 'Yes',
        message: null,
        sortOrder: 3,
      },
      {
        answerId: 'a55',
        nextQuestionId: null,
        next: NEXT.completed,
        points: 14,
        answer: 'No',
        message: null,
        sortOrder: 3,
      },
      {
        answerId: 'a56',
        nextQuestionId: null,
        next: NEXT.completed,
        points: 10,
        answer: 'Unsure',
        message: null,
        sortOrder: 3,
      },
    ],
  },
];

export const noneOfTheAbove = ['a23', 'a33', 'a38'];
