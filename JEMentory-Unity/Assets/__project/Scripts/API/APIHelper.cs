using System;
using System.Collections;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

public enum RequestType
{
    GET,
    POST,
    DELETE
}

public class APIHelper : MonoBehaviour
{
    public static APIHelper instance;

    public string token = null;

    private void Awake()
    {
        instance = this;
        DontDestroyOnLoad(this);

        //Check for saved token
        if (PlayerPrefs.HasKey("token"))
        {
            token = PlayerPrefs.GetString("token");
        }
    }

    //private void POST(string url, string body)
    //{
    //    UnityWebRequest request = new UnityWebRequest(url);
    //    request.uploadHandler = new UploadHandlerRaw(GetBytes(body));
    //    request.downloadHandler = new DownloadHandlerBuffer();
    //    request.method = UnityWebRequest.kHttpVerbPOST;
    //}

    public void Post<T>(string URL, string body, Action<T> callback)
    {
        StartCoroutine(MakeRequest(RequestType.POST, URL, body, callback));
    }

    public void Get<T>(string URL, Action<T> callback)
    {
        StartCoroutine(MakeRequest(RequestType.GET, URL, null, callback));
    }

    public void GetList<T>(string URL, Action<T[]> callback)
    {
        StartCoroutine(MakeRequestList(RequestType.GET, URL, null, callback));
    }

    public void Delete<T>(string URL, Action<T> callback)
    {
        StartCoroutine(MakeRequest(RequestType.DELETE, URL, null, callback));
    }

    private IEnumerator MakeRequestList<T>(RequestType method, string URL, string body, Action<T[]> callback)
    {
        UnityWebRequest webRequest = GetWebRequest(method, URL, body);

        try
        {
            yield return webRequest.SendWebRequest();
            if (webRequest.result != UnityWebRequest.Result.Success)
            {
                Debug.Log(webRequest.error);
                Debug.Log(webRequest.downloadHandler.text);
            }
            else
            {
                T[] value = JsonHelper.FromJson<T>(webRequest.downloadHandler.text);
                callback?.Invoke(value);
            }
        }
        finally
        {
            if (webRequest != null)
            {
                webRequest.Dispose();
            }
        }
    }

    private IEnumerator MakeRequest<T>(RequestType method, string URL, string body, Action<T> callback)
    {
        UnityWebRequest webRequest = GetWebRequest(method, URL, body);

        try
        {
            yield return webRequest.SendWebRequest();
            if (webRequest.result != UnityWebRequest.Result.Success)
            {
                Debug.Log(webRequest.error);
                Debug.Log(webRequest.downloadHandler.text);
            }
            else
            {
                if (string.IsNullOrEmpty(webRequest.downloadHandler?.text) == false)
                {
                    T value = JsonUtility.FromJson<T>(webRequest.downloadHandler.text);
                    callback?.Invoke(value);
                }
                else
                {
                    callback?.Invoke(default);
                }
            }
        }
        finally
        {
            if (webRequest != null)
            {
                webRequest.Dispose();
            }
        }
    }

    private UnityWebRequest GetWebRequest(RequestType method, string URL, string body)
    {
        UnityWebRequest webRequest = null;

        switch (method)
        {
            case RequestType.GET:
                webRequest = UnityWebRequest.Get(URL);
                break;
            case RequestType.POST:
                webRequest = UnityWebRequest.Post(URL, body);
                webRequest.SetRequestHeader("Content-Type", "application/json");
                webRequest.uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(body));
                break;
            case RequestType.DELETE:
                webRequest = UnityWebRequest.Delete(URL);
                break;
        }

        if (token != null)
        {
            webRequest.SetRequestHeader("Authorization", $"Bearer {token}");
        }

        return webRequest;
    }
}
