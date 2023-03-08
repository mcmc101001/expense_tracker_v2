migrate((db) => {
  const collection = new Collection({
    "id": "1812p1b4uwh6uyh",
    "created": "2023-03-07 14:04:33.405Z",
    "updated": "2023-03-07 14:04:33.405Z",
    "name": "expense",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dnrtdkqp",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "00ignlqd",
        "name": "type",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Meals",
            "Snacks",
            "Gifts",
            "Clothes",
            "Transport",
            "Entertainment",
            "Won't use but still buy",
            "Misc."
          ]
        }
      },
      {
        "system": false,
        "id": "d3o0life",
        "name": "datetime",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "2yurtlxk",
        "name": "cost",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1812p1b4uwh6uyh");

  return dao.deleteCollection(collection);
})
