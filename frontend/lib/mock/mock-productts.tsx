export interface iProduct {
  id: number;
  type: string;
  name: string;
  isNew: boolean;
  src: string;
  cost: number;
  varinats: [string];
  sale: number;
  choosen: boolean;
}

// {
//   "products": [
//     {
//       "id": 0,
//       "type": "kitchen",
//       "name": "Венчик",
//       "isNew": false,
//       "src": "https://i.ibb.co/7bSDGRD/30832486-9d4e-48ad-b6bc-aff73b76ac9f.webp",
//       "cost": 100,
//       "variants": [],
//       "sale": 1,
//       "chosen": false
//     },
//     {
//       "id": 1,
//       "type": "kitchen",
//       "name": "Точилка для ножей",
//       "isNew": false,
//       "src": "https://i.ibb.co/mGXVC7X/4982750d-0d8e-4810-abec-f931614e84a9.webp",
//       "cost": 1329,
//       "variants": [],
//       "sale": 10,
//       "chosen": false
//     },
//     {
//       "id": 2,
//       "type": "kitchen",
//       "name": "Набор сковород",
//       "isNew": true,
//       "src": "https://i.ibb.co/hdKc2bz/3676a7c9-7a44-4ffa-a1f7-edf1af4da334.webp",
//       "cost": 3400,
//       "variants": [],
//       "sale": 5,
//       "chosen": false
//     },
//     {
//       "id": 4,
//       "type": "bath",
//       "name": "Набор полотенец",
//       "isNew": true,
//       "src": "https://i.ibb.co/wdyByhB/e9a03b3e-668f-4f4a-a7fb-3dcfbf464a91.webp",
//       "cost": 490,
//       "variants": [],
//       "sale": 0,
//       "chosen": false
//     },
//     {
//       "id": 5,
//       "type": "bedroom",
//       "name": "Подушки",
//       "isNew": true,
//       "src": "https://i.ibb.co/JBWQ6WV/7548a971-6ac1-4913-8f18-f917ad7214e8.webp",
//       "cost": 7000,
//       "variants": [],
//       "sale": 20,
//       "chosen": false
//     }
//   ]
// }
