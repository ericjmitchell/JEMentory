using System;
using System.Collections.Generic;
using System.Linq;
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
    private List<InventoryItemHandler> _itemObjectsPool;
    private bool _creatingItem = false;
    private bool _refreshing = false;

    private void Start()
    {
        _itemObjects = new List<InventoryItemHandler>();
        _itemObjectsPool = new List<InventoryItemHandler>();
        api.GetItems(GetItemsResponse);
    }

    internal void GetItemsResponse(ItemModel[] items)
    {
        foreach (ItemModel item in items)
        {
            AddItem(item);
        }

        _refreshing = false;
    }

    private void AddItem(ItemModel item)
    {
        InventoryItemHandler itemObject;
        if (_itemObjectsPool.Count > 0)
        {
            itemObject = _itemObjectsPool[0];
            _itemObjectsPool.RemoveAt(0);
            itemObject.gameObject.SetActive(true);
        }
        else
        {
            itemObject = Instantiate(itemPrefab, transform);
        }

        itemObject.item = item;

        itemObject.GetComponent<Button>().onClick.AddListener(() => EditItem(item));

        _itemObjects.Add(itemObject);
    }

    private void RefreshItems()
    {
        _refreshing = true;
        foreach (InventoryItemHandler itemObject in _itemObjects)
        {
            itemObject.gameObject.SetActive(false);
            itemObject.GetComponent<Button>().onClick.RemoveAllListeners();
            _itemObjectsPool.Add(itemObject);
        }

        _itemObjects.Clear();

        api.GetItems(GetItemsResponse);
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

        _creatingItem = true;

        EditItem(item);
    }

    public void RefreshList()
    {
        RefreshItems();
    }

    public void OnItemSaved(ItemModel item)
    {
        if (_creatingItem)
        {
            _creatingItem = false;
        }

        editPanel.gameObject.SetActive(false);

        RefreshItems();
    }

    public void OnItemDeleted(ItemModel item)
    {
        editPanel.gameObject.SetActive(false);

        RefreshItems();
    }

    public void OnEditCancelled()
    {
        _creatingItem = false;
        editPanel.gameObject.SetActive(false);
    }
}
