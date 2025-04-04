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
            {"name": "All Red", "unit": "Pots", "cost": 2500},
            {"name": "Hot Mix", "subname": " - Bright Orange and Violet", "unit": "Pots", "cost": 2500},
            {"name": "All Orange", "unit": "Pots", "cost": 2500},
            {"name": "All White", "unit": "Pots", "cost": 2500},
            {"name": "Miami Mix", "subname": " - Flamingo Rose & Violet", "unit": "Pots", "cost": 2500},
            {"name": "All Violet", "unit": "Pots", "cost": 2500}
        ],
        "indent" : true
    },
    {
        "Deck Pot for Shade" : [
            {"name": "Assorted", "subname": " - Make Selection at Pickup", "unit": "Pots", "cost": 2500}
        ],
        "indent" : true
    },
    {
        "Hanging Baskets" : [
            {"name": "Boston Fern", "unit": "Baskets", "cost": 1800},
            {"name": "Streptocarpus", "unit": "Baskets", "cost": 1800}
        ],
        "indent" : true
    },
    {
        "Sunpatiens Hanging Baskets" : [
            {"name": "Summer Salsa", "subname": " - Coral Pink, Hot Coral, Red", "unit": "Baskets", "cost": 1600},
            {"name": "Hawaiian Sunset", "subname": " - Coral Pink, Orchid Blush, Purple", "unit": "Baskets", "cost": 1600},
            {"name": "Best Friends", "subname": " - White, Rose Glow, Lilac", "unit": "Baskets", "cost": 1600}
        ],
        "indent" : true
    },
    {
        "Calliope Geranium Hanging Baskets" : [
            {"name": "Red", "unit": "Baskets", "cost": 1600},
            {"name": "Lavender Rose", "unit": "Baskets", "cost": 1600},
            {"name": "Crimson Flame", "subname": " - Bi-color Red/Hot Pink", "unit": "Baskets", "cost": 1600}
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
            {"name": "Magenta Bliss", "unit": "Plants", "cost": 450},
            {"name": "White", "unit": "Plants", "cost": 450}
        ],
        "indent" : true
    },
    {
        "Geraniums" : [
            {"name": "Red", "unit": "Plants", "cost": 450},
            {"name": "White", "unit": "Plants", "cost": 450},
            {"name": "Pink Flare (Neon Rose)", "unit": "Plants", "cost": 450},
            {"name": "Strawberry Sizzle", "subname": " - Dark Pink", "unit": "Plants", "cost": 450},
            {"name": "Cranberry Sizzle", "subname": " - Magenta", "unit": "Plants", "cost": 450}
        ],
        "indent" : true
    },
    {
        "Sweet Potato Vines" : [
            {"name": "Margarita", "unit": "Plants", "cost": 450},
            {"name": "Tri-Color", "unit": "Plants", "cost": 450},
            {"name": "Ace of Spades", "unit": "Plants", "cost": 450}
        ],
        "indent" : true
    },
    {"name": "Vinca Vine", "unit": "Plants", "cost": 400},
    {"name": "Creeping Jenny", "unit": "Plants", "cost": 400},
    {"name": "Spikes", "unit": "Plants", "cost": 400}
];