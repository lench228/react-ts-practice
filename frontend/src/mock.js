const PRODUCTS = [
	{
		id: '1',
		img: '/frontend/public/img/kitchen-navigation.png',
		category: 'kitchen',
		name: 'Kitchen Set 1',
		tag: 'new',
		price: 200,
		items: [
			{ name: 'Knife', itemImg: '/frontend/public/img/spoons-img.png' },
			{ name: 'Fork', itemImg: '/frontend/public/img/spoons-img.png' }
		]
	},
	{
		id: '2',
		img: '/frontend/public/img/bedroom-navigation.png',
		category: 'bedroom',
		name: 'Bedroom Set 1',
		tag: '',
		price: 150,
		items: [
			{ name: 'Pillow', itemImg: '/frontend/public/img/spoons-img.png' },
			{ name: 'Chair', itemImg: '/frontend/public/img/spoons-img.png' }
		]
	},
	{
		id: '3',
		img: '/frontend/public/img/bathroom-navigation.png',
		category: 'bathroom',
		name: 'Bathroom Set 1',
		tag: 'sale',
		price: 150,
		items: [
			{ name: 'Soap', itemImg: '/frontend/public/img/spoons-img.png' },
			{ name: 'Shampoo', itemImg: '/frontend/public/img/spoons-img.png' }
		]
	},
	{
		id: '4',
		img: '/frontend/public/img/kitchen-navigation.png',
		category: 'kitchen',
		name: 'Kitchen Set 2',
		tag: 'new',
		price: 300,
		items: [
			{ name: 'Sofa', itemImg: '/frontend/public/img/spoons-img.png' },
			{ name: 'Table', itemImg: '/frontend/public/img/spoons-img.png' }
		]
	},
	{
		id: '5',
		img: '/frontend/public/img/kitchen-navigation.png',
		category: 'kitchen',
		name: 'Kitchen Set 3',
		tag: '',
		price: 250,
		items: [
			{ name: 'Dining Table', itemImg: '/frontend/public/img/spoons-img.png' },
			{ name: 'Chairs', itemImg: '/frontend/public/img/spoons-img.png' }
		]
	},
	{
		id: '6',
		img: '/frontend/public/img/bedroom-navigation.png',
		category: 'bedroom',
		name: 'Bedroom Set 2',
		tag: 'new',
		price: 350,
		items: [
			{ name: 'Desk', itemImg: '/frontend/public/img/spoons-img.png' },
			{ name: 'Office Chair', itemImg: '/frontend/public/img/spoons-img.png' }
		]
	},
	{
		id: '7',
		img: '/frontend/public/img/bedroom-navigation.png',
		category: 'bedroom',
		name: 'Bedroom Set 3',
		tag: 'sale',
		price: 180,
		items: [
			{ name: 'Toy Box', itemImg: '/frontend/public/img/spoons-img.png' },
			{ name: 'Kids Bed', itemImg: '/frontend/public/img/spoons-img.png' }
		]
	},
	{
		id: '8',
		img: '/frontend/public/img/bathroom-navigation.png',
		category: 'bathroom',
		name: 'Bathroom Set 2',
		tag: '',
		price: 220,
		items: [
			{ name: 'Garden Table', itemImg: '/frontend/public/img/spoons-img.png' },
			{ name: 'Garden Chairs', itemImg: '/frontend/public/img/spoons-img.png' }
		]
	},
	{
		id: '9',
		img: '/frontend/public/img/bathroom-navigation.png',
		category: 'bathroom',
		name: 'Bathroom Set 3',
		tag: 'new',
		price: 400,
		items: [
			{ name: 'Toolbox', itemImg: '/frontend/public/img/spoons-img.png' },
			{ name: 'Workbench', itemImg: '/frontend/public/img/spoons-img.png' }
		]
	},
	{
		id: '9',
		img: '/frontend/public/img/bathroom-navigation.png',
		category: 'bathroom',
		name: 'Bathroom Set 4',
		tag: 'sale',
		price: 1000,
		items: [
			{ name: 'Toolbox', itemImg: '/frontend/public/img/spoons-img.png' },
			{ name: 'Workbench', itemImg: '/frontend/public/img/spoons-img.png' }
		]
	}
];


const USERS = [
	{
		id: '1',
		name: 'Alice Smith',
		email: 'alice.smith@example.com',
		password: 'MKDOsiq3q2',
		phone: '+123456789',
		birthdate: '1985-05-15',
		city: 'Wonderland',
		street: 'Rabbit Hole',
		house: '42',
		apartment: '7',
		bag: [],
		favorites: []
	}
];

export {USERS, PRODUCTS};