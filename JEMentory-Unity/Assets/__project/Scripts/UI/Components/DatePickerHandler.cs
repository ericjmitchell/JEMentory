using FantomLib;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class DatePickerHandler : MonoBehaviour
{
    [SerializeField]
    private DatePickerController dateController;
    [SerializeField]
    private TMP_InputField inputField;

    public void OnDateButtonClicked()
    {
        if (string.IsNullOrEmpty(inputField.text) == false)
        {
            dateController.Show(inputField.text);
        }
        else
        {
            dateController.Show();
        }
    }

    public void OnDatePicked(string result)
    {
        inputField.text = result;
    }
}
