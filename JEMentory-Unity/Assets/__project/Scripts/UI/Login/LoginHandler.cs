using TMPro;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LoginHandler : MonoBehaviour
{
    [SerializeField]
    private TMP_InputField emailInput;
    [SerializeField]
    private TMP_InputField passwordInput;
    [SerializeField]
    private InventoryAPI api;

    private void Start()
    {
        if (string.IsNullOrEmpty(APIHelper.instance.token) == false)
        {
            SceneManager.LoadScene("Inventory");
        }
    }

    public void OnClick()
    {
        if (string.IsNullOrEmpty(emailInput.text) || string.IsNullOrEmpty(passwordInput.text))
        {
            Debug.LogWarning("Email or password is empty!");
        }
        else
        {
            api.Login(emailInput.text, passwordInput.text, LoginResponse);
        }
    }

    internal void LoginResponse(LoginModel loginInfo)
    {
        APIHelper.instance.token = loginInfo.token;
        PlayerPrefs.SetString("token", loginInfo.token);
        PlayerPrefs.Save();

        SceneManager.LoadScene("Inventory");
    }
}
