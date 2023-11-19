
let SHOPPING_LISTS = [
    {
        id: "test",
        name: "List 1",
        isArchived: false,
        createdAt: new Date(),
        owner: "test",
        members: [
            "test",
            "2"
        ],
        items: [
            {
                id: "test",
                name: "Item 1",
                isCompleted: false
            },
            {
                id: "2",
                name: "Item 2",
                isCompleted: false
            }
        ]
    },
    {
        id: "2",
        name: "List 2",
        isArchived: false,
        createdAt: new Date()-10000,
        owner: "2",
        members: [
            "test",
            "2"
        ],
        items: [
            {
                id: "1",
                name: "Item 1",
                isCompleted: false
            },
            {
                id: "2",
                name: "Item 2",
                isCompleted: false
            }
        ]
    }
]

module.exports = SHOPPING_LISTS