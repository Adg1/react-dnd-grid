import { FieldType } from "../definitions";

export const ItemTypes = {
  CARD: "card",
};
// Fake data representing a grid of items
export const fields: Array<FieldType> = [
  {
    id: "1",
    name: "Item 1",
    description: "Item 1 description",
    width: 6,
    height: 1,
  },
  {
    id: "2",
    name: "Item 2",
    description: "Item 2 description",
    width: 6,
    height: 1,
  },
  {
    id: "3",
    name: "Item 3",
    description: "Item 3 description",
    width: 12,
    items: [
      {
        id: "10",
        name: "Item 10",
        description: "Item 10 description",
        width: 2,
        height: 1,
      },
      {
        id: "11",
        name: "Item 11",
        description: "Item 11 description",
        width: 3,
        height: 2,
      },
      {
        id: "12",
        name: "Item 12",
        description: "Item 12 description",
        width: 10,
        items: [
          {
            id: "13",
            name: "Item 13",
            description: "Item 13 description",
            width: 2,
            height: 1,
          },
          {
            id: "14",
            name: "Item 14",
            description: "Item 14 description",
            width: 3,
            height: 2,
          },
          {
            id: "15",
            name: "Item 15",
            description: "Item 15 description",
            width: 10,
            items: [
              {
                id: "16",
                name: "Item 16",
                description: "Item 16 description",
                width: 2,
                height: 1,
              },
              {
                id: "17",
                name: "Item 17",
                description: "Item 17 description",
                width: 3,
                height: 2,
              },
              {
                id: "18",
                name: "Item 18",
                description: "Item 18 description",
                width: 10,
                items: [
                  {
                    id: "19",
                    name: "Item 19",
                    description: "Item 19 description",
                    width: 2,
                    height: 1,
                  },
                  {
                    id: "20",
                    name: "Item 20",
                    description: "Item 20 description",
                    width: 3,
                    height: 2,
                  },
                  {
                    id: "21",
                    name: "Item 21",
                    description: "Item 21 description",
                    width: 10,
                    items: [
                      {
                        id: "22",
                        name: "Item 22",
                        description: "Item 22 description",
                        width: 2,
                        height: 1,
                      },
                      {
                        id: "23",
                        name: "Item 23",
                        description: "Item 23 description",
                        width: 3,
                        height: 2,
                      },
                      {
                        id: "24",
                        name: "Item 24",
                        description: "Item 24 description",
                        width: 10,
                        items: [
                          {
                            id: "25",
                            name: "Item 25",
                            description: "Item 25 description",
                            width: 2,
                            height: 1,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Item 4",
    description: "Item 4 description",
    width: 2,
    height: 1,
  },
  {
    id: "5",
    name: "Item 5",
    description: "Item 5 description",
    width: 4,
    height: 1,
  },
  {
    id: "6",
    name: "Item 6",
    description: "Item 6 description",
    width: 9,
    height: 1,
  },
  {
    id: "7",
    name: "Item 7",
    description: "Item 7 description",
    width: 5,
    height: 1,
  },
  {
    id: "8",
    name: "Item 8",
    description: "Item 8 description",
    width: 9,
    height: 4,
  },
  {
    id: "9",
    name: "Item 9",
    description: "Item 9 description",
    width: 3,
    height: 1,
  },
];
