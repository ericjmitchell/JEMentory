using System;

[Serializable]
public class ItemModel
{
    public string id;
    public string name;
    public int amount;

    //public ItemModel()
    //{
    //    id = Guid.NewGuid().ToString();
    //    name = "New Item";
    //    amount = 0;
    //}

    //public ItemModel(ItemModel copy)
    //{
    //    id = copy.id;
    //    name = copy.name;
    //    amount = copy.amount;
    //}
}
