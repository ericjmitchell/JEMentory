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
    private UnityEvent<ItemModel> itemSaved;
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
