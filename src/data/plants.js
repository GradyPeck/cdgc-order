/*
    "Class" specifications:
    ITEMS have:
        name : String - name of the item that will be displayed
        subname : String - note appended to item name and italicized
        unit : String - the unit in which the item is sold, eg "Pot", "Basket"
        cost : Number - the price per unit, as an integer of CENTS (there's a good reason for this)
    CATEGORIES have:
        ???? : String - a single key that is the name of the category (which will be displayed), storing an array of items
        indent : Boolean - whether the item listings within this category should be indented
*/

export const plantData = [
    {
        "Large Geranium Deck Pots" : [
            {"name": "All Red", "unit": "Pots", "cost": 2400},
            {"name": "Hot Mix", "subname": " - Bright Orange and Violet", "unit": "Pots", "cost": 2400},
            {"name": "All Orange", "unit": "Pots", "cost": 2400},
            {"name": "All White", "unit": "Pots", "cost": 2400},
            {"name": "Miami Mix", "subname": " - Flamingo Rose & Violet", "unit": "Pots", "cost": 2400},
            {"name": "All Violet", "unit": "Pots", "cost": 2400}
        ],
        "indent" : true
    },
    {"name": "Deck Pot for Shade", "subname": " - Make Selection at Pickup",  "unit": "Pots", "cost": 2400},
    {
        "Hanging Baskets" : [
            {"name": "Boston Fern", "unit": "Baskets", "cost": 1800},
            {"name": "Streptocarpus", "unit": "Baskets", "cost": 1800},
            {"name": "Sunpatiens Hanging Baskets", "subname": " - Magenta", "unit": "Baskets", "cost": 1500}
        ],
        "indent" : false
    },
    {
        "Calliope Geranium Hanging Baskets" : [
            {"name": "Red", "unit": "Baskets", "cost": 1500},
            {"name": "Lavender Rose", "unit": "Baskets", "cost": 1500},
            {"name": "Crimson Flame", "subname": " - Bi-color Red/Hot Pink", "unit": "Baskets", "cost": 1500}
        ],
        "indent" : true
    },
    {"name": "Baby Tut Grass", "unit": "Plants", "cost": 700},
    {"name": "Purple Fountain Grass", "unit": "Plants", "cost": 700},
    {"name": "Caladium", "subname": " - White with Green Vein", "unit": "Plants", "cost": 600},
    {
        "Sunpatiens" : [
            {"name": "Deep Rose", "unit": "Plants", "cost": 450},
            {"name": "Orange", "unit": "Plants", "cost": 450},
            {"name": "Magenta", "unit": "Plants", "cost": 450},
            {"name": "White", "unit": "Plants", "cost": 450}
        ],
        "indent" : true
    },
    {
        "Geraniums" : [
            {"name": "Red", "unit": "Plants", "cost": 375},
            {"name": "White", "unit": "Plants", "cost": 375},
            {"name": "Neon Rose", "subname": " - Pink", "unit": "Plants", "cost": 375},
            {"name": "Strawberry Sizzle", "subname": " - Dark Pink", "unit": "Plants", "cost": 375},
            {"name": "Cranberry Sizzle", "subname": " - Hot Magenta", "unit": "Plants", "cost": 375}
        ],
        "indent" : true
    },
    {
        "Sweet Potato Vines" : [
            {"name": "Margarita", "unit": "Plants", "cost": 400},
            {"name": "Tri-Color", "unit": "Plants", "cost": 400},
            {"name": "Ace of Spades", "unit": "Plants", "cost": 400}
        ],
        "indent" : true
    },
    {"name": "Vinca Vine", "unit": "Plants", "cost": 375},
    {"name": "Creeping Jenny", "unit": "Plants", "cost": 375},
    {"name": "Spikes", "unit": "Plants", "cost": 375}
];