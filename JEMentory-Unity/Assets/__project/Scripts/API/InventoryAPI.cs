using System;
using UnityEngine;

[CreateAssetMenu(menuName = "JEMentory/ScriptableObjects/Inventory Api")]
public class InventoryAPI : ScriptableObject
{
    [SerializeField]
    private string baseUrl;

    public void Login(string email, string password, Action<LoginModel> callback)
    {
        Debug.Log($"Login: {email}, {password}");
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
}
