using System;
using UnityEngine;

[CreateAssetMenu(menuName = "JEMentory/ScriptableObjects/Inventory Api")]
public class InventoryAPI : ScriptableObject
{
    [SerializeField]
    private string baseUrl;

    public void Login(string email, string password, Action<LoginModel> callback)
    {
        string json = $"{{\"email\":\"{email}\",\"password\": \"{password}\"}}";
        APIHelper.instance.Post($"{baseUrl}/users/login", json, callback);
    }

    public void GetFamily(Action<FamilyModel> callback)
    {
        APIHelper.instance.Get($"{baseUrl}/families", callback);
    }

    public void GetItems(Action<ItemModel[]> callback)
    {
        APIHelper.instance.GetList($"{baseUrl}/items", callback);
    }

    public void SaveItem(ItemModel item, Action<ItemModel> callback)
    {
        string json = JsonUtility.ToJson(item);
        APIHelper.instance.Post($"{baseUrl}/items", json, callback);
    }

    public void DeleteItem(string itemId, Action<ItemModel> callback)
    {
        APIHelper.instance.Delete($"{baseUrl}/items/${itemId}", callback);
    }
}
