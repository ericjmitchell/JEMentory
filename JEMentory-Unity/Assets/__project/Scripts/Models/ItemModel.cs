using System;

[Serializable]
public class ItemModel
{
    public string id;
    public string name;
    public string category;
    public int amount;
    public string unit;
    public float daysPerUnit;
    public float lastPrice;
    public float purchaseAmount;
    public string purchaseDate;
    public string store;
    public bool tax;

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
