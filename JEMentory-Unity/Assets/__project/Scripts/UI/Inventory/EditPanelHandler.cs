using System;
using TMPro;
using UnityEngine;
using UnityEngine.Events;

public class EditPanelHandler : MonoBehaviour
{
    [SerializeField]
    private TMP_InputField nameInput;
    [SerializeField]
    private TMP_InputField amountInput;
    [SerializeField]
    private InventoryAPI api;

    [SerializeField]
    private UnityEvent<ItemModel> itemSaved;
    [SerializeField]
    private UnityEvent<ItemModel> itemDeleted;
    [SerializeField]
    private UnityEvent editCancelled;

    private ItemModel _itemRef;

    public void SetItem(ItemModel item)
    {
        _itemRef = item;
        nameInput.text = item.name;
        amountInput.text = item.amount.ToString();
    }

    public void OnIncreaseAmount()
    {
        ChangeAmount(1);
    }

    public void OnDecreaseAmount()
    {
        ChangeAmount(-1);
    }

    private void ChangeAmount(int change)
    {
        int amount;
        if (int.TryParse(amountInput.text, out amount))
        {
            amount += change;
            if (amount < 0)
                amount = 0;
        }

        amountInput.text = amount.ToString();
    }

    public void OnSave()
    {
        _itemRef.name = nameInput.text;
        _itemRef.amount = int.Parse(amountInput.text);

        api.SaveItem(_itemRef, OnItemSaved);
    }

    public void OnDelete()
    {
        //TODO check if sure
        api.DeleteItem(_itemRef.id, OnItemDeleted);
    }

    private void OnItemDeleted(ItemModel obj)
    {
        if (itemDeleted != null)
        {
            itemDeleted.Invoke(_itemRef);
        }
    }

    private void OnItemSaved(ItemModel item)
    {
        if (itemSaved != null)
        {
            itemSaved.Invoke(_itemRef);
        }
    }

    public void OnCancel()
    {
        //TODO: If changed, check if sure

        if (editCancelled != null)
        {
            editCancelled.Invoke();
        }
    }
}
