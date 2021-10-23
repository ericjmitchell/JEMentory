using TMPro;
using UnityEngine;

public class InventoryItemHandler : MonoBehaviour
{
    public ItemModel item;

    [SerializeField]
    private TextMeshProUGUI nameText;
    [SerializeField]
    private TextMeshProUGUI amountText;

    private void Update()
    {
        nameText.text = item.name;
        amountText.text = item.amount.ToString();
    }
}
