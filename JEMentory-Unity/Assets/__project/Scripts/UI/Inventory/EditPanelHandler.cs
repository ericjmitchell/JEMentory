using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using Sirenix.OdinInspector;
using UnityEngine.UI;

public class EditPanelHandler : MonoBehaviour
{
    [TabGroup("Save")]
    [SerializeField]
    private TMP_InputField nameInput;
    [TabGroup("Save")]
    [SerializeField]
    private TMP_InputField amountInput;
    [TabGroup("Save")]
    [SerializeField]
    private TMP_InputField categoryInput;
    [TabGroup("Save")]
    [SerializeField]
    private TMP_InputField unitInput;
    [TabGroup("Save")]
    [SerializeField]
    private TMP_InputField lastPriceInput;
    [TabGroup("Save")]
    [SerializeField]
    private TMP_InputField purchaseAmountInput;
    [TabGroup("Save")]
    [SerializeField]
    private TMP_InputField purchaseDateInput;
    [TabGroup("Save")]
    [SerializeField]
    private TMP_InputField storeInput;
    [TabGroup("Save")]
    [SerializeField]
    private Toggle taxCheck;


    [TabGroup("Components")]
    [SerializeField]
    private InventoryAPI api;
    [TabGroup("Components")]
    [SerializeField]
    private RectTransform purchasePanel;
    [TabGroup("Components")]
    [SerializeField]
    private float purchasePanelHidePosition = 1275.0f;
    [TabGroup("Components")]
    [SerializeField]
    private float tweenDuration = 0.25f;

    [TabGroup("Events")]
    [SerializeField]
    private UnityEvent<ItemModel> itemSaved;
    [TabGroup("Events")]
    [SerializeField]
    private UnityEvent<ItemModel> itemDeleted;
    [TabGroup("Events")]
    [SerializeField]
    private UnityEvent editCancelled;

    private ItemModel _itemRef;

    public void SetItem(ItemModel item)
    {
        _itemRef = item;
        nameInput.text = item.name;
        amountInput.text = item.amount.ToString();
        categoryInput.text = _itemRef.category;
        unitInput.text = _itemRef.unit;
        lastPriceInput.text = _itemRef.lastPrice.ToString();
        purchaseAmountInput.text = _itemRef.purchaseAmount.ToString();
        purchaseDateInput.text = _itemRef.purchaseDate;
        storeInput.text = _itemRef.store;
        taxCheck.isOn = _itemRef.tax;
    }

    public void OnShowPurchasePanel()
    {
        purchasePanel.DOAnchorPosX(0, tweenDuration);
    }

    public void OnHidePurchasePanel()
    {
        purchasePanel.DOAnchorPosX(purchasePanelHidePosition, tweenDuration);
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
        _itemRef.category = categoryInput.text;
        _itemRef.unit = unitInput.text;
        _itemRef.lastPrice = float.Parse(lastPriceInput.text);
        _itemRef.purchaseAmount = float.Parse(purchaseAmountInput.text);
        _itemRef.purchaseDate = purchaseDateInput.text;
        _itemRef.store = storeInput.text;
        _itemRef.tax = taxCheck.isOn;

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
