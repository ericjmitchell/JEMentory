using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class InventoryListHandler : MonoBehaviour
{
    [SerializeField]
    private InventoryAPI api;
    [SerializeField]
    private InventoryItemHandler itemPrefab;
    [SerializeField]
    private EditPanelHandler editPanel;

    private List<InventoryItemHandler> _itemObjects;
    private bool _savingItem = false;

    private void Start()
    {
        _itemObjects = new List<InventoryItemHandler>();
        api.GetItems(GetItemsResponse);
    }

    internal void GetItemsResponse(ItemModel[] items)
    {
        foreach (ItemModel item in items)
        {
            AddItem(item);
        }
    }

    private void AddItem(ItemModel item)
    {
        InventoryItemHandler itemObject = Instantiate(itemPrefab, transform);
        itemObject.item = item;

        itemObject.GetComponent<Button>().onClick.AddListener(() => EditItem(item));

        _itemObjects.Add(itemObject);
    }

    private void EditItem(ItemModel item)
    {
        editPanel.SetItem(item);
        editPanel.gameObject.SetActive(true);
    }

    public void CreateItem()
    {
        ItemModel item = new ItemModel();
        item.id = Guid.NewGuid().ToString();
        item.name = "New Item";
        item.amount = 0;

        _savingItem = true;

        EditItem(item);
    }

    public void OnItemSaved(ItemModel item)
    {
        if (_savingItem)
        {
            AddItem(item);
            _savingItem = false;
        }

        editPanel.gameObject.SetActive(false);
    }

    public void OnEditCancelled()
    {
        _savingItem = false;
        editPanel.gameObject.SetActive(false);
    }
}
