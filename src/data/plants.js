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
            {"name": "Hot Mix", "subname": " - Orange and Violet", "unit": "Pots", "cost": 2500},
            {"name": "All Orange", "unit": "Pots", "cost": 2500},
            {"name": "All White", "unit": "Pots", "cost": 2500},
            {"name": "Miami Mix", "subname": " - Flamingo Rose and Violet", "unit": "Pots", "cost": 2500},
            {"name": "All Violet", "unit": "Pots", "cost": 2500}
        ],
        "indent" : true
    },
    {
        "Large Deck Pot for Shade" : [
            {"name": "Assorted", "subname": " - Make Selection at Pickup", "unit": "Pots", "cost": 2500}
        ],
        "indent" : true
    },
    {
        "Large Mixed Coleus Deck Pot" : [
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
        "Lantana Hanging Baskets" : [
            {"name": "Red", "unit": "Baskets", "cost": 1600},
            {"name": "Orange Flame", "unit": "Baskets", "cost": 1600},
            {"name": "White", "unit": "Baskets", "cost": 1600}
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
    {"name": "Baby Tut Grass", "unit": "Plants", "cost": 800},
    {"name": "Purple Fountain Grass", "unit": "Plants", "cost": 800},
    {"name": "Caladium", "subname": " - White with Green Vein", "unit": "Plants", "cost": 600},
];