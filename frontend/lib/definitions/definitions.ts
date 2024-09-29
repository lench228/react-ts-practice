export type Address = {
    geolocation: {
        lat: string;
        long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
};

export type User = {
    id: number;
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    phone: string;
    address: Address;
    __v: number;
};

// {
// "products" : [
//     {
//         "id": 0,
//         "type": "kitchen",
//         "name": "Венчик",
//         "isNew": false,
//         "src": "https://ibb.co/25Frjsr",
//         "cost": 100,
//         "varinats":
//             [

//             ],
//         "sale": 1,
//         "choosen": false
//     },
//     {
//         "id": 1,
//         "type": "kitchen",
//         "name": "Точилка для ножей",
//         "isNew": false,
//         "src": "https://ibb.co/37M9yHM",
//         "cost": 1329,
//         "varinats":
//             [

//             ],
//         "sale": 10,
//         "choosen": false
//     },
//     {
//         "id": 2,
//         "type": "kitchen",
//         "name": "Набор сковород",
//         "isNew": true,
//         "src": "https://ibb.co/09fKYTb",
//         "cost": 3400,
//         "varinats":
//             [

//             ],
//         "sale": 5,
//         "choosen": false
//     },
//     {
//         "id": 4,
//         "type": "bath",
//         "name": "Набор полотенец",
//         "isNew": true,
//         "src": "https://ibb.co/grymyZm",
//         "cost": 490,
//         "varinats":
//             [

//             ],
//         "sale": 0,
//         "choosen": false
//     },
//     {
//         "id": 5,
//         "type": "bedroom",
//         "name": "Подушки",
//         "isNew": true,
//         "src": "https://ibb.co/j69R09m",
//         "cost": 7000,
//         "varinats":
//             [

//             ],
//         "sale": 20,
//         "choosen": false
//     },
// ]
// }
