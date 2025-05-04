import { Order } from '../types/orders';

export const orders: Order[] = [
  {
    id: '#390561',
    customer: {
      id: '1',
      name: 'Michelle Black',
      avatar: '/avatars/michelle-black.jpg',
    },
    status: 'Paid',
    total: 7800.00,
    date: 'Jan 8',
    items: [
      {
        id: '1',
        name: 'Ryobi ONE drill/driver',
        price: 409.00,
        imageUrl: '/products/drill.jpg',
      },
      {
        id: '2',
        name: 'Socket Systems Electric',
        price: 228.00,
        imageUrl: '/products/socket.jpg',
      },
      {
        id: '3',
        name: 'DVB-T2 receiver blk',
        price: 139.00,
        imageUrl: '/products/receiver.jpg',
      },
      {
        id: '4',
        name: 'Inferno oil-free compressor',
        price: 135.00,
        imageUrl: '/products/compressor.jpg',
      },
      {
        id: '5',
        name: 'TIG-200 welding inverter',
        price: 699.00,
        imageUrl: '/products/welder.jpg',
      }
    ]
  },
  {
    id: '#663334',
    customer: {
      id: '2',
      name: 'Janice Chandler',
      avatar: '/avatars/janice-chandler.jpg',
    },
    status: 'Delivered',
    total: 1250.00,
    date: 'Jan 6',
    items: []
  },
  {
    id: '#418135',
    customer: {
      id: '3',
      name: 'Mildred Hall',
      avatar: '/avatars/mildred-hall.jpg',
    },
    status: 'Paid',
    total: 540.95,
    date: 'Jan 5',
    items: []
  },
  {
    id: '#801999',
    customer: {
      id: '4',
      name: 'Ana Carter',
      avatar: '/avatars/ana-carter.jpg',
    },
    status: 'Paid',
    total: 1489.00,
    date: 'Jan 2',
    items: []
  },
  {
    id: '#517783',
    customer: {
      id: '5',
      name: 'John Sherman',
      avatar: '/avatars/john-sherman.jpg',
    },
    status: 'Completed',
    total: 925.00,
    date: 'Dec 28',
    items: []
  },
  {
    id: '#602992',
    customer: {
      id: '6',
      name: 'James Miller',
      avatar: '/avatars/james-miller.jpg',
    },
    status: 'Paid',
    total: 1620.00,
    date: 'Dec 26',
    items: []
  },
  {
    id: '#730345',
    customer: {
      id: '7',
      name: 'Travis French',
      avatar: '/avatars/travis-french.jpg',
    },
    status: 'Paid',
    total: 315.50,
    date: 'Dec 22',
    items: []
  },
  {
    id: '#126955',
    customer: {
      id: '8',
      name: 'Ralph Hall',
      avatar: '/avatars/ralph-hall.jpg',
    },
    status: 'Paid',
    total: 1267.45,
    date: 'Dec 20',
    items: []
  },
  {
    id: '#045321',
    customer: {
      id: '9',
      name: 'Gary Gilbert',
      avatar: '/avatars/gary-gilbert.jpg',
    },
    status: 'Completed',
    total: 287.00,
    date: 'Dec 18',
    items: []
  },
  {
    id: '#062848',
    customer: {
      id: '10',
      name: 'Frances Howell',
      avatar: '/avatars/frances-howell.jpg',
    },
    status: 'Delivered',
    total: 1740.00,
    date: 'Dec 17',
    items: []
  },
  {
    id: '#646072',
    customer: {
      id: '11',
      name: 'Herbert Boyd',
      avatar: '/avatars/herbert-boyd.jpg',
    },
    status: 'Paid',
    total: 714.00,
    date: 'Dec 14',
    items: []
  },
  {
    id: '#432019',
    customer: {
      id: '12',
      name: 'Alan White',
      avatar: '/avatars/alan-white.jpg',
    },
    status: 'Paid',
    total: 267.65,
    date: 'Dec 13',
    items: []
  },
  {
    id: '#985927',
    customer: {
      id: '13',
      name: 'Julie Martin',
      avatar: '/avatars/julie-martin.jpg',
    },
    status: 'Delivered',
    total: 389.00,
    date: 'Dec 11',
    items: []
  }
];