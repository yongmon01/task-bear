export interface Location {
  id: number;
  name: string;
  robot: {
    id: string;
    is_online: boolean;
  };
}

export const locations: Location[] = [
  // Please add more locations to show features

  {
    id: 0,
    name: "Spicy restaurant",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 1,
    name: "Salty restaurant",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 2,
    name: "good restaurant",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 3,
    name: "mood restaurant",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 4,
    name: "nice restaurant",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 5,
    name: "juice restaurant",
    robot: {
      id: "abcde123",
      is_online: false,
    },
  },
  {
    id: 6,
    name: "panda restaurant",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 7,
    name: "kiki restaurant",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 8,
    name: "tiger restaurant",
    robot: {
      id: "abcde123",
      is_online: false,
    },
  },
  {
    id: 9,
    name: "hoho restaurant",
    robot: {
      id: "abcde123",
      is_online: false,
    },
  },
  {
    id: 10,
    name: "oneone restaurant",
    robot: {
      id: "abcde123",
      is_online: false,
    },
  },
  {
    id: 11,
    name: "oneone restaurant",
    robot: {
      id: "abcde123",
      is_online: false,
    },
  },
  {
    id: 12,
    name: "check restaurant",
    robot: {
      id: "abcde123",
      is_online: false,
    },
  },
  {
    id: 13,
    name: "doit restaurant",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
];
