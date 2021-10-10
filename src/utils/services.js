export const SERVICES = [
  {
    id: 'u1',
    name: '500',
    description: 'Zamjena ulja i filtera (500 kn)',
    price: 500,
  },
  {
    id: 'u2',
    name: '450',
    description: 'Promjena pakni (450 kn)',
    price: 450,
  },
  {
    id: 'u3',
    name: '100',
    description: 'Promjena guma (100 kn)',
    price: 100,
  },
  {
    id: 'u4',
    name: '299',
    description: 'Servis klima uređaja (299 kn)',
    price: 299,
  },
  {
    id: 'u5',
    name: '50',
    description: 'Balansiranje guma (50 kn)',
    price: 50,
  },
  {
    id: 'u6',
    name: '229',
    description: 'Zamjena ulja u kočnicama (229 kn)',
    price: 229,
  },
];

export const checkServices = (data) => {
  let newData = [];

  for (const key in data) {
    if (data[key] === true) {
      if (key === '50') {
        newData = [...newData, SERVICES[4]];
      } else if (key === '100') {
        newData = [...newData, SERVICES[2]];
      } else if (key === '229') {
        newData = [...newData, SERVICES[5]];
      } else if (key === '299') {
        newData = [...newData, SERVICES[3]];
      } else if (key === '450') {
        newData = [...newData, SERVICES[1]];
      } else if (key === '500') {
        newData = [...newData, SERVICES[0]];
      }
    }
  }
  return newData;
};